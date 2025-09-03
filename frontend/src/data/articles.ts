// User-friendly article data structure
// Users can easily modify articles by editing this file

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  featured?: boolean;
}

export const fashionArticles: Article[] = [
  {
    id: "fashion-1",
    title: "The Algorithm Aesthetic: How AI Predicts Your Next Fashion Obsession",
    excerpt: "Artificial intelligence has quietly revolutionized fashion forecasting, creating a new aesthetic language that bridges data science and creative intuition.",
    content: "Artificial intelligence has quietly revolutionized fashion forecasting, creating a new aesthetic language that bridges data science and creative intuition. Major fashion houses now employ AI systems that analyze everything from street style photography to social media sentiment, color psychology research to weather pattern predictions.\n\nThese algorithms don't just predict trends - they're creating them. By identifying micro-patterns in consumer behavior before they become visible to human observers, AI systems are influencing design decisions months before collections reach runways.\n\nThe result is what industry insiders call 'predictive fashion' - clothing designed not just for current tastes, but for desires consumers don't yet know they have. This technological evolution is reshaping how we think about creativity, originality, and the very nature of fashion inspiration.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
    author: "Dr. Priya Sharma",
    date: "2024-08-25",
    readTime: "6 min read",
    tags: ["ai-fashion", "predictive-trends", "technology"],
    featured: true
  },
  {
    id: "fashion-2",
    title: "Micro-Trend Mania: The 7-Day Fashion Cycles Breaking the Internet",
    excerpt: "Fashion's trend cycles have accelerated to an almost incomprehensible pace. What once took seasons to develop now emerges, peaks, and disappears within a single week.",
    content: "Fashion's trend cycles have accelerated to an almost incomprehensible pace. What once took seasons to develop now emerges, peaks, and disappears within a single week. This phenomenon, driven by social media algorithms and global connectivity, is creating unprecedented challenges for both brands and consumers.\n\nThe speed of these micro-trends means that by the time a fashion item gains viral attention, it's already approaching obsolescence. Consumers find themselves in a constant state of FOMO, while brands struggle to keep pace with demand that can spike and crash within days.\n\nThis acceleration is forcing a fundamental reconsideration of fashion consumption, with many young consumers now choosing to engage with trends virtually - through social media interaction and mood boarding - rather than through actual purchases.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    author: "Arjun Mehta",
    date: "2024-08-22",
    readTime: "5 min read",
    tags: ["micro-trends", "social-media", "fast-fashion"]
  },
  {
    id: "fashion-3",
    title: "The Rental Revolution: Why Ownership Is Fashion's Biggest Faux Pas",
    excerpt: "The concept of fashion ownership is undergoing radical transformation as rental services, clothing swaps, and sharing economies reshape how we think about personal style.",
    content: "The concept of fashion ownership is undergoing radical transformation as rental services, clothing swaps, and sharing economies reshape how we think about personal style. For many young consumers, particularly in urban areas, accessing fashion is more important than owning it.\n\nThis shift represents more than economic pragmatism - it's a philosophical change toward experience-based consumption. Fashion is increasingly viewed as a service rather than a product, with consumers valuing variety, novelty, and sustainability over possession.\n\nThe rental revolution is also democratizing access to luxury fashion, allowing individuals to experiment with high-end pieces previously beyond their reach, and encouraging more adventurous, temporary style choices.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop",
    author: "Kavya Patel",
    date: "2024-08-20",
    readTime: "7 min read",
    tags: ["rental-fashion", "sharing-economy", "sustainable"]
  }
];

