import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LatestArticles from "@/components/LatestArticles";
//import Description from "@/components/Description";
//import Vision from "@/components/Vision";
import CategoryHighlights from "@/components/CategoryHighlights";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <LatestArticles />
        <CategoryHighlights />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};


export default Index;
