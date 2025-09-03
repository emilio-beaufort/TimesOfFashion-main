import CategoryPageLayout from "@/components/CategoryPageLayout";
import { cultureArticles } from "@/data/articles";

const Culture = () => {
  return (
    <CategoryPageLayout
      title="Cultural Currents"
      description="Where fashion intersects with society, technology, and human behavior to create tomorrow's cultural narratives"
      articles={cultureArticles}
      categoryColor="indigo-500"
      heroImage="/assets/culture.png"
    />
  );
};

export default Culture;
