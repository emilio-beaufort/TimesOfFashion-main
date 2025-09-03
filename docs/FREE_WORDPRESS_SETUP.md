# Free Headless WordPress Setup Guide

## Free WordPress Options

### Option 1: WordPress.com (Free Plan) - Recommended
- **Cost**: Completely free
- **Subdomain**: yoursite.wordpress.com
- **API Access**: Full REST API available
- **Storage**: 3GB free
- **Limitations**: WordPress.com branding, limited plugins

### Option 2: Local Development + Free Hosting
- **Local**: XAMPP/Local by Flywheel (free)
- **Hosting**: InfinityFree, 000webhost, or Heroku (free tiers)
- **Domain**: Use free subdomain initially

## WordPress.com Setup (Easiest)

### 1. Create WordPress.com Account
1. Go to wordpress.com
2. Sign up for free account
3. Choose a subdomain: `timesoffashion.wordpress.com`
4. Select "Start with a free site"

### 2. Configure for Headless Use
```javascript
// Your WordPress.com site will be accessible at:
// https://timesoffashion.wordpress.com/wp-json/wp/v2/
```

### 3. Create Content Structure
Since WordPress.com free plan has limited plugin access, we'll use built-in features:

#### Use Built-in Post Categories:
- Fashion Trends
- Beauty Tips  
- Style Guides
- Celebrity Fashion
- Seasonal Looks

#### Custom Fields (Available on free plan):
- Featured Image
- Excerpt
- Tags
- Categories

### 4. Content Creation Workflow
1. **Posts**: Create regular WordPress posts
2. **Categories**: Use for fashion content types
3. **Tags**: For detailed categorization
4. **Featured Images**: For article thumbnails
5. **Excerpts**: For preview text

## Local WordPress Setup (More Control)

### 1. Install Local by Flywheel (Free)
```bash
# Download from localwp.com
# Install and create new site
# Site name: timesoffashion
# Username: admin
# Password: your-secure-password
```

### 2. Essential Free Plugins
```php
// Add to functions.php for CORS
add_action('rest_api_init', function() {
    remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');
    add_filter('rest_pre_serve_request', function($value) {
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');
        return $value;
    });
});

// Custom post type for fashion articles
add_action('init', 'create_fashion_posts');
function create_fashion_posts() {
    register_post_type('fashion_article', array(
        'labels' => array(
            'name' => 'Fashion Articles',
            'singular_name' => 'Fashion Article'
        ),
        'public' => true,
        'show_in_rest' => true,
        'supports' => array('title', 'editor', 'thumbnail', 'excerpt'),
        'has_archive' => true,
    ));
}

// Custom taxonomy
add_action('init', 'create_fashion_categories');
function create_fashion_categories() {
    register_taxonomy('fashion_category', 'fashion_article', array(
        'hierarchical' => true,
        'labels' => array(
            'name' => 'Fashion Categories',
            'singular_name' => 'Fashion Category'
        ),
        'show_in_rest' => true,
        'public' => true
    ));
}
```

### 3. Free Hosting Options

#### InfinityFree
- **URL**: infinityfree.net
- **Storage**: Unlimited
- **Bandwidth**: Unlimited
- **Subdomain**: yoursite.epizy.com
- **MySQL**: Included

#### 000webhost
- **URL**: 000webhost.com  
- **Storage**: 1GB
- **Bandwidth**: 10GB/month
- **Subdomain**: yoursite.000webhostapp.com
- **MySQL**: Included

## API Endpoints (WordPress.com)

### Get Posts
```
GET https://timesoffashion.wordpress.com/wp-json/wp/v2/posts
```

### Get Categories  
```
GET https://timesoffashion.wordpress.com/wp-json/wp/v2/categories
```

### Get Media
```
GET https://timesoffashion.wordpress.com/wp-json/wp/v2/media
```

## Content Management Strategy

### 1. Content Types Using Built-in Features
```javascript
// Fashion Articles (Regular Posts)
{
  "categories": ["Fashion Trends", "Style Guides"],
  "tags": ["summer-2024", "casual-wear", "accessories"],
  "featured_media": "image-id",
  "excerpt": "Short description..."
}

// Beauty Content
{
  "categories": ["Beauty Tips"],
  "tags": ["skincare", "makeup", "tutorials"],
  "custom_fields": {
    "difficulty_level": "beginner",
    "time_required": "15 minutes"
  }
}
```

### 2. Image Management
- Use WordPress.com's free media library
- Optimize images before upload
- Use featured images for article thumbnails
- Alt text for SEO and accessibility

### 3. SEO Optimization (Free)
- Use Yoast SEO (available on WordPress.com)
- Optimize titles and meta descriptions
- Use proper heading structure
- Internal linking between articles

## Limitations & Workarounds

### WordPress.com Free Limitations
1. **No custom plugins**: Use built-in features creatively
2. **Limited customization**: Focus on content, not design
3. **WordPress.com branding**: Accept for free tier
4. **No custom domain**: Use subdomain initially

### Workarounds
1. **Custom fields**: Use post meta for additional data
2. **Categories as content types**: Organize content effectively  
3. **Tags for filtering**: Detailed content categorization
4. **Excerpts for previews**: Manual content summaries

## Migration Path (Future)

When you have budget:
1. **Custom domain**: $18/year
2. **WordPress.com Personal**: $4/month (remove branding)
3. **Self-hosted WordPress**: More control and plugins
4. **Premium email services**: MailChimp, ConvertKit

## Content Creation Workflow

### 1. Article Creation
1. Login to WordPress.com admin
2. Create new post
3. Add title, content, excerpt
4. Set featured image
5. Assign categories and tags
6. Publish

### 2. Content Organization
```
Categories:
├── Fashion Trends
├── Beauty Tips
├── Style Guides
├── Celebrity Fashion
└── Seasonal Looks

Tags:
├── summer-2024
├── winter-fashion
├── casual-wear
├── formal-wear
├── accessories
└── skincare
```

### 3. API Testing
Use browser or Postman to test:
```
https://timesoffashion.wordpress.com/wp-json/wp/v2/posts?per_page=5&_embed
```

This setup gives you a completely free headless WordPress solution that your React frontend can consume via REST API.
