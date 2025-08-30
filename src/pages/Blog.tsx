import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, User, Tag } from "lucide-react";

const Blog = () => {
  const { category } = useParams();
  
  const getCategoryTitle = (cat: string | undefined) => {
    switch (cat) {
      case 'fashion': return 'Fashion';
      case 'beauty': return 'Beauty';
      case 'lifestyle': return 'Lifestyle';
      case 'celebrity': return 'Celebrity';
      case 'culture': return 'Culture';
      case 'wellness honours': return 'Wellness Honours';
      // case 'honours': return 'Honours';
      default: return 'All Articles';
    }
  };

  const getCategoryDescription = (cat: string | undefined) => {
    switch (cat) {
      case 'fashion': return 'Discover the latest runway trends, street style inspiration, and timeless fashion advice';
      case 'beauty': return 'From skincare routines to makeup tutorials, find everything beauty-related here';
      case 'lifestyle': return 'Curated content for living your best life with style and purpose';
      case 'celebrity': return 'Get the inside scoop on celebrity fashion, red carpet looks, and star interviews';
      case 'culture': return 'Explore the intersection of fashion, art, music, and cultural movements';
      case 'wellness honours': return 'Achieve balance and well-being through mindful living and self-care';
      // case 'honours': return 'Celebrating achievements and recognizing excellence in fashion and lifestyle';
      default: return 'Explore our complete collection of fashion, beauty, and lifestyle content';
    }
  };
  // Function to get background image based on category
  const getCategoryBackground = (cat: string | undefined) => {
    switch (cat?.toLowerCase()) {
      case "fashion":
        return "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=900&fit=crop')";
      case "beauty":
        return "url('https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&h=900&fit=crop')";
      case "lifestyle":
        return "url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop')";
      case "celebrity":
        return "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&h=900&fit=crop')";
      case "culture":
        return "url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&h=900&fit=crop')";
      case "wellness honours":
        return "url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1600&h=900&fit=crop')";
      default:
        return "url('https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?w=1600&h=900&fit=crop')";
    }
  };

  // Mock articles data
  const articles = [
    {
      id: 1,
      title: "Top 10 Fashion Trends to Try This Season",
      excerpt: "From bold colors to minimalist chic, discover the must-have trends that are dominating runways and streets this season.",
      category: "Fashion",
      author: "Emma Stone",
      readTime: "5 min read",
      date: "March 15, 2024",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      tags: ["Trends", "Runway", "Street Style"]
    },
    {
      id: 2,
      title: "Budget-Friendly Fashion Hacks That Actually Work",
      excerpt: "Look expensive without breaking the bank with these clever styling tricks and shopping strategies.",
      category: "Lifestyle",
      author: "Sophia Chen",
      readTime: "4 min read",
      date: "March 12, 2024",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&h=300&fit=crop",
      tags: ["Budget", "Shopping", "Style Tips"]
    },
    {
      id: 3,
      title: "Celebrity Street Styles You Can Copy",
      excerpt: "Get inspired by the effortless looks of your favorite celebrities and learn how to recreate them.",
      category: "Celebrity",
      author: "Alex Rivera",
      readTime: "6 min read",
      date: "March 10, 2024",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=300&fit=crop",
      tags: ["Celebrity", "Street Style", "Inspiration"]
    },
    {
      id: 4,
      title: "The Ultimate Guide to Sustainable Fashion",
      excerpt: "Make conscious choices with our comprehensive guide to building an eco-friendly wardrobe.",
      category: "Fashion",
      author: "Maya Patel",
      readTime: "8 min read",
      date: "March 8, 2024",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
      tags: ["Sustainable", "Eco-friendly", "Ethical Fashion"]
    },
    {
      id: 5,
      title: "Skincare Routine for Every Skin Type",
      excerpt: "Discover the perfect skincare routine tailored to your unique skin needs and concerns.",
      category: "Beauty",
      author: "Dr. Sarah Kim",
      readTime: "7 min read",
      date: "March 5, 2024",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=300&fit=crop",
      tags: ["Skincare", "Beauty Tips", "Self-care"]
    },
    {
      id: 6,
      title: "Mindful Living: Fashion Meets Wellness",
      excerpt: "Explore how conscious fashion choices can contribute to your overall well-being and mental health.",
      category: "Wellness",
      author: "Luna Martinez",
      readTime: "6 min read",
      date: "March 3, 2024",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68e71?w=400&h=300&fit=crop",
      tags: ["Mindfulness", "Wellness", "Conscious Living"]
    }
  ];

  // Filter articles by category if specified
  const filteredArticles = category 
    ? articles.filter(article => article.category.toLowerCase() === category.toLowerCase())
    : articles;

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <section
          className="relative h-[300px] px-4 sm:px-6 lg:px-8 bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: getCategoryBackground(category),
          }}
        >
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/20"></div> 
          {/* reduced opacity from 40% → 20% */}

          <div className="container mx-auto max-w-4xl text-center relative z-10 h-full flex flex-col justify-center">
            <h1 className="text-5xl sm:text-6xl font-playfair font-bold mb-6 text-white drop-shadow-lg">
              {getCategoryTitle(category)}{" "}
              <span className="bg-gradient-crimson-glow bg-clip-text text-transparent drop-shadow-lg">Stories</span>
            </h1>
            <p className="text-xl text-gray-200 font-inter max-w-3xl mx-auto drop-shadow-md">
              {getCategoryDescription(category)}
            </p>
          </div>
        </section>


        {/* Articles Grid */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <Card key={article.id} className="group overflow-hidden shadow-elegant hover:shadow-magazine transition-all duration-300 border-0">
                  <div className="relative overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-crimson-glow text-primary px-3 py-1 rounded-full text-sm font-inter font-semibold">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-playfair font-bold mb-3 group-hover:bg-gradient-crimson-glow group-hover:bg-clip-text group-hover:text-transparent transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground font-inter mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {article.tags.map((tag) => (
                        <span key={tag} className="bg-pastel-blush text-primary px-2 py-1 rounded-full text-xs font-inter">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground font-inter">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1">
                          <User size={14} />
                          <span>{article.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={14} />
                          <span>{article.readTime}</span>
                        </div>
                      </div>
                      <span>{article.date}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-12">
              <Button 
                variant="outline" 
                size="lg"
                className="border-rose-gold bg-gradient-crimson-glow bg-clip-text text-transparent hover:bg-gradient-crimson-glow hover:text-primary font-inter font-semibold px-8"
              >
                Load More Articles
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;