import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, User } from "lucide-react";
import { Article } from "@/data/articles";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

interface CategoryPageLayoutProps {
  title: string;
  description: string;
  articles: Article[];
  categoryColor: string;
  heroImage: string;
}

const CategoryPageLayout = ({ 
  title, 
  description, 
  articles, 
  categoryColor, 
  heroImage 
}: CategoryPageLayoutProps) => {
  const navigate = useNavigate();
  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  const handleArticleClick = (articleId: string) => {
    navigate(`/article/${articleId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-elegant">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60"></div>
        </div>
        
        <div className="relative container mx-auto max-w-7xl text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h1 className="text-5xl sm:text-6xl font-playfair font-bold mb-6">
              {title}
            </h1>
            <p className="text-xl font-inter max-w-3xl mx-auto leading-relaxed">
              {description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredArticles.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <motion.h2 
              className="text-3xl font-playfair font-bold mb-12 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Featured Articles
            </motion.h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {featuredArticles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="cursor-pointer"
                  onClick={() => handleArticleClick(article.id)}
                >
                  <Card className="overflow-hidden shadow-elegant hover:shadow-magazine transition-all duration-300 border-0 h-full">
                    <div className="relative">
                      <img 
                        src={article.image} 
                        alt={article.title}
                        className="w-full h-64 object-cover"
                      />
                      <Badge className={`absolute top-4 left-4 bg-${categoryColor} text-white`}>
                        Featured
                      </Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-playfair font-bold mb-3 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-muted-foreground font-inter mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} />
                          <span>{new Date(article.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mt-4">
                        {article.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Articles */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="container mx-auto max-w-7xl">
          <motion.h2 
            className="text-3xl font-playfair font-bold mb-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            All {title} Articles
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => handleArticleClick(article.id)}
              >
                <Card className="overflow-hidden shadow-elegant hover:shadow-magazine transition-all duration-300 border-0 h-full">
                  <div className="relative">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-48 object-cover"
                    />
                    {article.featured && (
                      <Badge className={`absolute top-4 left-4 bg-${categoryColor} text-white`}>
                        Featured
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-playfair font-bold mb-3 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground font-inter mb-4 line-clamp-2">
                      {article.excerpt}
                    </p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={14} />
                        <span>{article.readTime}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2">
                      {article.tags.slice(0, 3).map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPageLayout;