export const beautyArticles: Article[] = [
  {
    id: "beauty-1",
    title: "The Great Foundation Exodus: Why Gen Z Abandoned Face Makeup Forever",
    excerpt: "The beauty industry is witnessing an unprecedented shift as younger consumers abandon traditional makeup routines in favor of skincare-focused regimens.",
    content: "The beauty industry is witnessing an unprecedented shift as younger consumers abandon traditional makeup routines in favor of skincare-focused regimens. This movement, often called 'skin minimalism,' represents a rejection of heavily made-up aesthetics in favor of enhanced natural beauty.\n\nThe trend is driven by multiple factors: increased awareness of skin health, desire for authenticity in social media representation, time constraints of modern lifestyles, and growing environmental consciousness about cosmetic waste.\n\nBeauty brands are responding by reformulating products to be more skin-beneficial, creating hybrid products that blur the line between skincare and makeup, and investing heavily in skin-perfecting technologies rather than coverage-focused formulations.",
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=600&fit=crop",
    author: "Ananya Singh",
    date: "2024-08-26",
    readTime: "6 min read",
    tags: ["gen-z", "skin-minimalism", "natural-beauty"],
    featured: true
  },
  {
    id: "beauty-2",
    title: "Biohacking Beauty: The Tech-Enhanced Skincare Routines of Mumbai's Elite",
    excerpt: "High-tech skincare has moved beyond spa treatments into daily routines, particularly among affluent urban consumers.",
    content: "High-tech skincare has moved beyond spa treatments into daily routines, particularly among affluent urban consumers. LED light therapy masks, microcurrent devices, and at-home radio-frequency treatments are becoming as common as serums and moisturizers.\n\nThis technological approach to beauty represents a convergence of Eastern wellness traditions with Western scientific innovation. Consumers are increasingly viewing skincare as a form of biohacking - using technology and data to optimize their skin's performance and appearance.\n\nThe trend is creating new categories of beauty professionals, from tech-skincare consultants to device training specialists, as the industry adapts to increasingly sophisticated consumer demands.",
    image: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop",
    author: "Dr. Rajesh Kumar",
    date: "2024-08-24",
    readTime: "7 min read",
    tags: ["biohacking", "tech-skincare", "mumbai-elite"]
  },
  {
    id: "beauty-3",
    title: "The 60-Second Rule: Beauty Routines That Actually Work in Real Life",
    excerpt: "As life becomes increasingly fast-paced, beauty routines are being streamlined to accommodate time-poor consumers.",
    content: "As life becomes increasingly fast-paced, beauty routines are being streamlined to accommodate time-poor consumers. The '60-second rule' - creating maximum impact beauty routines that take one minute or less - has become a guiding principle for product development and consumer behavior.\n\nThis efficiency-focused approach has sparked innovation in multi-purpose products, application techniques, and routine optimization. Brands are creating products that deliver professional-level results in minimal time, while beauty influencers are teaching techniques that maximize impact per minute invested.\n\nThe movement represents a broader shift toward intentional beauty practices, where every step must justify its place in a routine through measurable results and time efficiency.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop",
    author: "Meera Joshi",
    date: "2024-08-21",
    readTime: "5 min read",
    tags: ["60-second-rule", "efficient-beauty", "time-saving"]
  }
];

