import useArticles from "hooks/useArticles";
import React, { ReactElement } from "react";

interface Props {
  feed: IFeed;
}

export default function FeedTag({
  feed,
}: Props): ReactElement {
  const { getFeedColor } = useArticles();
  
  if (!feed) return <></>;

  return (
    <span
      className="tag"
      style={{
        backgroundColor: getFeedColor(feed),
      }}
    >
      <span className="opacity-70">{feed.name}</span>
    </span>
  );
}
