import React from "react";
import { atom, useRecoilState } from "recoil";

const articleState = atom({
  key: "articleState",
  default: [],
});

const useArticles = () => {
  const [articles, setArticles] =
    useRecoilState<IArticle[]>(articleState);

  const addArticles = (articles: IArticle[]) => {
    setArticles((prev) => [...prev, ...articles]);
  };

  return {
    articles,
    addArticles,
  };
};

export default useArticles;
