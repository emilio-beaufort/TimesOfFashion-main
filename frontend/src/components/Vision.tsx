import { motion } from "framer-motion";

const Vision = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          variants={fadeUp}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-playfair font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            Our <span className="bg-gradient-deep-luxury-red bg-clip-text text-transparent">Vision</span>
          </motion.h2>
          
          <motion.div
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <p className="text-lg sm:text-xl font-inter leading-relaxed text-gray-700 mb-8 text-justify px-4 sm:px-8">
              Times of Fashion is the contemporary voice of style, celebrating{" "}
              <span className="font-semibold bg-gradient-crimson-glow bg-clip-text text-transparent">diversity, craftsmanship, and conscious luxury</span>{" "}
              from India to the world. From the streets to the runway, from heirloom weaves to future fabrics, 
              we champion fashion as self-expression with substance.
            </p>
            <p className="text-lg sm:text-xl font-inter leading-relaxed text-gray-700 mb-8 text-justify px-4 sm:px-8">
              We decode fashion trends into real, wearable style. From legendary houses to rising talent, 
              we spotlight creativity with honesty and fairness. Our guides, tools, and curated edits make 
              wardrobes practical yet inspiring. And with our community, fashion becomes a shared conversation, 
              driven by{" "}
              <span className="font-semibold bg-gradient-crimson-glow bg-clip-text text-transparent">sustainability, transparency, and you.</span>
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.3 },
            },
          }}
        >
          <motion.div
            variants={fadeUp}
            transition={{ duration: 1.2 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg p-6 shadow-elegant">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-rose-gold to-pastel-blush rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🎯</span>
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-semibold mb-2 text-gray-800">
                    Decode Fashion Trends
                  </h3>
                  <p className="text-gray-600 font-inter">
                    We decode fashion trends into real, wearable style that fits your life and values.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-elegant">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pastel-lavender to-pastel-mint rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">🌟</span>
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-semibold mb-2 text-gray-800">
                    Spotlight Creativity
                  </h3>
                  <p className="text-gray-600 font-inter">
                    From legendary houses to rising talent, we spotlight creativity with honesty and fairness.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-elegant">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pastel-blush to-rose-gold rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">💡</span>
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-semibold mb-2 text-gray-800">
                    Practical Inspiration
                  </h3>
                  <p className="text-gray-600 font-inter">
                    Our guides, tools, and curated edits make wardrobes practical yet inspiring.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 1.2 }}
            className="relative"
          >
            <div className="bg-gradient-to-br from-rose-gold/10 to-pastel-blush/10 rounded-2xl p-8 backdrop-blur-sm">
              <motion.div
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                viewport={{ once: false, amount: 0.2 }}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-rose-gold to-pastel-blush rounded-full mx-auto mb-6 flex items-center justify-center">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="text-2xl font-playfair font-bold mb-4 text-gray-800">
                  Community Driven
                </h3>
                <p className="text-lg font-inter text-gray-700 leading-relaxed">
                  With our community, fashion becomes a shared conversation, driven by{" "}
                  <span className="font-semibold bg-gradient-crimson-glow bg-clip-text text-transparent">
                    sustainability, transparency, and you.
                  </span>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Vision;
