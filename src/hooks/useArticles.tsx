import { atom, useRecoilState } from "recoil";
import useLocalStorage from "hooks/useLocalStorage";
import { useEffect, useMemo } from "react";
import { getRSSFeedData } from "utils/rss.utils";
import { removeDuplicateArticles, sortArticles } from "utils/articles.utils";

const articleState = atom({
  key: "articleState",
  default: [],
});

const feedsState = atom({
  key: "feeds",
  default: [],
});

// interface IFeed {
//   name: string;
//   link: string;
// }

const useArticles = () => {
  const [articles, setArticles] =
    useRecoilState<IArticle[]>(articleState);
  const [feeds, setFeeds] =
    useRecoilState<IFeed[]>(feedsState);
  const [localFeeds, setLocalFeeds] =
    useLocalStorage<IFeed[]>("feeds");

  useEffect(() => {
    if (localFeeds) {
      setFeeds(localFeeds);
    }
  }, []);

  useEffect(() => {
    refreshArticles();
  }, [feeds]);

  const refreshArticles = async () => {
    // 1. Get all articles from all feeds
    const newArticles = await fetchArticles();

    // 2. Sort them and remove duplicates
    const sortedArticles = sortArticles(newArticles);
    const uniqueArticles = removeDuplicateArticles(sortedArticles);

    // 3. Save them in state
    setArticles(uniqueArticles);
  }

  const fetchArticles = async (): Promise<IArticle[]> => {
    const articleResults: IArticle[] = [];
    if (feeds.length > 0) {
      feeds.forEach(async (feed) => {
        const url = feed.link;
        const results = await getRSSFeedData(url);
        articleResults.push(...results)
      });
    }
    return articleResults;
  };

  // const fetchArticles = async () => {
  //   if (feeds.length > 0) {
  //     feeds.forEach(async (feed) => {
  //       const url = feed.link;
  //       const results = await getRSSFeedData(url);
  //       addArticles(results);
  //     });
  //   }
  // };

  //         )
  //     const feed = feeds[0];
  //     const url = feed.link;
  //     const results = await getRSSFeedData(url);
  //     addArticles( results);

  //   }
  // }

  const addArticles = (
    newArticles: IArticle[]
  ) => {
    if (!newArticles) {
      console.error("New articles are undefined");
      return;
    }
    setArticles((prev) => {
      const newArticlesNoDuplicates =
        newArticles.filter(
          (article) =>
            !prev.some(
              (prevArticle) =>
                prevArticle.guid === article.guid
            )
        );
      return [
        ...prev,
        ...newArticlesNoDuplicates,
      ];
    });
    //adding article to prev articles array
    // console.debug("articles", articles);
    // console.debug("articlesParams", articlesParams);

    // const newArticles = articles.slice();
    // const artPara = articlesParams.slice();
    //newArticles.push(artPara);
    // setArticles(newArticles);

    // console.debug("articles", articles);
  };

  const addFeed = (feed: IFeed) => {
    setFeeds((prev) => [...prev, feed]);
    setLocalFeeds([...feeds, feed]); //! why we add feed to feeds here as it already added feeds in global state?
  };

  return {
    articles,
    addArticles,
    feeds,
    addFeed,
    localFeeds,
  };
};

export default useArticles;