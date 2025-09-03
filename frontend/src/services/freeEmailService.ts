// Free email service integration using EmailJS and Formspree
export interface FreeEmailConfig {
  provider: 'emailjs' | 'formspree' | 'netlify';
  serviceId?: string;
  templateId?: string;
  publicKey?: string;
  formspreeEndpoint?: string;
}

export interface NewsletterData {
  email: string;
  firstName?: string;
  source?: string;
}

class FreeEmailService {
  private config: FreeEmailConfig;

  constructor(config: FreeEmailConfig) {
    this.config = config;
  }

  async subscribe(data: NewsletterData): Promise<{ success: boolean; message: string }> {
    switch (this.config.provider) {
      case 'emailjs':
        return this.subscribeEmailJS(data);
      case 'formspree':
        return this.subscribeFormspree(data);
      case 'netlify':
        return this.subscribeNetlify(data);
      default:
        throw new Error('Unsupported email provider');
    }
  }

  // EmailJS Integration (Free: 200 emails/month)
  private async subscribeEmailJS(data: NewsletterData): Promise<{ success: boolean; message: string }> {
    if (!this.config.serviceId || !this.config.templateId || !this.config.publicKey) {
      throw new Error('EmailJS configuration missing');
    }

    try {
      // Load EmailJS dynamically to avoid bundle bloat
      const emailjs = await this.loadEmailJS();
      
      const templateParams = {
        to_email: 'your-email@gmail.com', // Your email to receive notifications
        from_email: data.email,
        from_name: data.firstName || 'Newsletter Subscriber',
        message: `New newsletter subscription from ${data.firstName || 'Anonymous'} (${data.email})`,
        reply_to: data.email,
      };

      await emailjs.send(
        this.config.serviceId,
        this.config.templateId,
        templateParams,
        this.config.publicKey
      );

      // Store subscription locally (you can enhance this with localStorage or IndexedDB)
      this.storeSubscription(data);

      return { 
        success: true, 
        message: 'Successfully subscribed! You\'ll receive our weekly fashion newsletter.' 
      };
    } catch (error) {
      console.error('EmailJS error:', error);
      return { 
        success: false, 
        message: 'Subscription failed. Please try again later.' 
      };
    }
  }

  // Formspree Integration (Free: 50 submissions/month)
  private async subscribeFormspree(data: NewsletterData): Promise<{ success: boolean; message: string }> {
    if (!this.config.formspreeEndpoint) {
      throw new Error('Formspree endpoint missing');
    }

    try {
      const response = await fetch(this.config.formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          name: data.firstName || '',
          type: 'newsletter_subscription',
          source: data.source || 'website',
          message: `Newsletter subscription request from ${data.firstName || 'Anonymous'}`,
        }),
      });

      if (response.ok) {
        this.storeSubscription(data);
        return { 
          success: true, 
          message: 'Successfully subscribed! Check your email for confirmation.' 
        };
      } else {
        return { 
          success: false, 
          message: 'Subscription failed. Please try again.' 
        };
      }
    } catch (error) {
      console.error('Formspree error:', error);
      return { 
        success: false, 
        message: 'Network error. Please try again later.' 
      };
    }
  }

  // Netlify Forms Integration (Free with Netlify hosting)
  private async subscribeNetlify(data: NewsletterData): Promise<{ success: boolean; message: string }> {
    try {
      const formData = new FormData();
      formData.append('form-name', 'newsletter');
      formData.append('email', data.email);
      formData.append('name', data.firstName || '');
      formData.append('source', data.source || 'website');

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as any).toString(),
      });

      if (response.ok) {
        this.storeSubscription(data);
        return { 
          success: true, 
          message: 'Successfully subscribed to our newsletter!' 
        };
      } else {
        return { 
          success: false, 
          message: 'Subscription failed. Please try again.' 
        };
      }
    } catch (error) {
      console.error('Netlify Forms error:', error);
      return { 
        success: false, 
        message: 'Network error. Please try again later.' 
      };
    }
  }

  // Load EmailJS dynamically
  private async loadEmailJS(): Promise<any> {
    if (typeof window !== 'undefined' && (window as any).emailjs) {
      return (window as any).emailjs;
    }

    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
      script.onload = () => {
        resolve((window as any).emailjs);
      };
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  // Store subscription locally for analytics
  private storeSubscription(data: NewsletterData): void {
    try {
      const subscriptions = JSON.parse(localStorage.getItem('newsletter_subscriptions') || '[]');
      subscriptions.push({
        ...data,
        timestamp: new Date().toISOString(),
        id: Date.now().toString(),
      });
      localStorage.setItem('newsletter_subscriptions', JSON.stringify(subscriptions));
    } catch (error) {
      console.warn('Failed to store subscription locally:', error);
    }
  }

  // Get stored subscriptions for analytics
  getStoredSubscriptions(): any[] {
    try {
      return JSON.parse(localStorage.getItem('newsletter_subscriptions') || '[]');
    } catch (error) {
      return [];
    }
  }
}

// Factory function for free email service
export const createFreeEmailService = (config: FreeEmailConfig): FreeEmailService => {
  return new FreeEmailService(config);
};

// Default free email configuration
export const getFreeEmailConfig = (): FreeEmailConfig => {
  const provider = (process.env.VITE_FREE_EMAIL_PROVIDER as 'emailjs' | 'formspree' | 'netlify') || 'formspree';
  
  return {
    provider,
    serviceId: process.env.VITE_EMAILJS_SERVICE_ID,
    templateId: process.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: process.env.VITE_EMAILJS_PUBLIC_KEY,
    formspreeEndpoint: process.env.VITE_FORMSPREE_ENDPOINT,
  };
};

export default FreeEmailService;
