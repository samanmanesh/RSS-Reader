import React, { ReactElement } from "react";
import FeedItem from "components/layout/FeedItem";

interface Props {
  articles: IArticle[];
}

export default function FeedList({
  articles,
}: Props): ReactElement {
  return (
    <div className="space-y-6 mt-6">
      {articles.map((article) => (
        <FeedItem
          key={article.id}
          item={article}
        />
      ))}
    </div>
  );
}
