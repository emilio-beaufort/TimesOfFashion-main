import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-playfair font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-4 font-inter">Oops! Page not found</p>
        <a href="/" className="bg-gradient-crimson-glow bg-clip-text text-transparent hover:opacity-80 underline font-inter font-semibold">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
