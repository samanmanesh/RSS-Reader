import React, {
  ReactElement,
  useMemo,
} from "react";
import useArticles from "hooks/useArticles";
import { useRouter } from "next/router";
import Dashboard from "components/layout/Dashboard";

export default function Dynamic(): ReactElement {
  const router = useRouter();
  const { articles } = useArticles();

  const filteredArticles = useMemo(() => {
    const id = router.query.id;
    return articles.filter(
      (article) => article.feedName === id
    );
  }, [articles, router]);

  return (
    <div>
      {filteredArticles.map((article) => (
        <Dashboard key={article.id} item={article} />
      ))}
    </div>
  );
}