export const lifestyleArticles: Article[] = [
  {
    id: "lifestyle-1",
    title: "The Work-From-Anywhere Wardrobe: 12 Pieces That Travel the World",
    excerpt: "Digital nomadism has created new demands for versatile, travel-friendly fashion that can transition seamlessly between video calls, co-working spaces, and weekend adventures.",
    content: "Digital nomadism has created new demands for versatile, travel-friendly fashion that can transition seamlessly between video calls, co-working spaces, and weekend adventures. The modern professional wardrobe is being redesigned around mobility, versatility, and comfort without sacrificing style.\n\nThis evolution has sparked innovation in fabric technology, garment construction, and styling techniques. Pieces must now serve multiple functions while taking up minimal luggage space and requiring little maintenance.\n\nThe work-from-anywhere wardrobe represents a broader shift toward intentional consumption, where each item must earn its place through proven versatility and consistent value across various contexts.",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop",
    author: "Rohit Sharma",
    date: "2024-08-27",
    readTime: "8 min read",
    tags: ["digital-nomad", "travel-wardrobe", "versatile-fashion"],
    featured: true
  },
  {
    id: "lifestyle-2",
    title: "Luxury Budget Living: The ₹50,000 Wardrobe That Looks Like ₹5 Lakhs",
    excerpt: "Strategic shopping has evolved into a sophisticated skill set that enables style-conscious consumers to create high-impact wardrobes on modest budgets.",
    content: "Strategic shopping has evolved into a sophisticated skill set that enables style-conscious consumers to create high-impact wardrobes on modest budgets. This approach combines investment pieces with smart budget finds, emphasizing cost-per-wear calculations over initial price points.\n\nThe key lies in understanding where to invest (classic pieces, quality basics) and where to save (trendy items, accessories), combined with excellent care and styling skills that maximize the perceived value of every piece.\n\nThis approach has democratized access to sophisticated style while promoting more sustainable consumption patterns that prioritize longevity over novelty.",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=600&fit=crop",
    author: "Priya Gupta",
    date: "2024-08-23",
    readTime: "7 min read",
    tags: ["budget-fashion", "luxury-living", "smart-shopping"]
  },
  {
    id: "lifestyle-3",
    title: "The Sustainability Paradox: Why Buying More Clothes Became Eco-Friendly",
    excerpt: "Counter-intuitively, some fashion consumption models are proving more sustainable through increased purchasing of specific types of items.",
    content: "Counter-intuitively, some fashion consumption models are proving more sustainable through increased purchasing of specific types of items. The key lies in buying more versatile, durable pieces that reduce overall environmental impact through extended use and reduced waste.\n\nThis paradox highlights the importance of considering fashion's environmental impact holistically, accounting for production methods, material sourcing, transportation, use phase, and end-of-life disposal.\n\nThe approach requires sophisticated understanding of fashion's environmental footprint and represents a maturation in sustainable fashion thinking beyond simple 'buy less' messaging.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
    author: "Vikram Malhotra",
    date: "2024-08-19",
    readTime: "6 min read",
    tags: ["sustainability-paradox", "eco-friendly", "conscious-consumption"]
  }
];

export const celebrityArticles: Article[] = [
  {
    id: "celebrity-1",
    title: "The Celebrity Stylist Rebellion: Why A-Listers Are Firing Their Fashion Teams",
    excerpt: "A growing number of celebrities are taking control of their fashion narratives, moving away from professional styling teams toward personal curation.",
    content: "A growing number of celebrities are taking control of their fashion narratives, moving away from professional styling teams toward personal curation. This trend represents a desire for authentic self-expression and pushback against homogenized red carpet aesthetics.\n\nThe shift is creating more diverse, personal, and sometimes controversial celebrity fashion moments, as stars prioritize individual expression over industry-approved looks.\n\nThis movement is influencing fashion at all levels, encouraging consumers to develop their own style intuition rather than relying on external validation or professional guidance.",
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop",
    author: "Neha Kapoor",
    date: "2024-08-28",
    readTime: "6 min read",
    tags: ["celebrity-styling", "fashion-rebellion", "authentic-expression"],
    featured: true
  },
  {
    id: "celebrity-2",
    title: "Method Dressing's Evolution: From Costume to Character",
    excerpt: "Celebrity fashion has evolved beyond simple red carpet appearance management toward strategic personal branding through clothing choices.",
    content: "Celebrity fashion has evolved beyond simple red carpet appearance management toward strategic personal branding through clothing choices. Every outfit now serves multiple purposes: promoting current projects, establishing personal brand identity, and communicating values or messages.\n\nThis sophisticated approach to celebrity dressing is influencing how non-celebrities think about their own fashion choices, encouraging more intentional wardrobe curation that reflects personal values and goals.",
    image: "https://images.unsplash.com/photo-1506629905607-d405d7d3b8b4?w=800&h=600&fit=crop",
    author: "Arjun Malhotra",
    date: "2024-08-25",
    readTime: "5 min read",
    tags: ["method-dressing", "personal-branding", "strategic-fashion"]
  },
  {
    id: "celebrity-3",
    title: "The Influence Economy Reality Check: When Celebrity Style Stops Selling",
    excerpt: "Data reveals a significant disconnect between celebrity fashion moments that generate media attention and those that actually drive consumer purchasing behavior.",
    content: "Data reveals a significant disconnect between celebrity fashion moments that generate media attention and those that actually drive consumer purchasing behavior. This gap is forcing brands to reconsider celebrity partnership strategies and consumers to question their own fashion inspiration sources.\n\nThe trend suggests a maturation in fashion consumption, where consumers are becoming more discriminating about which celebrity influences they allow into their purchasing decisions.",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=800&h=600&fit=crop",
    author: "Sanya Verma",
    date: "2024-08-22",
    readTime: "7 min read",
    tags: ["influence-economy", "celebrity-marketing", "consumer-behavior"]
  }
];

