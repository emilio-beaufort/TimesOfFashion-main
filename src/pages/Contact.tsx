"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Instagram, Twitter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        {/* ✅ Hero Section */}
        <section className="relative w-full min-h-screen overflow-hidden">
          {/* Background Image */}
          <motion.img
            src="/assets/contact.png"
            alt="Contact"
            className="absolute inset-0 w-full h-full object-cover"
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Content */}
          <div className="container mx-auto max-w-4xl text-center relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
            <motion.h1
              className="text-5xl sm:text-6xl font-playfair font-bold mb-6 text-white drop-shadow-lg"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              Let&apos;s <span className="bg-gradient-crimson-glow bg-clip-text text-transparent">Connect</span>
            </motion.h1>
            <motion.p
              className="text-xl text-white/90 drop-shadow-md font-inter max-w-3xl mx-auto"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7, ease: "easeOut" }}
            >
              Whether you have a story idea, collaboration proposal, 
              or just want to say hello, we&apos;d love to hear from you.
            </motion.p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="shadow-magazine border-0">
                  <CardHeader>
                    <CardTitle className="text-3xl font-playfair font-bold">
                      Send Us a Message
                    </CardTitle>
                    <p className="text-muted-foreground font-inter">
                      Fill out the form below and we'll get back to you within 24 hours.
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="text-sm font-inter font-semibold mb-2 block">
                            Full Name *
                          </label>
                          <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your full name"
                            required
                            className="font-inter"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-inter font-semibold mb-2 block">
                            Email Address *
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="your.email@example.com"
                            required
                            className="font-inter"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-inter font-semibold mb-2 block">
                          Subject *
                        </label>
                        <Input
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What's this about?"
                          required
                          className="font-inter"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-inter font-semibold mb-2 block">
                          Message *
                        </label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us more about your inquiry..."
                          required
                          className="min-h-32 font-inter"
                        />
                      </div>

                      <Button 
                        type="submit" 
                        size="lg"
                        className="bg-gradient-crimson-glow hover:bg-gradient-crimson-glow/90 text-primary font-inter font-semibold shadow-lg"
                      >
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Info */}
              <div className="space-y-6">
                <Card className="shadow-elegant border-0">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-playfair font-bold mb-4">Contact Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <Mail className="text-rose-gold mt-1" size={20} />
                        <div>
                          <p className="font-inter font-semibold">Email</p>
                          <p className="text-muted-foreground font-inter text-sm">hello@timesoffashion.com</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="text-rose-gold mt-1" size={20} />
                        <div>
                          <p className="font-inter font-semibold">Phone</p>
                          <p className="text-muted-foreground font-inter text-sm">+1 (555) 123-4567</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="text-rose-gold mt-1" size={20} />
                        <div>
                          <p className="font-inter font-semibold">Address</p>
                          <p className="text-muted-foreground font-inter text-sm">
                            123 Fashion Avenue<br />
                            New York, NY 10001
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-elegant border-0">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-playfair font-bold mb-4">Follow Us</h3>
                    <div className="flex space-x-4">
                      <Instagram className="text-rose-gold hover:text-rose-gold-dark transition-colors cursor-pointer" size={24} />
                      <Twitter className="text-rose-gold hover:text-rose-gold-dark transition-colors cursor-pointer" size={24} />
                      <Mail className="text-rose-gold hover:text-rose-gold-dark transition-colors cursor-pointer" size={24} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
