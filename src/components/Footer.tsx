import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook, Youtube, Mail } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } }
};

const Footer = () => {
  return (
    <motion.footer
      className="bg-primary text-primary-foreground"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }} // replays when in view
      variants={fadeInUp}
    >
             <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          
          {/* Brand */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <div className="text-3xl font-playfair font-bold bg-gradient-deep-luxury-red bg-clip-text text-transparent">
              Times of Fashion
            </div>
            <p className="text-primary-foreground/80 font-inter">
            Times of Fashion stands as your ultimate destination for fashion intelligence, beauty innovation, and lifestyle elevation. We transform the complex world of style into accessible insights that empower you to express your authentic self while staying ahead of tomorrow's trends.
            </p>
            {/* <div className="text-2xl font-playfair font-bold bg-gradient-rose-gold bg-clip-text text-transparent">
              Our Promise:
            </div>
            <p className="text-primary-foreground/80 font-inter">
              Times of Fashion stands for personal style, cultural respect, and conscious choice. 
              Every feature is edited for clarity, context, and craft, helping build wardrobes that work and stories that last. 
              Fashion evolves; taste endures. 
            </p> */}
          </motion.div>

          {/* Categories */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-lg font-playfair font-semibold">Categories</h3>
            <ul className="space-y-2 font-inter">
                <li><Link to="/blog/fashion" className="text-primary-foreground/80 hover:bg-gradient-crimson-glow hover:bg-clip-text hover:text-transparent transition-colors">Fashion</Link></li>
                <li><Link to="/blog/beauty" className="text-primary-foreground/80 hover:bg-gradient-crimson-glow hover:bg-clip-text hover:text-transparent transition-colors">Beauty</Link></li>
                <li><Link to="/blog/lifestyle" className="text-primary-foreground/80 hover:bg-gradient-crimson-glow hover:bg-clip-text hover:text-transparent transition-colors">Lifestyle</Link></li>
                <li><Link to="/blog/celebrity" className="text-primary-foreground/80 hover:bg-gradient-crimson-glow hover:bg-clip-text hover:text-transparent transition-colors">Celebrity</Link></li>
                <li><Link to="/blog/culture" className="text-primary-foreground/80 hover:bg-gradient-crimson-glow hover:bg-clip-text hover:text-transparent transition-colors">Culture</Link></li>
                <li><Link to="/blog/wellness" className="text-primary-foreground/80 hover:bg-gradient-crimson-glow hover:bg-clip-text hover:text-transparent transition-colors">Wellness</Link></li>
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-lg font-playfair font-semibold">Company</h3>
            <ul className="space-y-2 font-inter">
                              <li><Link to="/about" className="text-primary-foreground/80 hover:bg-gradient-crimson-glow hover:bg-clip-text hover:text-transparent transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="text-primary-foreground/80 hover:bg-gradient-crimson-glow hover:bg-clip-text hover:text-transparent transition-colors">Contact</Link></li>
                <li><Link to="/collaboration" className="text-primary-foreground/80 hover:bg-gradient-crimson-glow hover:bg-clip-text hover:text-transparent transition-colors">Collaborations</Link></li>
                <li><Link to="/careers" className="text-primary-foreground/80 hover:bg-gradient-crimson-glow hover:bg-clip-text hover:text-transparent transition-colors">Careers</Link></li>
                <li><Link to="/press" className="text-primary-foreground/80 hover:bg-gradient-crimson-glow hover:bg-clip-text hover:text-transparent transition-colors">Press</Link></li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div variants={fadeInUp} className="space-y-4">
            <h3 className="text-lg font-playfair font-semibold">Stay Connected</h3>
            <p className="text-primary-foreground/90 font-playfair italic text-base">
              "Style is a shared language."
            </p>
            <p className="text-primary-foreground/80 font-inter text-sm">
              Follow for daily edits, behind-the-scenes dispatches, and community spotlights that inform, not overwhelm.
            </p>
            <div className="flex space-x-6">
                              <Instagram size={20} className="text-primary-foreground/60 hover:bg-gradient-crimson-glow hover:bg-clip-text hover:text-transparent transition-colors cursor-pointer" />
                <Twitter size={20} className="text-primary-foreground/60 hover:bg-gradient-crimson-glow hover:bg-clip-text hover:text-transparent transition-colors cursor-pointer" />
                <Facebook size={20} className="text-primary-foreground/60 hover:bg-gradient-crimson-glow hover:bg-clip-text hover:text-transparent transition-colors cursor-pointer" />
                <Youtube size={20} className="text-primary-foreground/60 hover:bg-gradient-crimson-glow hover:bg-clip-text hover:text-transparent transition-colors cursor-pointer" />
            </div>
            <p className="text-primary-foreground/80 font-inter text-sm">
              Subscribe to our newsletter for the latest fashion updates and exclusive content.
            </p>
            
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-primary-foreground/10 border border-primary-foreground/20 rounded-l-md text-primary-foreground placeholder-primary-foreground/60 focus:outline-none focus:border-gradient-crimson-glow font-inter text-sm"
              />
              <button className="px-4 py-2 bg-gradient-crimson-glow text-primary rounded-r-md hover:bg-gradient-crimson-glow/90 transition-colors">
                <Mail size={16} />
              </button>
            </div>
            
          </motion.div>
        </div>

                 <motion.div variants={fadeInUp} className="border-t border-primary-foreground/20 mt-16 pt-12">
           <div className="flex flex-col md:flex-row justify-between items-center">
             <p className="text-primary-foreground/60 font-inter text-sm">
               © 2024 Times of Fashion. All rights reserved.
             </p>
             <div className="flex space-x-8 mt-4 md:mt-0">
               <Link to="/privacy" className="text-primary-foreground/60 hover:bg-gradient-crimson-glow hover:bg-clip-text hover:text-transparent transition-colors font-inter text-sm">
                 Privacy Policy
               </Link>
               <Link to="/terms" className="text-primary-foreground/60 hover:bg-gradient-crimson-glow hover:bg-clip-text hover:text-transparent transition-colors font-inter text-sm">
                 Terms of Service
               </Link>
               <Link to="/cookies" className="text-primary-foreground/60 hover:bg-gradient-crimson-glow hover:bg-clip-text hover:text-transparent transition-colors font-inter text-sm">
                 Cookie Policy
               </Link>
             </div>
           </div>
         </motion.div>

                                                                       {/* Brand Name at Footer End */}
           <motion.div variants={fadeInUp} className="mt-8 pt-8 border-t border-primary-foreground/10">
             <div className="text-center">
               <div className="text-5xl font-playfair font-bold bg-gradient-deep-luxury-red bg-clip-text text-transparent">
                 Times of Fashion
               </div>
              </div>
            </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
