import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';
import { Button } from '../components/ui/button';

const ArticlePage = () => {
  const { id } = useParams();

  const articles = {
    "1": {
      id: 1,
      title: "The Trend-Less Revolution: Why Fashion's Biggest Movement Has No Name",
    //   excerpt: "From bold colors to minimalist chic, discover the must-have trends that are dominating runways and streets this season.",
      category: "Fashion Intelligence",
    //   author: "Emma Stone",
      readTime: "7 min read",
      date: "March 15, 2025",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
      content: `
        <p>In the summer of 2025, something unprecedented is happening in fashion. For the first time in decades, there isn't a single mega-trend dominating runways, street style, or social media. Instead, we're witnessing what fashion historians are calling "The Great Individualization."</p>

        <p>This shift began quietly in late 2024, when Gen Z consumers started rejecting algorithmic fashion suggestions and micro-trends that died within weeks. "We're exhausted by the constant pressure to reinvent ourselves every season," says Maya Sharma, a 22-year-old fashion student from Delhi. "Now, we're building wardrobes that reflect who we actually are, not who TikTok tells us to be."</p>

        <p>The data supports this sentiment. According to recent consumer behavior studies, 73% of young shoppers now prioritize "personal alignment" over trend-following when making fashion purchases. Brands like Zara and H&M are scrambling to adapt, moving away from fast-fashion cycles toward more personalized, timeless pieces.</p>

        <p>Fashion weeks in Paris, Milan, and New York have reflected this shift. Instead of presenting unified trend stories, designers are showcasing diverse collections that speak to different lifestyle needs and aesthetic preferences. "It's not about creating the next big thing anymore," explains renowned fashion forecaster Isabella Torres. "It's about creating many small things that resonate deeply with specific communities."</p>

        <p>This trend-less revolution is reshaping retail strategies, influencer marketing, and even fashion media. Publications are shifting from "must-have" content to "might-love" recommendations, acknowledging that style is becoming increasingly personal and intuitive rather than prescriptive.</p>
      `
    },
    "2": {
      id: 2,
      title: "Gen Z's Anti-Influencer Influence: The New Power Players You've Never Heard Of",
    //   excerpt: "Look expensive without breaking the bank with these clever styling tricks and shopping strategies.",
      category: "Culture",
    //   author: "Sophia Chen",
      readTime: "9 min read",
      date: "March 12, 2025",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=600&fit=crop",
      content: `
        <p>While mega-influencers lose their grip on fashion's collective consciousness, a new breed of style leaders is emerging from the shadows. These "micro-tastemakers" - individuals with followers ranging from 500 to 5,000 - are wielding unprecedented influence over fashion choices, particularly among Gen Z consumers.</p>

        <p>Unlike traditional influencers who showcase aspirational luxury lifestyles, these underground tastemakers focus on authenticity, creativity, and accessibility. They're the college students mixing thrift finds with designer pieces, the working professionals creating capsule wardrobes on budget, and the creative individuals expressing their identity through unique styling choices.</p>

        <p>"Big influencers feel like advertisements now," says Ravi Mehta, a 24-year-old software engineer from Bangalore who follows several micro-tastemakers. "These smaller accounts feel like friends showing me their actual style evolution."
        </p>
       
        <p>The phenomenon is data-driven too. Studies show that recommendations from accounts with under 10,000 followers generate 60% higher engagement rates and 40% more purchase intent than those from mega-influencers. Fashion brands are taking notice, shifting marketing budgets toward these authentic voices.</p>
        
        <p>This movement represents more than just a marketing trend - it's a fundamental shift toward democratized fashion influence. Style authority is no longer concentrated among a few celebrity figures but distributed across thousands of individuals who prioritize personal expression over commercial appeal.</p>
        `
    },
    "3": {
      id: 3,
      title: "Quiet Luxury's Loud Rebellion: How Stealth Wealth Became Street",
    //   excerpt: "Get inspired by the effortless looks of your favorite celebrities and learn how to recreate them.",
      category: "Luxury",
    //   author: "Alex Rivera", 
      readTime: "6 min read",
      date: "March 10, 2025",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=600&fit=crop",
      content: `
        <p>The quiet luxury movement, once the exclusive domain of old money elites, has undergone a radical transformation in 2025. What started as understated elegance among the ultra-wealthy has evolved into a broader cultural statement about authenticity, quality, and mindful consumption.</p>

        <p>This shift is visible everywhere from Mumbai's corporate districts to Delhi's creative neighborhoods. Young professionals are investing in fewer, better pieces - choosing a well-crafted cotton shirt over multiple fast-fashion alternatives, or selecting handcrafted leather goods over logo-heavy accessories.</p>
       
        <p>"It's about knowing quality when you see it, regardless of price point," explains Priya Kapoor, a luxury retail consultant. "A perfectly cut pair of trousers from a local tailor can embody quiet luxury principles better than an overpriced designer piece covered in logos."</p>

        <p>The movement has sparked interesting conversations about craftsmanship, sustainability, and the true meaning of luxury. Indian designers are responding by creating collections that emphasize fabric quality, construction techniques, and timeless silhouettes over flashy branding.</p>
        
        <p>This democratization of luxury principles is reshaping consumer behavior across economic segments, proving that sophistication isn't about price tags - it's about understanding and appreciating quality, fit, and craftsmanship.</p>
        `
    },
    "4": {
      id: 4,
      title: "Gen Z's Anti-Influencer Influence: The New Power Players You've Never Heard Of",
    //   excerpt: "Look expensive without breaking the bank with these clever styling tricks and shopping strategies.",
      category: "Culture",
    //   author: "Sophia Chen",
      readTime: "9 min read",
      date: "March 12, 2025",
      image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=600&fit=crop",
      content: `
        <p>Looking expensive doesn't require an expensive budget. With the right strategies and styling tricks, anyone can create a sophisticated, high-end appearance without breaking the bank. Here are the insider secrets that actually work.</p>

        <p>The foundation of expensive-looking style lies in fit and fabric quality. A well-fitted $30 shirt from a budget retailer will always look better than an ill-fitting designer piece. Invest in basic tailoring adjustments - hemming pants, taking in waists, and adjusting sleeve lengths can transform affordable pieces into custom-looking garments.</p>

        <p>Color coordination is your secret weapon. Stick to a cohesive color palette of 3-4 colors maximum in any outfit. Neutrals like black, white, navy, and beige are timeless and naturally sophisticated. When you do add color, choose one statement piece and keep everything else neutral.</p>

        <p>Accessories can make or break a look. Invest in a few high-quality accessories - a classic watch, a leather handbag, or quality shoes - that you can rotate with different outfits. These pieces will elevate every look and last for years.</p>

        <p>Finally, confidence is your best accessory. Wear your clothes with intention and purpose. Good posture, a genuine smile, and comfortable body language will make any outfit look expensive and effortless.</p>
      `
    }
  };

  const article = articles[id as keyof typeof articles];

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <Link to="/">
            <Button variant="outline">Return Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen"
    >
      {/* Header Navigation */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-neutral-200">
        <div className="container mx-auto max-w-4xl px-4 py-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2 text-neutral-600 hover:text-neutral-900">
              <ArrowLeft size={16} />
              Back to Articles
            </Button>
          </Link>
        </div>
      </div>

      <article className="container mx-auto max-w-4xl px-4 py-12">
        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <div className="mb-6">
            <span className="inline-block bg-rose-500/10 text-rose-600 px-4 py-2 rounded-full text-sm font-medium mb-4">
              {article.category}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-neutral-900">
            {article.title}
          </h1>

          <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
            {/* {article.excerpt} */}
          </p>

          <div className="flex items-center gap-6 text-sm text-neutral-500 mb-8">
            <div className="flex items-center gap-2">
              <User size={16} />
              {/* <span className="font-medium">{article.author}</span> */}
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} />
              <span>{article.readTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{article.date}</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-12"
        >
          <div className="aspect-video w-full overflow-hidden rounded-2xl shadow-2xl">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="prose prose-lg max-w-none"
        >
          <div 
            className="text-lg leading-relaxed text-neutral-700 space-y-6"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </motion.div>

        {/* Back to Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 pt-8 border-t border-neutral-200 text-center"
        >
          <Link to="/">
            <Button 
              variant="outline" 
              size="lg"
              className="border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white transition-all duration-300 px-8"
            >
              <ArrowLeft size={18} className="mr-2" />
              Back to All Articles
            </Button>
          </Link>
        </motion.div>
      </article>
    </motion.div>
  );
};

export default ArticlePage;