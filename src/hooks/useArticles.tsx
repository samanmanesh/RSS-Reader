import React from "react";
import { atom, useRecoilState } from "recoil";

const rssUrlState = atom({
  key: "rssUrlState",
  default: "",
});

const rssArticleState = atom({
  key: "rssArticleState",
  default: [],
});

const useArticles = () => {
  // not sure about these but know need to be two atom for the state to manage the state
  // one for the url and keep track of the urls and one for the articles and keep track of the articles

  const [articles, setArticles] = useRecoilState<
    IArticle[]
  >(rssArticleState);

  const addArticles = (articles: IArticle[]) => {
    setArticles((prev) => [...prev, ...articles]);
  };

  return {
    articles,
    addArticles,
  };
};

export default useArticles;
