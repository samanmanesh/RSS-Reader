import React, {
  ReactElement,
  useMemo,
} from "react";
import useArticles from "hooks/useArticles";
import { useRouter } from "next/router";
import ArticleList from "components/layout/ArticleList";

export default function Dynamic(): ReactElement {
 
  const router = useRouter();
  const { searchResults } = useArticles();

  const filteredArticles = useMemo(() => {
    const id = router.query.id;

    return searchResults.filter(
      (article) => article.feedName === id
    );
  }, [searchResults, router]);

  return <ArticleList articles={filteredArticles} />;
}
