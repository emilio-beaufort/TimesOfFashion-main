import CategoryPageLayout from "@/components/CategoryPageLayout";
import { beautyArticles } from "@/data/articles";

const Beauty = () => {
  return (
    <CategoryPageLayout
      title="Beauty Revolution"
      description="Where science meets artistry and skincare becomes the ultimate form of self-expression"
      articles={beautyArticles}
      categoryColor="purple-500"
      heroImage="/assets/beauty.png"
    />
  );
};

export default Beauty;
