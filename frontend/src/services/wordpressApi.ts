// WordPress REST API integration service
const WORDPRESS_BASE_URL = process.env.VITE_WORDPRESS_URL || 'http://localhost/wordpress';
const API_BASE_URL = `${WORDPRESS_BASE_URL}/wp-json`;

export interface NewsletterSubscription {
  email: string;
  name?: string;
}

export interface WordPressResponse<T> {
  data: T;
  status: 'success' | 'error';
  message: string;
}

export interface FashionArticle {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  date: string;
  slug: string;
  categories: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
  };
}

class WordPressApiService {
  private async fetchWithErrorHandling<T>(
    url: string, 
    options: RequestInit = {}
  ): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('WordPress API Error:', error);
      throw error;
    }
  }

  // Newsletter subscription
  async subscribeToNewsletter(data: NewsletterSubscription): Promise<WordPressResponse<any>> {
    try {
      const response = await this.fetchWithErrorHandling<WordPressResponse<any>>(
        `${API_BASE_URL}/timesoffashion/v1/newsletter`,
        {
          method: 'POST',
          body: JSON.stringify(data),
        }
      );
      return response;
    } catch (error) {
      return {
        data: null,
        status: 'error',
        message: 'Failed to subscribe. Please try again later.',
      };
    }
  }

  // Get fashion articles
  async getFashionArticles(params: {
    per_page?: number;
    page?: number;
    categories?: string;
    search?: string;
  } = {}): Promise<FashionArticle[]> {
    const queryParams = new URLSearchParams();
    
    if (params.per_page) queryParams.append('per_page', params.per_page.toString());
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.categories) queryParams.append('categories', params.categories);
    if (params.search) queryParams.append('search', params.search);
    
    queryParams.append('_embed', 'true'); // Include featured media

    try {
      return await this.fetchWithErrorHandling<FashionArticle[]>(
        `${API_BASE_URL}/wp/v2/fashion_article?${queryParams.toString()}`
      );
    } catch (error) {
      console.error('Failed to fetch fashion articles:', error);
      return [];
    }
  }

  // Get single fashion article
  async getFashionArticle(slug: string): Promise<FashionArticle | null> {
    try {
      const articles = await this.fetchWithErrorHandling<FashionArticle[]>(
        `${API_BASE_URL}/wp/v2/fashion_article?slug=${slug}&_embed=true`
      );
      return articles.length > 0 ? articles[0] : null;
    } catch (error) {
      console.error('Failed to fetch fashion article:', error);
      return null;
    }
  }

  // Get fashion categories
  async getFashionCategories(): Promise<any[]> {
    try {
      return await this.fetchWithErrorHandling<any[]>(
        `${API_BASE_URL}/wp/v2/fashion_category`
      );
    } catch (error) {
      console.error('Failed to fetch fashion categories:', error);
      return [];
    }
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      await this.fetchWithErrorHandling(`${API_BASE_URL}/wp/v2/posts?per_page=1`);
      return true;
    } catch (error) {
      return false;
    }
  }
}

export const wordpressApi = new WordPressApiService();
export default wordpressApi;