export const cultureArticles: Article[] = [
  {
    id: "culture-1",
    title: "Digital Nomad Minimalism: The 15-Piece Wardrobe Taking Over Mumbai",
    excerpt: "The rise of location-independent work has created a new aesthetic philosophy that prizes versatility, quality, and mobility over variety and trendiness.",
    content: "The rise of location-independent work has created a new aesthetic philosophy that prizes versatility, quality, and mobility over variety and trendiness. This approach to fashion reflects broader changes in how people think about possession, identity, and lifestyle design.\n\nThe 15-piece wardrobe concept represents a radical departure from traditional fashion consumption, focusing on pieces that can be mixed, matched, and styled in multiple ways across different contexts and climates.\n\nThis movement is particularly strong in Mumbai's tech and creative communities, where professionals are embracing minimalist wardrobes that support their mobile lifestyles while maintaining professional and personal style standards.",
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800&h=600&fit=crop",
    author: "Ravi Krishnan",
    date: "2024-08-29",
    readTime: "7 min read",
    tags: ["digital-nomad", "minimalism", "mumbai-fashion"],
    featured: true
  },
  {
    id: "culture-2",
    title: "The TikTok Trend Acceleration Crisis: Fashion at the Speed of Algorithms",
    excerpt: "Social media algorithms are creating fashion trend cycles so rapid that they're becoming unsustainable for both consumers and brands.",
    content: "Social media algorithms are creating fashion trend cycles so rapid that they're becoming unsustainable for both consumers and brands. This acceleration is forcing a fundamental reconsideration of how fashion trends develop, spread, and die.\n\nThe phenomenon is creating what researchers call 'trend fatigue' - a condition where consumers become overwhelmed by the constant pressure to stay current with rapidly changing fashion moments.\n\nThis crisis is pushing both brands and consumers toward more sustainable approaches to trend engagement, including 'slow fashion' movements and algorithm-resistant personal style development.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    author: "Isha Agarwal",
    date: "2024-08-26",
    readTime: "6 min read",
    tags: ["tiktok-trends", "algorithm-fashion", "trend-acceleration"]
  },
  {
    id: "culture-3",
    title: "Climate Anxiety Dressing: How Environmental Concerns Reshape Style Choices",
    excerpt: "Growing environmental awareness is influencing fashion choices in complex ways, from color preferences reflecting climate moods to practical adaptations.",
    content: "Growing environmental awareness is influencing fashion choices in complex ways, from color preferences reflecting climate moods to practical adaptations for changing weather patterns and sustainability concerns driving purchasing decisions.\n\nClimate anxiety is manifesting in fashion through increased preference for earth tones, weather-adaptive clothing, and investment in durable pieces that can withstand environmental uncertainty.\n\nThis psychological response to environmental concerns is creating new fashion categories and influencing design decisions across the industry, from material selection to seasonal planning.",
    image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
    author: "Deepika Nair",
    date: "2024-08-23",
    readTime: "8 min read",
    tags: ["climate-anxiety", "environmental-fashion", "sustainable-style"]
  }
];

