import CategoryPageLayout from "@/components/CategoryPageLayout";
import { wellnessArticles } from "@/data/articles";

const WellnessHonours = () => {
  return (
    <CategoryPageLayout
      title="Wellness & Style Harmony"
      description="Where inner transformation meets outer expression through mindful beauty and healing-focused style practices"
      articles={wellnessArticles}
      categoryColor="teal-500"
      heroImage="/assets/wellness.png"
    />
  );
};

export default WellnessHonours;
