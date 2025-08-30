import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const images = [
  "/assets/hero1.jpg",
  "/assets/hero5.jpg",
  "/assets/hero3.jpg",
  "/assets/hero4.jpg",
  "/assets/hero2.jpg",
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // Random image carousel every 5s, not repeating last image
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => {
        let next;
        do {
          next = Math.floor(Math.random() * images.length);
        } while (next === prev && images.length > 1);
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Carousel */}
        <div className="absolute inset-0 z-0">
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Slide ${index}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === current ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto"
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-playfair font-black mb-6 leading-none tracking-tight drop-shadow-2xl"
          >
            When Style
            <span className="block bg-gradient-red-gold-accent bg-clip-text text-transparent">
              Becomes Story
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl sm:text-2xl font-inter font-medium mb-8 text-gray-100 max-w-2xl mx-auto drop-shadow-lg tracking-wide"
          >
            Dive into the pulse of fashion's most coveted secrets - where runway dreams become street reality 
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* Explore Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                size="lg"
                onClick={() =>
                  document
                    .getElementById("latest-articles")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-gradient-crimson-glow hover:bg-gradient-crimson-glow/90 text-primary font-inter font-semibold px-8 py-3 text-lg shadow-lg"
              >
                Explore Latest Trends
              </Button>
            </motion.div>

            {/* About Button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Link to="/about">
                <Button
                  size="lg"
                  className="border-2 border-white text-white hover:bg-white hover:text-primary font-inter font-semibold px-8 py-3 text-lg transition-colors"
                >
                  About Us
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-3 bg-white rounded-full mt-2"
            />
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Hero;
