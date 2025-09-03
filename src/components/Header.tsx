import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import "@fontsource/unifrakturmaguntia";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: "Fashion Intelligence", displayName: "Fashion", href: "/fashion" },
    { name: "Beauty Revolution", displayName: "Beauty", href: "/beauty" },
    { name: "Life Elevated", displayName: "Lifestyle", href: "/lifestyle" },
    { name: "Icon Intelligence", displayName: "Celebrity", href: "/celebrity" },
    { name: "Cultural Currents", displayName: "Culture", href: "/culture" },
    { name: "Wellness Harmony", displayName: "Wellness", href: "/wellness" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 navbar-transparent border-b border-white/20">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left - Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/logo.jpg" 
                alt="Times of Fashion" 
                className="h-12 w-auto object-contain drop-shadow-sm"
              />
              <h1
                className="text-2xl font-bold text-black tracking-tight"
                style={{ fontFamily: "UnifrakturMaguntia, cursive" }}
              >
                The Times of Fashion
              </h1>

            </Link>
          </div>

          {/* Center - Categories */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`text-sm font-inter font-medium transition-colors hover:bg-gradient-crimson-glow hover:bg-clip-text hover:text-transparent ${
                  isActive(item.href)
                    ? "bg-gradient-crimson-glow bg-clip-text text-transparent"
                    : "text-foreground"
                }`}
              >
                {item.displayName}
              </Link>
            ))}
          </div>

          {/* Right - Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/newsletter1">
              <Button
                variant="outline"
                size="sm"
                className="border-rose-gold bg-gradient-crimson-glow bg-clip-text text-transparent hover:bg-gradient-crimson-glow hover:text-primary font-inter"
              >
                Newsletter
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                variant="outline"
                size="sm"
                className="border-rose-gold bg-gradient-crimson-glow bg-clip-text text-transparent hover:bg-gradient-crimson-glow hover:text-primary font-inter"
              >
                Contact Us
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/20 backdrop-blur border-t border-white/20">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-inter font-medium transition-colors text-center ${
                    isActive(item.href)
                      ? "bg-gradient-crimson-glow bg-clip-text text-transparent"
                      : "text-foreground hover:bg-gradient-crimson-glow hover:bg-clip-text hover:text-transparent"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.displayName}
                </Link>
              ))}

              {/* Newsletter + Contact for mobile */}
              <div className="px-3 py-2 flex space-x-2">
                <Link to="/newsletter1" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-rose-gold bg-gradient-crimson-glow bg-clip-text text-transparent hover:bg-gradient-crimson-glow hover:text-primary font-inter"
                  >
                    Subscribe
                  </Button>
                </Link>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-rose-gold bg-gradient-crimson-glow bg-clip-text text-transparent hover:bg-gradient-crimson-glow hover:text-primary font-inter"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
