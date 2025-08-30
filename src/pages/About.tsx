import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Star, Award } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0, transition: { duration: 1.6, ease: "easeOut" } }
};

const About = () => {
  const team = [
    {
      name: "Isabella Rodriguez",
      role: "Editor-in-Chief",
      bio: "Fashion industry veteran with 15+ years experience at top magazines.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop"
    },
    {
      name: "James Chen",
      role: "Creative Director",
      bio: "Award-winning photographer and visual storyteller.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop"
    },
    {
      name: "Sophia Martinez",
      role: "Beauty Editor",
      bio: "Beauty expert and skincare enthusiast with a passion for clean beauty.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* Hero Section */}
        <motion.section
          {...fadeInUp}
          className="min-h-screen w-full bg-cover bg-center bg-no-repeat relative"
          style={{ backgroundImage: "url('/assets/about.png')" }}
        >
          {/* Stronger Overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/60"></div>
          <div className="container mx-auto max-w-4xl text-center relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
            <motion.h1
              initial={{ opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.3, delay: 0.05, ease: "easeOut" }}
              className="text-5xl sm:text-6xl font-playfair font-bold mb-6 text-white drop-shadow-lg"
              style={{
                textShadow: "0 4px 32px rgba(0,0,0,0.7), 0 2px 4px rgba(0,0,0,0.35)"
              }}
            >
              About <span className="bg-gradient-deep-luxury-red bg-clip-text text-transparent">Times of Fashion</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.7, delay: 0.15, ease: "easeOut" }}
              className="text-xl text-white/90 drop-shadow-lg font-inter max-w-3xl mx-auto"
              style={{
                textShadow: "0 1px 8px rgba(0,0,0,0.68)"
              }}
            >
              Times of Fashion stands as your premier destination for fashion intelligence, beauty innovation, and lifestyle elevation. 
              We transform the complex world of style into accessible insights that empower authentic self-expression while keeping you ahead of tomorrow's trends. 
              Born from the intersection of insider expertise and genuine storytelling, we bridge fashion's exclusive world with everyday style reality. 
              Our mission is to make every reader's relationship with style more intentional, joyful, and authentically personal.
            </motion.p>
          </div>
        </motion.section>

        {/* Mission Section */}
        <motion.section
          {...fadeInUp}
          transition={{ duration: 1.8, delay: 0.18, ease: "easeOut" }}
          className="py-16 px-4 sm:px-6 lg:px-8"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div {...fadeInUp} transition={{ duration: 1.5, delay: 0.2 }}>
                <h2 className="text-4xl font-playfair font-bold mb-6">
                  Our <span className="bg-gradient-deep-luxury-red bg-clip-text text-transparent">Mission</span>
                </h2>
                <p className="text-lg text-muted-foreground font-inter mb-6">
                  To democratize fashion intelligence by making insider knowledge accessible, 
                  actionable, and inspiring for style enthusiasts at every level of their journey.
                </p>
                <h2 className="text-4xl font-playfair font-bold mb-6">
                  Our <span className="bg-gradient-deep-luxury-red bg-clip-text text-transparent">Vision</span>
                </h2>
                <p className="text-lg text-muted-foreground font-inter">
                  To become the world's most trusted source for fashion intelligence that empowers individuals to 
                  express their authentic selves while staying ahead of cultural shifts and style evolution.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 1.07 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.3, delay: 0.23, ease: "easeOut" }}
                viewport={{ once: true }}
                className="relative"
              >
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&h=400&fit=crop"
                  alt="Fashion editorial"
                  className="w-full h-96 object-cover rounded-lg shadow-magazine"
                />
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Values Section */}
        <motion.section
          {...fadeInUp}
          transition={{ duration: 2, delay: 0.2, ease: "easeOut" }}
          className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-elegant"
        >
          <div className="container mx-auto max-w-6xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-playfair font-bold mb-4">
                Our <span className="bg-gradient-deep-luxury-red bg-clip-text text-transparent">Values</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <Heart className="bg-gradient-crimson-glow bg-clip-text text-transparent" size={32} />,
                  title: "Authenticity",
                  description: "Real insights, no filler, zero compromises"
                },
                {
                  icon: <Star className="bg-gradient-crimson-glow bg-clip-text text-transparent" size={32} />,
                  title: "Quality",
                  description: "We transform information into wisdom"
                },
                {
                  icon: <Users className="bg-gradient-crimson-glow bg-clip-text text-transparent" size={32} />,
                  title: "Access",
                  description: "Insider information made irresistibly accessible"
                },
                {
                  icon: <Award className="bg-gradient-crimson-glow bg-clip-text text-transparent" size={32} />,
                  title: "Impact",
                  description: "Every story changes how you see style forever"
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.2 + index * 0.13 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center p-6 shadow-elegant border-0">
                    <CardContent className="p-0">
                      <div className="mb-4 flex justify-center">{value.icon}</div>
                      <h3 className="text-xl font-playfair font-semibold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground font-inter">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        
      </main>
      <Footer />
    </div>
  );
};

export default About;
