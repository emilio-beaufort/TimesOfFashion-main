// Mock service for managing blogs, subscriptions, users, and admin data
// Firebase implementation removed

// Type definitions
export interface BlogPost {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  author: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  likes: number;
}

export interface NewsletterSubscription {
  id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  source: string;
  status: 'active' | 'unsubscribed' | 'bounced';
  subscribedAt: Date;
  preferences: {
    weeklyNewsletter: boolean;
    fashionTrends: boolean;
    beautyTips: boolean;
    salesAlerts: boolean;
  };
}

export interface UserAccount {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'user' | 'subscriber' | 'contributor' | 'admin';
  profileImage?: string;
  bio?: string;
  socialLinks?: {
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  preferences: {
    emailNotifications: boolean;
    pushNotifications: boolean;
    newsletter: boolean;
  };
  createdAt: Date;
  lastLoginAt?: Date;
}

export interface AdminSettings {
  id?: string;
  siteName: string;
  siteDescription: string;
  contactEmail: string;
  socialMedia: {
    instagram?: string;
    twitter?: string;
    facebook?: string;
    pinterest?: string;
  };
  newsletterSettings: {
    enabled: boolean;
    frequency: 'daily' | 'weekly' | 'monthly';
    template: string;
  };
  seoSettings: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
  updatedAt: Date;
  updatedBy: string;
}

class MockFirebaseService {
  // Mock implementations that return promises with empty data
  async createBlogPost(blogData: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'viewCount' | 'likes'>): Promise<string> {
    console.warn('Firebase service disabled - createBlogPost called');
    return Promise.resolve('mock-id');
  }

  async updateBlogPost(id: string, updates: Partial<BlogPost>): Promise<void> {
    console.warn('Firebase service disabled - updateBlogPost called');
    return Promise.resolve();
  }

  async deleteBlogPost(id: string): Promise<void> {
    console.warn('Firebase service disabled - deleteBlogPost called');
    return Promise.resolve();
  }

  async getBlogPosts(options: {
    category?: string;
    status?: string;
    limit?: number;
    orderBy?: string;
  } = {}): Promise<BlogPost[]> {
    console.warn('Firebase service disabled - getBlogPosts called');
    return Promise.resolve([]);
  }

  async getBlogPost(id: string): Promise<BlogPost | null> {
    console.warn('Firebase service disabled - getBlogPost called');
    return Promise.resolve(null);
  }

  async addNewsletterSubscription(subscriptionData: Omit<NewsletterSubscription, 'id' | 'subscribedAt'>): Promise<string> {
    console.warn('Firebase service disabled - addNewsletterSubscription called');
    return Promise.resolve('mock-subscription-id');
  }

  async updateSubscriptionStatus(email: string, status: NewsletterSubscription['status']): Promise<void> {
    console.warn('Firebase service disabled - updateSubscriptionStatus called');
    return Promise.resolve();
  }

  async getNewsletterSubscriptions(status?: string): Promise<NewsletterSubscription[]> {
    console.warn('Firebase service disabled - getNewsletterSubscriptions called');
    return Promise.resolve([]);
  }

  async createUserAccount(userData: Omit<UserAccount, 'id' | 'createdAt'>): Promise<string> {
    console.warn('Firebase service disabled - createUserAccount called');
    return Promise.resolve('mock-user-id');
  }

  async updateUserAccount(id: string, updates: Partial<UserAccount>): Promise<void> {
    console.warn('Firebase service disabled - updateUserAccount called');
    return Promise.resolve();
  }

  async getUserAccount(id: string): Promise<UserAccount | null> {
    console.warn('Firebase service disabled - getUserAccount called');
    return Promise.resolve(null);
  }

  async signUp(email: string, password: string, userData: Omit<UserAccount, 'id' | 'email' | 'createdAt'>): Promise<any> {
    console.warn('Firebase service disabled - signUp called');
    return Promise.resolve({ uid: 'mock-uid', email });
  }

  async signIn(email: string, password: string): Promise<any> {
    console.warn('Firebase service disabled - signIn called');
    return Promise.resolve({ uid: 'mock-uid', email });
  }

  async signOut(): Promise<void> {
    console.warn('Firebase service disabled - signOut called');
    return Promise.resolve();
  }

  async updateAdminSettings(settings: Omit<AdminSettings, 'id' | 'updatedAt'>): Promise<void> {
    console.warn('Firebase service disabled - updateAdminSettings called');
    return Promise.resolve();
  }

  async getAdminSettings(): Promise<AdminSettings | null> {
    console.warn('Firebase service disabled - getAdminSettings called');
    return Promise.resolve(null);
  }

  async uploadImage(file: File, path: string): Promise<string> {
    console.warn('Firebase service disabled - uploadImage called');
    return Promise.resolve('mock-image-url');
  }

  async getAnalytics(): Promise<{
    totalBlogs: number;
    totalSubscriptions: number;
    totalUsers: number;
    recentActivity: any[];
  }> {
    console.warn('Firebase service disabled - getAnalytics called');
    return Promise.resolve({
      totalBlogs: 0,
      totalSubscriptions: 0,
      totalUsers: 0,
      recentActivity: []
    });
  }
}

export const firebaseService = new MockFirebaseService();
export default firebaseService;
