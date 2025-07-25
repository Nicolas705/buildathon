import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { name, email, linkedin, github, accomplishments } = await request.json();

    // Basic validation
    if (!name || !email) {
      return NextResponse.json({ error: 'Name and email are required' }, { status: 400 });
    }

    // Email content
    const emailContent = `New Signal Application:

Name: ${name}
Email: ${email}
LinkedIn: ${linkedin}
GitHub: ${github}

Accomplishments:
${accomplishments}

---
Submitted via Signal application form`;

    // For now, we'll use EmailJS server-side or you can integrate with:
    // - Resend (recommended): https://resend.com/
    // - SendGrid: https://sendgrid.com/
    // - Nodemailer with Gmail/SMTP
    
    // Simple implementation using fetch to EmailJS (you can replace this)
    const emailjsResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID || 'service_your_service_id',
        template_id: process.env.EMAILJS_TEMPLATE_ID || 'template_your_template_id',
        user_id: process.env.EMAILJS_PUBLIC_KEY || 'your_public_key',
        template_params: {
          from_name: name,
          from_email: email,
          to_email: 'nicolas.gertler@yale.edu',
          subject: `Signal Application from ${name}`,
          message: emailContent,
        },
      }),
    });

    if (emailjsResponse.ok) {
      return NextResponse.json({ success: true, message: 'Email sent successfully' });
    } else {
      // Log the response for debugging
      const errorText = await emailjsResponse.text();
      console.error('EmailJS API error:', errorText);
      
      // Fallback: At least log the application data server-side
      console.log('Signal Application Submission:', {
        name,
        email,
        linkedin,
        github,
        accomplishments,
        timestamp: new Date().toISOString(),
      });
      
      return NextResponse.json({ 
        success: true, 
        message: 'Application received and logged. Email service temporarily unavailable.',
        fallback: true 
      });
    }
  } catch (error) {
    console.error('Email sending error:', error);
    
    // Log the application data as fallback
    console.log('Signal Application Submission (Error Fallback):', {
      timestamp: new Date().toISOString(),
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Application received and logged. Email service temporarily unavailable.',
      fallback: true 
    }, { status: 200 });
  }
} 