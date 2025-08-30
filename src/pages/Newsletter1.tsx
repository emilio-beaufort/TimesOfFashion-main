import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import Header from "@/components/Header"; 
import Footer from "@/components/Footer"; 

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      toast({
        title: "Welcome to Times of Fashion!",
        description: "You've successfully subscribed to our newsletter.",
      });
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <>
      {/*Header */}
      <Header />

      {/*  Newsletter Section */}
      <section className="pt-28 py-16 px-4 sm:px-6 lg:px-8 bg-gradient-hero">
        <div className="container mx-auto max-w-4xl">
          <Card className="shadow-magazine border-0 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                {/* Content */}
                <motion.div
                  className="p-8 lg:p-12 flex flex-col justify-center"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  viewport={{ once: false, amount: 0.2 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="bg-gradient-crimson-glow bg-clip-text text-transparent" size={24} />
                    <span className="bg-gradient-crimson-glow bg-clip-text text-transparent font-inter font-semibold">
                      VIP Access
                    </span>
                  </div>

                                  <h2 className="text-3xl lg:text-4xl font-playfair font-bold mb-4">
                  Stay In <span className="bg-gradient-crimson-glow bg-clip-text text-transparent">Style</span>
                </h2>

                  <p className="text-muted-foreground font-inter mb-6 text-lg">
                    Step into the world of fashion without distractions. 
                    Stay in Style gives you insider access, curated only for those who never settle for ordinary. 
                  </p>

                  <ul className="text-muted-foreground font-inter mb-8 space-y-2">
                    <motion.li
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      viewport={{ once: false, amount: 0.2 }}
                    >
                      <div className="w-2 h-2 bg-gradient-crimson-glow rounded-full"></div>
                      Weekly fashion trend reports
                    </motion.li>
                    <motion.li
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.3 }}
                      viewport={{ once: false, amount: 0.2 }}
                    >
                      <div className="w-2 h-2 bg-gradient-crimson-glow rounded-full"></div>
                      Exclusive celebrity interviews
                    </motion.li>
                    <motion.li
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      viewport={{ once: false, amount: 0.2 }}
                    >
                      <div className="w-2 h-2 bg-gradient-crimson-glow rounded-full"></div>
                      Early access to sales & collaborations
                    </motion.li>
                  </ul>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <motion.div
                      className="flex flex-col sm:flex-row gap-3"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                      viewport={{ once: false, amount: 0.2 }}
                    >
                      <div className="flex-1 relative">
                        <Mail
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                          size={18}
                        />
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="pl-10 h-12 font-inter"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        className="bg-gradient-crimson-glow hover:bg-gradient-crimson-glow/90 text-primary font-inter font-semibold h-12 px-8 shadow-lg"
                        disabled={isSubscribed}
                      >
                        {isSubscribed ? "Subscribed!" : "Subscribe"}
                      </Button>
                    </motion.div>
                    <p className="text-xs text-muted-foreground font-inter">
                      By subscribing, you agree to our privacy policy.
                      Unsubscribe at any time.
                    </p>
                  </form>
                </motion.div>

                {/* Visual */}
                <motion.div
                  className="relative h-64 lg:h-auto bg-gradient-to-br from-pastel-blush to-pastel-lavender"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  viewport={{ once: false, amount: 0.2 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="text-center p-8"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <div className="w-24 h-24 bg-gradient-crimson-glow rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg">
                        <Mail className="text-primary" size={32} />
                      </div>
                      <div className="font-playfair font-bold text-2xl text-primary mb-2">
                        Join 10,000+
                      </div>
                      <div className="font-inter text-primary/80">
                        Fashion Enthusiasts
                      </div>
                    </motion.div>
                  </div>

                  {/* Decorative Elements */}
                  <motion.div
                    className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.3 }}
                    viewport={{ once: false, amount: 0.2 }}
                  />
                  <motion.div
                    className="absolute bottom-8 left-8 w-8 h-8 bg-gradient-crimson-glow/30 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: false, amount: 0.2 }}
                  />
                  <motion.div
                    className="absolute top-1/2 left-4 w-4 h-4 bg-white/40 rounded-full"
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.7 }}
                    viewport={{ once: false, amount: 0.2 }}
                  />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default Newsletter;
