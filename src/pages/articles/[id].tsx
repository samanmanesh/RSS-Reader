import ShowFeedData from "components/ShowFeedData";
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

  console.debug("articles", articles.find(
    (article) => article.id ===router.query.id
  ));

  return (
    <div>
      <h1>{router.query.id}</h1>
      {/* {item.title} */}
      {article ? (
        <ShowFeedData article={article} />
      ) : (
        <div>No article found</div>
      )}
    </div>
  );
}
