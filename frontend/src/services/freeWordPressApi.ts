// Free WordPress.com REST API integration
const WORDPRESS_BASE_URL = process.env.VITE_WORDPRESS_URL || 'https://timesoffashion.wordpress.com';
const API_BASE_URL = `${WORDPRESS_BASE_URL}/wp-json`;

export interface WordPressPost {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  featured_media: number;
  date: string;
  slug: string;
  categories: number[];
  tags: number[];
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
    }>;
    'wp:term'?: Array<Array<{
      id: number;
      name: string;
      slug: string;
    }>>;
  };
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

class FreeWordPressApiService {
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

  // Get posts with embedded media and terms
  async getPosts(params: {
    per_page?: number;
    page?: number;
    categories?: string;
    search?: string;
    orderby?: string;
    order?: 'asc' | 'desc';
  } = {}): Promise<WordPressPost[]> {
    const queryParams = new URLSearchParams();
    
    // Default parameters
    queryParams.append('_embed', 'true');
    queryParams.append('per_page', (params.per_page || 10).toString());
    queryParams.append('orderby', params.orderby || 'date');
    queryParams.append('order', params.order || 'desc');
    
    if (params.page) queryParams.append('page', params.page.toString());
    if (params.categories) queryParams.append('categories', params.categories);
    if (params.search) queryParams.append('search', params.search);

    try {
      return await this.fetchWithErrorHandling<WordPressPost[]>(
        `${API_BASE_URL}/wp/v2/posts?${queryParams.toString()}`
      );
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      return [];
    }
  }

  // Get single post by slug
  async getPostBySlug(slug: string): Promise<WordPressPost | null> {
    try {
      const posts = await this.fetchWithErrorHandling<WordPressPost[]>(
        `${API_BASE_URL}/wp/v2/posts?slug=${slug}&_embed=true`
      );
      return posts.length > 0 ? posts[0] : null;
    } catch (error) {
      console.error('Failed to fetch post:', error);
      return null;
    }
  }

  // Get categories
  async getCategories(): Promise<WordPressCategory[]> {
    try {
      return await this.fetchWithErrorHandling<WordPressCategory[]>(
        `${API_BASE_URL}/wp/v2/categories?per_page=100&orderby=count&order=desc`
      );
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      return [];
    }
  }

  // Get posts by category
  async getPostsByCategory(categorySlug: string, limit: number = 10): Promise<WordPressPost[]> {
    try {
      // First get category ID by slug
      const categories = await this.getCategories();
      const category = categories.find(cat => cat.slug === categorySlug);
      
      if (!category) {
        console.warn(`Category '${categorySlug}' not found`);
        return [];
      }

      return await this.getPosts({
        categories: category.id.toString(),
        per_page: limit
      });
    } catch (error) {
      console.error('Failed to fetch posts by category:', error);
      return [];
    }
  }

  // Search posts
  async searchPosts(query: string, limit: number = 10): Promise<WordPressPost[]> {
    try {
      return await this.getPosts({
        search: query,
        per_page: limit
      });
    } catch (error) {
      console.error('Failed to search posts:', error);
      return [];
    }
  }

  // Get featured posts (you can customize this logic)
  async getFeaturedPosts(limit: number = 5): Promise<WordPressPost[]> {
    try {
      // Get posts with featured images
      const posts = await this.getPosts({ per_page: limit * 2 });
      return posts.filter(post => post.featured_media > 0).slice(0, limit);
    } catch (error) {
      console.error('Failed to fetch featured posts:', error);
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

  // Get site info
  async getSiteInfo(): Promise<any> {
    try {
      return await this.fetchWithErrorHandling(`${API_BASE_URL}`);
    } catch (error) {
      console.error('Failed to fetch site info:', error);
      return null;
    }
  }

  // Utility function to strip HTML from content
  stripHtml(html: string): string {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  }

  // Utility function to format date
  formatDate(dateString: string, options: Intl.DateTimeFormatOptions = {}): string {
    const defaultOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    
    return new Date(dateString).toLocaleDateString('en-US', { ...defaultOptions, ...options });
  }

  // Get reading time estimate
  getReadingTime(content: string): number {
    const wordsPerMinute = 200;
    const wordCount = this.stripHtml(content).split(/\s+/).length;
    return Math.ceil(wordCount / wordsPerMinute);
  }
}

export const freeWordPressApi = new FreeWordPressApiService();
export default freeWordPressApi;
