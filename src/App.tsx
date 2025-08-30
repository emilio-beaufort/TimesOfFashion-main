import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import AllArticles from "./pages/AllArticles";
import NotFound from "./pages/NotFound";
import Newsletter from "./components/Newsletter";
import ArticlePage from './pages/ArticlePage';
import Newsletter1 from "./pages/Newsletter1";
import Fashion from "./pages/categories/Fashion";
import Beauty from "./pages/categories/Beauty";
import Lifestyle from "./pages/categories/Lifestyle";
import Celebrity from "./pages/categories/Celebrity";
import Culture from "./pages/categories/Culture";
import WellnessHonours from "./pages/categories/WellnessHonours";
import ArticleView from "./pages/ArticleView";
import ScrollToTop from "./components/ScrollToTop"; 

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:category" element={<Blog />} />
          <Route path="/all-articles" element={<AllArticles />} />
          <Route path="/newsletter" element={<Newsletter />} />
          <Route path="/newsletter1" element={<Newsletter1 />} /> 
          <Route path="/collaboration" element={<Contact />} />

          <Route path="/article/:id" element={<ArticlePage />} />
          <Route path="/fashion" element={<Fashion />} />
          <Route path="/beauty" element={<Beauty />} />
          <Route path="/lifestyle" element={<Lifestyle />} />
          <Route path="/celebrity" element={<Celebrity />} />
          <Route path="/culture" element={<Culture />} />
          <Route path="/wellness" element={<WellnessHonours />} />
          <Route path="/article/:articleId" element={<ArticleView />} />

          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
