import { atom, useRecoilState } from "recoil";
import useLocalStorage from "hooks/useLocalStorage";
import { useEffect, useMemo } from "react";
import { getRSSFeedData } from "utils/rss.utils";
import {
  removeDuplicateArticles,
  sortArticles,
} from "utils/articles.utils";

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

const useArticles = (shouldFetch = false) => {
  const [articles, setArticles] =
    useRecoilState<IArticle[]>(articleState);
  const [feeds, setFeeds] =
    useRecoilState<IFeed[]>(feedsState);

  const [localFeeds, setLocalFeeds] =
    useLocalStorage<IFeed[]>("feeds");

  useEffect(() => {
    if (!shouldFetch) return;
    if (localFeeds && feeds.length === 0) {
      setFeeds(localFeeds);
    }
  }, []);

  useEffect(() => {
    if (!shouldFetch) return;
    refreshArticles();
  }, [feeds]);

  const refreshArticles = async () => {
    //? 1. Get all articles from all feeds
    const newArticles = await fetchArticles();

    //? 2. Sort them and remove duplicates
    const sortedArticles =
      sortArticles(newArticles);

    //? 3. Set the articles state 
    setArticles(sortedArticles);
  };

  const fetchArticles = async (): Promise<
    IArticle[]
  > => {
    let articleResults: IArticle[] = [];

    if (feeds.length <= 0) {
      return articleResults;
    }

    for (const feed of feeds) {
      const feedArticles = await getRSSFeedData(
        feed.link
      );
      articleResults = [
        ...articleResults,
        ...feedArticles,
      ];
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

  // const addArticles = (
  //   newArticles: IArticle[]
  // ) => {
  //   if (!newArticles) {
  //     console.error("New articles are undefined");
  //     return;
  //   }
  //   setArticles((prev) => {
  //     const newArticlesNoDuplicates =
  //       newArticles.filter(
  //         (article) => !prev.some(
  //             (prevArticle) =>
  //               prevArticle.guid === article.guid
  //           )
  //       );
  //     return [
  //       ...prev,
  //       ...newArticlesNoDuplicates,
  //     ];
  //   });

  // };

  const addFeed = (feed: IFeed) => {
    //prevents and remove duplicate feed
    const newFeeds = feeds.filter(
      (prevFeed) => prevFeed.link !== feed.link
    );
    setFeeds([...newFeeds, feed]);
    setLocalFeeds([...newFeeds, feed]);

    // setFeeds((prev) => [...prev, feed]);
    // setLocalFeeds([...feeds, feed]); //! why we add feed to feeds here as it already added feeds in global state?
  };

  // console.debug("articles#", articles);
  return {
    articles,
    feeds,
    addFeed,
    localFeeds,
  };
};

export default useArticles;
