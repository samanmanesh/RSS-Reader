import React from "react";
import { atom, useRecoilState } from "recoil";

const articleState = atom({
  key: "articleState",
  default: [],
});

const feedsState = atom({
  key: "feeds",
  default: [],
})

interface IFeed {
  id: string;
  title: string;
  link: string;
  description: string;
  pubDate: Date;
  items: IArticle[];
}

const useArticles = () => {
  const [articles, setArticles] =
    useRecoilState<IArticle[]>(articleState);
  const [feeds, setFeed] = useRecoilState<IFeed[]>(feedsState);


  const addArticles = (articles: IArticle[]) => {
    setArticles((prev) => [...prev, ...articles]);
  };

  const addFeed = (feed: IFeed) => {
    setFeed((prev) => [...prev, feed]);
  };

  const getFeed = () => {
    const sortedArticles = articles.sort(
      (a, b) => {
        return (
          a.pubdate.getTime() -
          b.pubdate.getTime()
        );
      }
    );

    return sortedArticles;
  };

  return {
    articles,
    addArticles,
    feeds,
    setFeed,
  };
};

export default useArticles;
