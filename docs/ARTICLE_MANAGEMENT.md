# Article Management Guide

This guide explains how to easily manage articles for your Times of Fashion website.

## How to Add/Edit Articles

All articles are stored in `/src/data/articles.ts`. This file contains arrays for each category:

- `fashionArticles` - Fashion category articles
- `beautyArticles` - Beauty category articles  
- `lifestyleArticles` - Lifestyle category articles
- `celebrityArticles` - Celebrity category articles
- `cultureArticles` - Culture category articles
- `wellnessArticles` - Wellness Honours category articles

## Article Structure

Each article follows this structure:

```typescript
{
  id: "unique-id",                    // Unique identifier
  title: "Article Title",             // Main headline
  excerpt: "Brief description...",    // Short summary for cards
  content: "Full article content...", // Main article text
  image: "https://image-url.com",     // Featured image URL
  author: "Author Name",              // Writer's name
  date: "2024-03-15",                // Publication date (YYYY-MM-DD)
  readTime: "5 min read",            // Estimated reading time
  tags: ["tag1", "tag2"],            // Category tags
  featured: true                     // Optional: marks as featured
}
```

## Adding New Articles

1. Open `/src/data/articles.ts`
2. Find the appropriate category array (e.g., `fashionArticles`)
3. Add your new article object to the array
4. Save the file - changes will appear immediately

## Example: Adding a Fashion Article

```typescript
export const fashionArticles: Article[] = [
  // ... existing articles
  {
    id: "fashion-4",
    title: "Your New Fashion Article",
    excerpt: "A compelling description of your article",
    content: "Your full article content goes here...",
    image: "https://images.unsplash.com/your-image-url",
    author: "Your Name",
    date: "2024-03-20",
    readTime: "6 min read",
    tags: ["new-tag", "fashion"],
    featured: false
  }
];
```

## Featured Articles

Set `featured: true` to display articles in the featured section at the top of category pages.

## Image Guidelines

- Use high-quality images (minimum 800x600px)
- Unsplash URLs work well: `https://images.unsplash.com/photo-id?w=800&h=600&fit=crop`
- Ensure images are relevant to your content

## Category Routes

The following routes are available:
- `/fashion` - Fashion articles
- `/beauty` - Beauty articles  
- `/lifestyle` - Lifestyle articles
- `/celebrity` - Celebrity articles
- `/culture` - Culture articles
- `/wellness` - Wellness Honours articles

## Tips for Content Management

1. **Consistent Dating**: Use YYYY-MM-DD format for dates
2. **SEO-Friendly Tags**: Use descriptive, lowercase tags with hyphens
3. **Engaging Excerpts**: Keep excerpts under 150 characters
4. **Unique IDs**: Use category-number format (e.g., "fashion-1", "beauty-2")
5. **Read Time**: Estimate 200 words per minute for reading time

## Testing Your Changes

After adding articles:
1. Save the file
2. Navigate to the category page in your browser
3. Verify the article appears correctly
4. Check that featured articles show in the featured section

Your changes will be reflected immediately without needing to restart the development server.
