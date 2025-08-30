import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const LatestArticles = () => {
  const navigate = useNavigate();
  const articles = [
    {
      id: 1,
      title: "The Trend-Less Revolution: Why Fashion's Biggest Movement Has No Name",
      // excerpt:"From bold colors to minimalist chic, discover the must-have trends that are dominating runways and streets this season.",
      category: "Fashion Intelligence",
      // author: "Emma Stone",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      featured: true,
    },
    {
      id: 2,
      title: "Gen Z's Anti-Influencer Influence: The New Power Players You've Never Heard Of",
      // excerpt:"Look expensive without breaking the bank with these clever styling tricks and shopping strategies.",
      category: "Culture ",
      // author: "Sophia Chen",
      readTime: "9 min read",
      image:
        "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      title: "Quiet Luxury's Loud Rebellion: How Stealth Wealth Became Street",
      // excerpt:"Get inspired by the effortless looks of your favorite celebrities and learn how to recreate them.",
      category: "Luxury",
      // author: "Alex Rivera",
      readTime: "6 min read",
      image:
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      title: "The Trend-Less Revolution: Why Fashion's Biggest Movement Has No Name",
      // excerpt:"From bold colors to minimalist chic, discover the must-have trends that are dominating runways and streets this season.",
      category: "Fashion Intelligence",
      // author: "Emma Stone",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      featured: true,
    },
  ];

  const handleArticleClick = (articleId: number) => {
    navigate(`/article/${articleId}`);
  };

  // Animation variants for fade-up effect
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="latest-articles" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2 }}
          transition={{ duration: 1.5 }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold mb-4">
            Style <span className="bg-gradient-deep-luxury-red bg-clip-text text-transparent">Chronicles</span>
          </h2>
          <p className="text-lg text-muted-foreground font-inter max-w-2xl mx-auto">
            Stay ahead of the curve with our curated selection of fashion insights, 
            beauty revelations, and lifestyle inspiration
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Featured Article */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
            transition={{ duration: 1.5 }}
            variants={fadeUp}
            className="lg:col-span-1"
          >
            <Card 
              className="group overflow-hidden h-full shadow-magazine hover:shadow-rose-gold transition-all duration-300 border-0"
              onClick={() => handleArticleClick(articles[0].id)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={articles[0].image}
                  alt={articles[0].title}
                  className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-crimson-glow text-primary px-3 py-1 rounded-full text-sm font-inter font-semibold">
                    {articles[0].category}
                  </span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <CardContent className="p-6">
                <h3 className="text-2xl font-playfair font-bold mb-3 group-hover:bg-gradient-crimson-glow group-hover:bg-clip-text group-hover:text-transparent transition-colors">
                  {articles[0].title}
                </h3>
                <p className="text-muted-foreground font-inter mb-4 line-clamp-3">
                  {/* {articles[0].excerpt} */}
                </p>
                <div className="flex items-center justify-between text-sm text-neutral-500">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <User size={16} />
                      {/* <span>{articles[0].author}</span> */}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={16} />
                      <span>{articles[0].readTime}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Other Articles */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.2 }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.3 },
              },
            }}
            className="grid grid-cols-1 gap-6"
          >
            {articles.slice(1).map((article) => (
              <motion.div key={article.id} variants={fadeUp} transition={{ duration: 1.5 }}>
                <Card 
                  className="group overflow-hidden shadow-elegant hover:shadow-rose-gold transition-all duration-300 border-0"
                  onClick={() => handleArticleClick(article.id)}
                >
                  <div className="flex gap-4 p-6">
                    <div className="relative w-32 h-24 overflow-hidden rounded-lg flex-shrink-0">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="mb-2">
                        <span className="bg-pastel-blush text-primary px-2 py-1 rounded-full text-xs font-inter font-medium">
                          {article.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-playfair font-semibold mb-2 group-hover:bg-gradient-crimson-glow group-hover:bg-clip-text group-hover:text-transparent transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground font-inter">
                        <div className="flex items-center gap-1">
                          <User size={12} />
                          {/* <span>{article.author}</span> */}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2 }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="text-center"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="outline"
              size="lg"
              className="border-rose-gold bg-gradient-crimson-glow bg-clip-text text-transparent hover:bg-gradient-crimson-glow hover:text-primary font-inter font-semibold px-8"
              onClick={() => navigate('/all-articles')}
            >
              View All Articles
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestArticles;