import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowLeft, Share2 } from "lucide-react";
import { Article } from "@/data/articles";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigate } from "react-router-dom";

interface ArticlePageProps {
  article: Article;
  categoryName: string;
  categoryRoute: string;
}

const ArticlePage = ({ article, categoryName, categoryRoute }: ArticlePageProps) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(categoryRoute);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-elegant">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={article.image} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/70"></div>
        </div>
        
        <div className="relative container mx-auto max-w-4xl">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Button
              variant="ghost"
              onClick={handleBackClick}
              className="text-white hover:bg-white/20 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to {categoryName}
            </Button>
          </motion.div>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="text-white"
          >
            {article.featured && (
              <Badge className="mb-4 bg-gradient-crimson-glow text-white">
                Featured Article
              </Badge>
            )}
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold mb-6 leading-tight">
              {article.title}
            </h1>
            
            <p className="text-xl font-inter mb-8 text-gray-200 leading-relaxed">
              {article.excerpt}
            </p>
            
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <User size={18} />
                <span className="font-medium">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                <span>{new Date(article.date).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{article.readTime}</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-gray-300 hover:text-white hover:bg-white/20"
              >
                <Share2 size={18} className="mr-2" />
                Share
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <motion.article
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white rounded-lg shadow-elegant p-8 lg:p-12"
          >
            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              {article.content.split('\n\n').map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="mb-6 text-gray-700 font-inter leading-relaxed text-lg"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
            
            {/* Tags */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <h3 className="text-lg font-playfair font-semibold mb-4 text-gray-800">
                Related Topics
              </h3>
              <div className="flex flex-wrap gap-3">
                {article.tags.map(tag => (
                  <Badge key={tag} variant="secondary" className="text-sm px-3 py-1">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </motion.div>

            {/* Author Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-12 pt-8 border-t border-gray-200"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-rose-gold to-pastel-blush rounded-full flex items-center justify-center">
                  <User size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-playfair font-semibold text-gray-800">
                    {article.author}
                  </h4>
                  <p className="text-gray-600 font-inter">
                    Fashion & Lifestyle Writer
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Back to Category */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-12 text-center"
            >
              <Button
                onClick={handleBackClick}
                className="bg-gradient-crimson-glow hover:bg-gradient-crimson-glow/90 text-white px-8 py-3"
              >
                <ArrowLeft size={20} className="mr-2" />
                More {categoryName} Articles
              </Button>
            </motion.div>
          </motion.article>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ArticlePage;
