import React, {
  ReactElement,
  useMemo,
} from "react";
import useArticles from "hooks/useArticles";
import { useRouter } from "next/router";
import FeedList from "components/layout/FeedList";

export default function Dynamic(): ReactElement {
  const router = useRouter();
  const { searchResults } = useArticles();
  
  console.debug("router", router.query.id);
  console.debug("searchResults", searchResults);


  // name of router not match with guid
  const filteredArticles = useMemo(() => {
    const id = router.query.id;
    // const id2 ="www.nytimes.com";
    
    const check = searchResults.filter(
      (article) => console.debug("feedName",article.feedName, "id ->" , id));
    
      console.debug("check", check);
    return searchResults.filter(
      
      (article) => article.feedName === id
    );
  }, [searchResults, router]);

  
  

    // console.debug ("router name is", router.query.id);
    // console.debug ("filteredArticles", filteredArticles);

  return <FeedList articles={filteredArticles} />;
}