export const wellnessArticles: Article[] = [
  {
    id: "wellness-1",
    title: "Dopamine Dressing Science: How Color Psychology Became Mental Health Treatment",
    excerpt: "Research confirms that clothing color choices can measurably impact mood, confidence, and psychological well-being.",
    content: "Research confirms that clothing color choices can measurably impact mood, confidence, and psychological well-being. This scientific understanding is transforming how people approach daily dressing decisions, with many now consciously using fashion as a tool for emotional regulation.\n\nStudies show that specific colors can trigger neurochemical responses, influencing everything from stress levels to social confidence. This has led to the development of 'therapeutic dressing' practices used by mental health professionals.\n\nThe approach is particularly popular among young professionals who use strategic color choices to manage work stress, social anxiety, and mood fluctuations throughout their daily routines.",
    image: "https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=800&h=600&fit=crop",
    author: "Dr. Kavitha Reddy",
    date: "2024-08-30",
    readTime: "7 min read",
    tags: ["dopamine-dressing", "color-psychology", "mental-health"],
    featured: true
  },
  {
    id: "wellness-2",
    title: "Mindful Beauty Rituals: The 5-Minute Practices Reducing Urban Anxiety",
    excerpt: "Beauty routines are being reimagined as mindfulness practices, with focus shifting from appearance outcomes to present-moment awareness and self-care.",
    content: "Beauty routines are being reimagined as mindfulness practices, with focus shifting from appearance outcomes to present-moment awareness and self-care. These practices offer accessible stress reduction tools for busy urban lifestyles.\n\nThe approach combines traditional beauty steps with meditation techniques, breathing exercises, and intentional self-care moments that can be completed in just five minutes.\n\nUrban professionals are finding these micro-wellness practices particularly effective for managing daily stress and creating moments of calm within hectic schedules.",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68e71?w=800&h=600&fit=crop",
    author: "Anjali Sharma",
    date: "2024-08-27",
    readTime: "6 min read",
    tags: ["mindful-beauty", "urban-anxiety", "wellness-rituals"]
  },
  {
    id: "wellness-3",
    title: "Sustainable Self-Care: Zero-Waste Beauty as Spiritual Practice",
    excerpt: "Environmental consciousness in beauty routines is evolving beyond practical concerns toward spiritual and ethical dimensions.",
    content: "Environmental consciousness in beauty routines is evolving beyond practical concerns toward spiritual and ethical dimensions, with many consumers finding deeper meaning and satisfaction in sustainable beauty practices.\n\nThis approach treats beauty routines as acts of environmental stewardship, connecting personal care with planetary care in ways that enhance both physical and spiritual well-being.\n\nPractitioners report that zero-waste beauty routines create a sense of purpose and connection that traditional beauty practices often lack, leading to greater overall life satisfaction.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop",
    author: "Maya Patel",
    date: "2024-08-24",
    readTime: "8 min read",
    tags: ["sustainable-self-care", "zero-waste-beauty", "spiritual-practice"]
  }
];

// Helper function to get articles by category
export const getArticlesByCategory = (category: string): Article[] => {
  switch (category.toLowerCase()) {
    case 'fashion':
      return fashionArticles;
    case 'beauty':
      return beautyArticles;
    case 'lifestyle':
      return lifestyleArticles;
    case 'celebrity':
      return celebrityArticles;
    case 'culture':
      return cultureArticles;
    case 'wellness':
      return wellnessArticles;
    default:
      return [];
  }
};

// Helper function to get all articles
export const getAllArticles = (): Article[] => {
  return [
    ...fashionArticles,
    ...beautyArticles,
    ...lifestyleArticles,
    ...celebrityArticles,
    ...cultureArticles,
    ...wellnessArticles
  ];
};
