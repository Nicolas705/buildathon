import { NextRequest, NextResponse } from 'next/server';

// In-memory rate limiting and spam prevention
const requestLog = new Map<string, { count: number; lastRequest: number; submissions: Set<string> }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 3;
const MIN_TIME_BETWEEN_REQUESTS = 5 * 1000; // 5 seconds
// const MAX_SUBMISSIONS_PER_EMAIL = 1; // One submission per email address (handled by duplicate detection)

interface FormSubmission {
  name: string;
  email: string;
  linkedin: string;
  github: string;
  accomplishments: string;
}

// Environment variable helpers with fallbacks
function getEmailJSConfig() {
  return {
    serviceId: process.env.EMAILJS_SERVICE_ID || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
    templateId: process.env.EMAILJS_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
    publicKey: process.env.EMAILJS_PUBLIC_KEY || process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ''
  };
}

// Advanced validation functions
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 100;
}

function validateGithubUrl(url: string): boolean {
  const githubRegex = /^https?:\/\/(www\.)?github\.com\/[a-zA-Z0-9_-]+\/?$/;
  return githubRegex.test(url) && url.length <= 200;
}

function validateLinkedInUrl(url: string): boolean {
  if (!url) return true; // Optional field
  const linkedinRegex = /^https?:\/\/(www\.)?linkedin\.com\/(in|pub)\/[a-zA-Z0-9_-]+\/?$/;
  return linkedinRegex.test(url) && url.length <= 200;
}

function validateName(name: string): boolean {
  const trimmed = name.trim();
  return trimmed.length >= 2 && 
         trimmed.length <= 50 && 
         /^[a-zA-Z\s'-]+$/.test(trimmed) &&
         !isSpamContent(trimmed);
}

function validateAccomplishments(text: string): boolean {
  const trimmed = text.trim();
  return trimmed.length >= 50 && 
         trimmed.length <= 2000 && 
         !isSpamContent(trimmed) &&
         hasSubstantialContent(trimmed);
}

function isSpamContent(text: string): boolean {
  const spamPatterns = [
    /(.)\1{10,}/i, // Repeated characters
    /\b(viagra|casino|lottery|winner|congratulations|urgent|act now|click here|free money|get rich|make money fast)\b/gi,
    /[^\w\s]{5,}/i, // Too many special characters
    /\b\d{3,}\b.*\b\d{3,}\b/i, // Multiple phone numbers
  ];
  
  // Check for excessive URLs
  const urlCount = (text.match(/https?:\/\/[^\s]+/gi) || []).length;
  if (urlCount > 2) return true;
  
  // Check for repeated words
  const words = text.toLowerCase().split(/\s+/);
  const wordCount = new Map<string, number>();
  words.forEach(word => {
    if (word.length > 3) {
      wordCount.set(word, (wordCount.get(word) || 0) + 1);
    }
  });
  
  // If any word appears more than 5 times, it's likely spam
  for (const count of wordCount.values()) {
    if (count > 5) return true;
  }
  
  return spamPatterns.some(pattern => pattern.test(text));
}

function hasSubstantialContent(text: string): boolean {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 5);
  const uniqueWords = new Set(text.toLowerCase().split(/\s+/).filter(w => w.length > 3));
  
  return sentences.length >= 2 && uniqueWords.size >= 10;
}

function getClientId(request: NextRequest): string {
  // Use IP address as primary identifier
  const forwarded = request.headers.get('x-forwarded-for');
  const ip = forwarded ? forwarded.split(',')[0] : 
             request.headers.get('x-real-ip') || 
             'unknown';
  
  // Include user agent for additional fingerprinting
  const userAgent = request.headers.get('user-agent') || '';
  return `${ip}-${userAgent.slice(0, 50)}`;
}

function isRateLimited(clientId: string): { limited: boolean; timeRemaining?: number } {
  const now = Date.now();
  const clientData = requestLog.get(clientId) || { count: 0, lastRequest: 0, submissions: new Set() };
  
  // Clean up old entries
  if (now - clientData.lastRequest > RATE_LIMIT_WINDOW) {
    clientData.count = 0;
    clientData.submissions.clear();
  }
  
  // Check rate limits
  if (clientData.count >= MAX_REQUESTS_PER_WINDOW) {
    const timeRemaining = RATE_LIMIT_WINDOW - (now - clientData.lastRequest);
    return { limited: true, timeRemaining };
  }
  
  // Check minimum time between requests
  if (now - clientData.lastRequest < MIN_TIME_BETWEEN_REQUESTS) {
    return { limited: true, timeRemaining: MIN_TIME_BETWEEN_REQUESTS - (now - clientData.lastRequest) };
  }
  
  return { limited: false };
}

