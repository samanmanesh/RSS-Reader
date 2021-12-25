import ArticleView from "components/ArticleView";
import React, {
  ReactElement,
  useMemo,
} from "react";
import { useRouter } from "next/router";
import useArticles from "hooks/useArticles";


export default function DynamicRoute(): ReactElement {
  const router = useRouter();
  const { articles } = useArticles();

  const article = useMemo(() => {
    const id = router.query.id;
    return articles.find(
      (article) => article.id === id
    );
  }, [articles]);

  return (
    <div>
    
      {article ? (
        <ArticleView article={article} />
      ) : (
        <div>No article found</div>
      )}
    </div>
  );
}
