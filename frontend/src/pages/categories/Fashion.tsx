import CategoryPageLayout from "@/components/CategoryPageLayout";
import { fashionArticles } from "@/data/articles";

const Fashion = () => {
  return (
    <CategoryPageLayout
      title="Fashion Intelligence"
      description="Where tomorrow's trends are born today - decode, predict, and master style's most intriguing mysteries"
      articles={fashionArticles}
      categoryColor="rose-500"
      heroImage="/assets/fashion.png"
    />
  );
};

export default Fashion;
