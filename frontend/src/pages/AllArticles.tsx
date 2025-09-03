import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, Filter } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllArticles, getArticlesByCategory } from "@/data/articles";

const AllArticles = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const categories = [
    { name: "All", value: "all" },
    { name: "Fashion", value: "fashion" },
    { name: "Beauty", value: "beauty" },
    { name: "Lifestyle", value: "lifestyle" },
    { name: "Celebrity", value: "celebrity" },
    { name: "Culture", value: "culture" },
    { name: "Wellness", value: "wellness" }
  ];

  const getFilteredArticles = () => {
    if (selectedCategory === "all") {
      return getAllArticles();
    }
    return getArticlesByCategory(selectedCategory);
  };

  const articles = getFilteredArticles();

  const handleArticleClick = (articleId: string) => {
    navigate(`/article/${articleId}`);
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-7xl">
          {/* Page Header */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
            transition={{ duration: 1.2 }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-playfair font-bold mb-4">
              All <span className="bg-gradient-deep-luxury-red bg-clip-text text-transparent">Articles</span>
            </h1>
            <p className="text-lg text-muted-foreground font-inter max-w-2xl mx-auto">
              Explore our complete collection of fashion insights, beauty tips, and lifestyle inspiration
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2 }}
            viewport={{ amount: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <div className="flex items-center gap-2 mb-4">
              <Filter size={20} className="text-rose-gold" />
              <span className="font-inter font-medium text-gray-700">Filter by category:</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className={`font-inter ${
                    selectedCategory === category.value
                      ? "bg-gradient-crimson-glow text-primary hover:bg-gradient-crimson-glow/90"
                      : "border-rose-gold bg-gradient-crimson-glow bg-clip-text text-transparent hover:bg-gradient-crimson-glow hover:text-primary"
                  }`}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Articles Count */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            viewport={{ amount: 0.2 }}
            className="text-center mb-8"
          >
            <p className="text-muted-foreground font-inter">
              Showing {articles.length} article{articles.length !== 1 ? 's' : ''}
              {selectedCategory !== "all" && ` in ${categories.find(c => c.value === selectedCategory)?.name}`}
            </p>
          </motion.div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <motion.div
                key={article.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ amount: 0.2 }}
                transition={{ duration: 1.2, delay: index * 0.1 }}
                variants={fadeUp}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => handleArticleClick(article.id)}
              >
                <Card className="group overflow-hidden h-full shadow-elegant hover:shadow-magazine transition-all duration-300 border-0">
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-crimson-glow text-primary px-3 py-1 rounded-full text-sm font-inter font-semibold capitalize">
                        {article.tags[0]?.replace('-', ' ') || 'Article'}
                      </span>
                    </div>
                    {article.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-pastel-blush text-primary px-2 py-1 rounded-full text-xs font-inter font-medium">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-playfair font-bold mb-3 group-hover:bg-gradient-crimson-glow group-hover:bg-clip-text group-hover:text-transparent transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground font-inter mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground font-inter">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User size={16} />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* No Articles Message */}
          {articles.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              viewport={{ amount: 0.2 }}
              className="text-center py-12"
            >
              <p className="text-lg text-muted-foreground font-inter">
                No articles found in this category.
              </p>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllArticles;
