export const shareMessages = {
  sms: "Signal at Yale - 10 builders meet weekly with top VCs and operators. Meaningful conversations, no BS: signal.community",
  email: {
    subject: "Signal at Yale - where builders meet capital",
    body: `Hey,

Thought you'd be interested in Signal - 10 exceptional builders at Yale meeting weekly with top-tier VCs and operators.

Every Thursday, we bring together people who are actually building things with investors who understand what it takes.

Check it out: signal.community

Best,`
  },
  twitter: "Signal at Yale - 10 builders, weekly dinners with top VCs and operators. Meaningful conversations for ambitious builders 🚀 https://signal.community",
  whatsapp: "Check out Signal at Yale - 10 builders get weekly dinners with top VCs and operators. Meaningful conversations about building the future: https://signal.community",
      linkedin: "Signal at Yale brings together 10 exceptional builders with leading VCs and operators every week. Real conversations, real connections, real impact. Learn more: https://signal.community"
};

export const canUseNativeShare = (): boolean => {
  return typeof navigator !== 'undefined' && navigator.share !== undefined;
};

export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }
  } catch (error) {
    console.error('Failed to copy:', error);
    return false;
  }
};

export const shareViaMethod = async (method: string): Promise<boolean> => {
  const url = 'https://signal.community';
  
  try {
    switch (method) {
      case 'sms':
        window.open(`sms:?body=${encodeURIComponent(shareMessages.sms)}`);
        return true;
        
      case 'email':
        const emailUrl = `mailto:?subject=${encodeURIComponent(shareMessages.email.subject)}&body=${encodeURIComponent(shareMessages.email.body)}`;
        window.open(emailUrl);
        return true;
        
      case 'copy':
        return await copyToClipboard(url);
        
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessages.twitter)}`);
        return true;
        
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodeURIComponent(shareMessages.whatsapp)}`);
        return true;
        
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&summary=${encodeURIComponent(shareMessages.linkedin)}`);
        return true;
        
      default:
        return false;
    }
  } catch (error) {
    console.error('Share failed:', error);
    return false;
  }
};

// Analytics tracking (optional)
export const trackShare = (method: string) => {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    const gtag = (window as { gtag?: (...args: unknown[]) => void }).gtag;
    if (gtag) {
      gtag('event', 'share', {
        event_category: 'engagement',
        event_label: method,
        value: 1
      });
    }
  }
}; 