function updateRateLimit(clientId: string, email: string): boolean {
  const now = Date.now();
  const clientData = requestLog.get(clientId) || { count: 0, lastRequest: 0, submissions: new Set() };
  
  // Check for duplicate email submissions
  if (clientData.submissions.has(email)) {
    return false; // Duplicate submission
  }
  
  clientData.count += 1;
  clientData.lastRequest = now;
  clientData.submissions.add(email);
  requestLog.set(clientId, clientData);
  
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const clientId = getClientId(request);
    const rateLimitResult = isRateLimited(clientId);
    
    if (rateLimitResult.limited) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded', 
          message: `Please wait ${Math.ceil((rateLimitResult.timeRemaining || 0) / 1000)} seconds before submitting again.` 
        }, 
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.timeRemaining || 0) / 1000).toString()
          }
        }
      );
    }

    // Parse and validate request
    let submission: FormSubmission;
    try {
      submission = await request.json();
    } catch {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const { name, email, linkedin, github, accomplishments } = submission;

    // Comprehensive validation
    const validationErrors: string[] = [];

    if (!name || !validateName(name)) {
      validationErrors.push('Invalid name provided');
    }

    if (!email || !validateEmail(email)) {
      validationErrors.push('Invalid email address');
    }

    if (!validateLinkedInUrl(linkedin)) {
      validationErrors.push('Invalid LinkedIn URL format');
    }

    if (!github || !validateGithubUrl(github)) {
      validationErrors.push('Invalid GitHub profile URL');
    }

    if (!accomplishments || !validateAccomplishments(accomplishments)) {
      validationErrors.push('Invalid or insufficient accomplishments description');
    }

    if (validationErrors.length > 0) {
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: validationErrors 
      }, { status: 400 });
    }

    // Update rate limiting and check for duplicates
    if (!updateRateLimit(clientId, email)) {
      return NextResponse.json({ 
        error: 'Duplicate submission detected',
        message: 'An application from this email address has already been submitted.' 
      }, { status: 409 });
    }

    // Get EmailJS configuration
    const emailConfig = getEmailJSConfig();
    
    // Log application regardless of email service status
    const applicationData = {
      name: name.trim(),
      email: email.trim(),
      linkedin,
      github,
      accomplishments: accomplishments.trim(),
      timestamp: new Date().toISOString(),
      clientId: clientId.split('-')[0] // Just IP for logging
    };

    console.log(`📝 Signal Application Received:`, applicationData);

    // Email content with security info
    const emailContent = `New Signal Application:

Name: ${name.trim()}
Email: ${email.trim()}
LinkedIn: ${linkedin || 'Not provided'}
GitHub: ${github}

Accomplishments:
${accomplishments.trim()}

---
Security Info:
- Submitted from IP: ${clientId.split('-')[0]}
- Timestamp: ${new Date().toISOString()}
- Validated: ✅
- Spam Check: Passed

Submitted via Signal application form`;

    // Only attempt to send email if we have valid configuration
    if (emailConfig.serviceId && emailConfig.publicKey) {
      try {
        const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: emailConfig.serviceId,
            template_id: emailConfig.templateId || 'default_template',
            user_id: emailConfig.publicKey,
            template_params: {
              from_name: name.trim(),
              from_email: email.trim(),
              to_email: 'nicolas.gertler@yale.edu',
              subject: `Signal Application from ${name.trim()}`,
              message: emailContent,
            },
          }),
        });

        if (emailjsResponse.ok) {
          console.log(`✅ Email sent successfully for application: ${email}`);
          return NextResponse.json({ 
            success: true, 
            message: 'Application submitted successfully' 
          });
        } else {
          console.error(`❌ EmailJS failed for ${email}:`, await emailjsResponse.text());
        }
      } catch (emailError) {
        console.error(`❌ Email service error for ${email}:`, emailError);
      }
    } else {
      console.warn(`⚠️ Email service not configured - application logged only`);
    }

    // Always return success to user (application is logged regardless)
    return NextResponse.json({ 
      success: true, 
      message: 'Application received and logged for review'
    });

  } catch (error) {
    console.error('❌ Unexpected error in application submission:', error);
    
    return NextResponse.json({ 
      error: 'Internal server error',
      message: 'Please try again later or contact support if the issue persists.'
    }, { status: 500 });
  }
} 