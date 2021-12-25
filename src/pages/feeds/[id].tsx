import React, {
  ReactElement,
  useMemo,
} from "react";
import useArticles from "hooks/useArticles";
import { useRouter } from "next/router";
import FeedItem from "components/layout/FeedItem";

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
        <div className="pt-4 space-y-6">
          <FeedItem key={article.id} item={article} />

        </div>
      ))}
    </div>
  );
}
