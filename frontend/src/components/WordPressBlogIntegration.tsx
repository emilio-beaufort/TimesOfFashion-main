import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { freeWordPressApi, WordPressPost } from "@/services/freeWordPressApi";

interface WordPressBlogIntegrationProps {
  maxPosts?: number;
  showCategories?: boolean;
  showExcerpt?: boolean;
}

const WordPressBlogIntegration = ({ 
  maxPosts = 6, 
  showCategories = true, 
  showExcerpt = true 
}: WordPressBlogIntegrationProps) => {
  const [articles, setArticles] = useState<WordPressPost[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  useEffect(() => {
    loadContent();
  }, [selectedCategory, maxPosts]);

  const loadContent = async () => {
    setLoading(true);
    try {
      const [articlesData, categoriesData] = await Promise.all([
        freeWordPressApi.getPosts({
          per_page: maxPosts,
          categories: selectedCategory,
        }),
        showCategories ? freeWordPressApi.getCategories() : Promise.resolve([])
      ]);

      setArticles(articlesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to load WordPress content:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return freeWordPressApi.formatDate(dateString);
  };

  const stripHtml = (html: string) => {
    return freeWordPressApi.stripHtml(html);
  };

  if (loading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin bg-gradient-crimson-glow bg-clip-text text-transparent" />
            <span className="ml-2 text-lg font-inter">Loading latest articles...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-playfair font-bold mb-4">
            Latest from <span className="bg-gradient-deep-luxury-red bg-clip-text text-transparent">Our Blog</span>
          </h2>
          <p className="text-lg text-muted-foreground font-inter max-w-2xl mx-auto">
            Stay updated with the latest fashion trends, beauty tips, and style inspiration from our expert team.
          </p>
        </motion.div>

        {/* Category Filter */}
        {showCategories && categories.length > 0 && (
          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Button
              variant={selectedCategory === '' ? "default" : "outline"}
              onClick={() => setSelectedCategory('')}
              className="rounded-full"
            >
              All Articles
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id.toString() ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id.toString())}
                className="rounded-full"
              >
                {category.name}
              </Button>
            ))}
          </motion.div>
        )}

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full shadow-magazine border-0 overflow-hidden group hover:shadow-elegant transition-all duration-300">
                  {/* Featured Image */}
                  {article._embedded?.['wp:featuredmedia']?.[0] && (
                    <div className="relative overflow-hidden">
                      <img
                        src={article._embedded['wp:featuredmedia'][0].source_url}
                        alt={article._embedded['wp:featuredmedia'][0].alt_text || article.title.rendered}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}

                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{formatDate(article.date)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>Times of Fashion</span>
                      </div>
                    </div>
                    <CardTitle className="font-playfair text-xl leading-tight group-hover:bg-gradient-crimson-glow group-hover:bg-clip-text group-hover:text-transparent transition-colors duration-300">
                      {stripHtml(article.title.rendered)}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {showExcerpt && (
                      <p className="text-muted-foreground font-inter mb-4 line-clamp-3">
                        {stripHtml(article.excerpt.rendered)}
                      </p>
                    )}
                    
                    <Button
                      variant="ghost"
                      className="p-0 h-auto font-inter font-semibold bg-gradient-crimson-glow bg-clip-text text-transparent hover:bg-gradient-crimson-glow/80 group"
                      onClick={() => {
                        // Navigate to article - you can implement routing here
                        window.open(`${process.env.VITE_WORDPRESS_URL}/${article.slug}`, '_blank');
                      }}
                    >
                      Read More
                      <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-muted-foreground font-inter">
              No articles found. Check back soon for new content!
            </p>
          </motion.div>
        )}

        {/* View All Button */}
        {articles.length > 0 && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Button
              size="lg"
              className="bg-gradient-crimson-glow hover:bg-gradient-crimson-glow/90 text-primary font-inter font-semibold px-8 shadow-lg"
              onClick={() => {
                // Navigate to blog page
                window.location.href = '/blog';
              }}
            >
              View All Articles
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default WordPressBlogIntegration;
