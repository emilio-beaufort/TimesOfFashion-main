import CategoryPageLayout from "@/components/CategoryPageLayout";
import { lifestyleArticles } from "@/data/articles";

const Lifestyle = () => {
  return (
    <CategoryPageLayout
      title="Life Elevated"
      description="Where everyday moments transform into extraordinary experiences through mindful style choices"
      articles={lifestyleArticles}
      categoryColor="green-500"
      heroImage="/assets/lifestyle.png"
    />
  );
};

export default Lifestyle;
