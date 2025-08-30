import { useParams, Navigate } from "react-router-dom";
import ArticlePage from "@/components/ArticlePage";
import { getAllArticles } from "@/data/articles";

const ArticleView = () => {
  const { articleId } = useParams<{ articleId: string }>();
  
  if (!articleId) {
    return <Navigate to="/" replace />;
  }

  const allArticles = getAllArticles();
  const article = allArticles.find(a => a.id === articleId);

  if (!article) {
    return <Navigate to="/" replace />;
  }

  // Determine category info based on article ID
  const getCategoryInfo = (id: string) => {
    if (id.startsWith('fashion-')) {
      return { name: 'Fashion Intelligence', route: '/fashion' };
    } else if (id.startsWith('beauty-')) {
      return { name: 'Beauty Revolution', route: '/beauty' };
    } else if (id.startsWith('lifestyle-')) {
      return { name: 'Life Elevated', route: '/lifestyle' };
    } else if (id.startsWith('celebrity-')) {
      return { name: 'Icon Intelligence', route: '/celebrity' };
    } else if (id.startsWith('culture-')) {
      return { name: 'Cultural Currents', route: '/culture' };
    } else if (id.startsWith('wellness-')) {
      return { name: 'Wellness & Style Harmony', route: '/wellness' };
    }
    return { name: 'Articles', route: '/' };
  };

  const categoryInfo = getCategoryInfo(article.id);

  return (
    <ArticlePage
      article={article}
      categoryName={categoryInfo.name}
      categoryRoute={categoryInfo.route}
    />
  );
};

export default ArticleView;
