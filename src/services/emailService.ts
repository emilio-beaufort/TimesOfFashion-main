// Email service integration for newsletter subscriptions
export interface EmailServiceConfig {
  provider: 'mailchimp' | 'convertkit' | 'wordpress';
  apiKey?: string;
  listId?: string;
  formId?: string;
}

export interface SubscriptionData {
  email: string;
  firstName?: string;
  lastName?: string;
  tags?: string[];
}

class EmailService {
  private config: EmailServiceConfig;

  constructor(config: EmailServiceConfig) {
    this.config = config;
  }

  async subscribe(data: SubscriptionData): Promise<{ success: boolean; message: string }> {
    switch (this.config.provider) {
      case 'mailchimp':
        return this.subscribeMailchimp(data);
      case 'convertkit':
        return this.subscribeConvertKit(data);
      case 'wordpress':
        return this.subscribeWordPress(data);
      default:
        throw new Error('Unsupported email provider');
    }
  }

  private async subscribeMailchimp(data: SubscriptionData): Promise<{ success: boolean; message: string }> {
    if (!this.config.apiKey || !this.config.listId) {
      throw new Error('MailChimp API key and list ID are required');
    }

    const datacenter = this.config.apiKey.split('-')[1];
    const url = `https://${datacenter}.api.mailchimp.com/3.0/lists/${this.config.listId}/members`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${btoa(`anystring:${this.config.apiKey}`)}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email_address: data.email,
          status: 'subscribed',
          merge_fields: {
            FNAME: data.firstName || '',
            LNAME: data.lastName || '',
          },
          tags: data.tags || [],
        }),
      });

      if (response.ok) {
        return { success: true, message: 'Successfully subscribed to newsletter!' };
      } else {
        const error = await response.json();
        return { success: false, message: error.detail || 'Subscription failed' };
      }
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  }

  private async subscribeConvertKit(data: SubscriptionData): Promise<{ success: boolean; message: string }> {
    if (!this.config.apiKey || !this.config.formId) {
      throw new Error('ConvertKit API key and form ID are required');
    }

    const url = `https://api.convertkit.com/v3/forms/${this.config.formId}/subscribe`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          api_key: this.config.apiKey,
          email: data.email,
          first_name: data.firstName || '',
          tags: data.tags || [],
        }),
      });

      if (response.ok) {
        return { success: true, message: 'Successfully subscribed to newsletter!' };
      } else {
        return { success: false, message: 'Subscription failed. Please try again.' };
      }
    } catch (error) {
      return { success: false, message: 'Network error. Please try again.' };
    }
  }

  private async subscribeWordPress(data: SubscriptionData): Promise<{ success: boolean; message: string }> {
    // This will use the WordPress API service we created
    const { wordpressApi } = await import('./wordpressApi');
    
    try {
      const result = await wordpressApi.subscribeToNewsletter({
        email: data.email,
        name: data.firstName || '',
      });

      return {
        success: result.status === 'success',
        message: result.message,
      };
    } catch (error) {
      return { success: false, message: 'Subscription failed. Please try again.' };
    }
  }
}

// Factory function to create email service instance
export const createEmailService = (config: EmailServiceConfig): EmailService => {
  return new EmailService(config);
};

// Default configuration - can be overridden via environment variables
export const getDefaultEmailConfig = (): EmailServiceConfig => {
  const provider = (process.env.VITE_EMAIL_PROVIDER as 'mailchimp' | 'convertkit' | 'wordpress') || 'wordpress';
  
  return {
    provider,
    apiKey: process.env.VITE_EMAIL_API_KEY,
    listId: process.env.VITE_EMAIL_LIST_ID,
    formId: process.env.VITE_EMAIL_FORM_ID,
  };
};

export default EmailService;
