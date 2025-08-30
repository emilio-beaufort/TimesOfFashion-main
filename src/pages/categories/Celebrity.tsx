import CategoryPageLayout from "@/components/CategoryPageLayout";
import { celebrityArticles } from "@/data/articles";

const Celebrity = () => {
  return (
    <CategoryPageLayout
      title="Icon Intelligence"
      description="Decode the psychology and strategy behind every celebrity style moment that captures global attention"
      articles={celebrityArticles}
      categoryColor="amber-500"
      heroImage="/assets/celebrity.png"
    />
  );
};

export default Celebrity;
