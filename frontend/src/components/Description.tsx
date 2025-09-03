import { motion } from "framer-motion";

const Description = () => {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          variants={fadeUp}
          className="text-center"
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-playfair font-bold mb-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            Welcome to{" "}
            <span className="bg-gradient-rose-gold bg-clip-text text-transparent">
              Times of Fashion
            </span>
          </motion.h2>
          
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            viewport={{ once: false, amount: 0.2 }}
          >
            <p className="text-lg sm:text-xl font-inter leading-relaxed text-gray-700 mb-6">
              The modern contemporary fashion journal where{" "}
              <span className="font-semibold bg-gradient-crimson-glow bg-clip-text text-transparent">craft meets culture</span>{" "}
              and dressing becomes self-expression. Discover editor-curated stories, 
              utility-rich guides, and shoppable ideas that turn inspiration into 
              everyday style with integrity and impact.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={{
              visible: {
                transition: { staggerChildren: 0.2 },
              },
            }}
          >
            <motion.div
              variants={fadeUp}
              transition={{ duration: 1.2 }}
              className="text-center p-6 rounded-lg bg-white/60 backdrop-blur-sm shadow-elegant"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-rose-gold to-pastel-blush rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-2 text-gray-800">
                Editor-Curated
              </h3>
              <p className="text-gray-600 font-inter">
                Handpicked stories that matter
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 1.2 }}
              className="text-center p-6 rounded-lg bg-white/60 backdrop-blur-sm shadow-elegant"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-pastel-lavender to-pastel-mint rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-2 text-gray-800">
                Utility-Rich Guides
              </h3>
              <p className="text-gray-600 font-inter">
                Practical advice for real life
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 1.2 }}
              className="text-center p-6 rounded-lg bg-white/60 backdrop-blur-sm shadow-elegant"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-pastel-blush to-rose-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🛍️</span>
              </div>
              <h3 className="text-xl font-playfair font-semibold mb-2 text-gray-800">
                Shoppable Ideas
              </h3>
              <p className="text-gray-600 font-inter">
                Turn inspiration into style
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Description;
