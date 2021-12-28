import React, { ReactElement } from "react";
import ArticleItem from "components/layout/ArticleItem";

interface Props {
  articles: IArticle[];
}

export default function ArticleList({
  articles,
}: Props): ReactElement {
  return (
    <div className="space-y-6 mt-6">
      {articles.map((article) => (
        <ArticleItem
          key={article.id}
          item={article}
        />
      ))}
    </div>
  );
}
