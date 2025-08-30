import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const CategoryHighlights = () => {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Fashion Intelligence",
      description: "Where tomorrow's trends are born today - decode, predict, and master style's most intriguing mysteries",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
      count: "03 articles",
      color: "pastel-blush",
      route: "/fashion"
    },
    {
      name: "Beauty Revolution",
      description: "Where science meets artistry and skincare becomes the ultimate form of self-expression",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop",
      count: "03 articles",
      color: "pastel-lavender",
      route: "/beauty"
    },
    {
      name: "Life Elevated",
      description: "Where everyday moments transform into extraordinary experiences through mindful style choices",
      image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
      count: "03 articles",
      color: "pastel-mint",
      route: "/lifestyle"
    },
    {
      name: "Icon Intelligence",
      description: "Decode the psychology and strategy behind every celebrity style moment that captures global attention",
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=300&fit=crop",
      count: "03 articles",
      color: "rose-gold",
      route: "/celebrity"
    },
    {
      name: "Cultural Currents",
      description: "Where fashion intersects with society, technology, and human behavior to create tomorrow's cultural narratives",
      image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      count: "03 articles",
      color: "pastel-blush",
      route: "/culture"
    },
    {
      name: "Wellness & Style Harmony",
      description: "Where inner transformation meets outer expression through mindful beauty and healing-focused style practices",
      image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=400&h=300&fit=crop",
      count: "03 articles",
      color: "rose-gold",
      route: "/wellness"
    }
  ];

  const handleCategoryClick = (route: string) => {
    navigate(route);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-elegant">
      <div className="container mx-auto max-w-7xl">
        {/* Section Heading */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: false, amount: 0.2 }}
        >
          <h2 className="text-4xl sm:text-5xl font-playfair font-bold mb-4">
            Discover Our <span className="bg-gradient-deep-luxury-red bg-clip-text text-transparent">Categories</span>
          </h2>
          <p className="text-lg text-muted-foreground font-inter max-w-2xl mx-auto">
          Multiple worlds of style intelligence, infinite possibilities for transformation
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: false, amount: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <Card className="group overflow-hidden shadow-elegant hover:shadow-magazine transition-all duration-300 border-0">
                <div className="relative overflow-hidden">
                  <motion.img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-playfair font-bold mb-1">{category.name}</h3>
                    <p className="text-sm font-inter text-gray-200">{category.count}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <motion.p 
                    className="text-muted-foreground font-inter mb-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1.2, delay: 0.2 }}
                    viewport={{ once: false, amount: 0.2 }}
                  >
                    {category.description}
                  </motion.p>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                    <Button 
                      variant="ghost" 
                      className="p-0 h-auto font-inter font-semibold bg-gradient-crimson-glow bg-clip-text text-transparent !bg-transparent cursor-pointer"
                      onClick={() => handleCategoryClick(category.route)}
                    >
                      Explore Category
                      <ArrowRight size={16} className="ml-2 !translate-x-0 bg-gradient-crimson-glow bg-clip-text text-transparent" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryHighlights;
