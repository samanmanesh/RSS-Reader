import React, { ReactElement } from "react";
import { getRSSFeedName } from "utils/rss.utils";
import { ExternalLinkIcon } from "@heroicons/react/solid";
import FeedTag from './layout/FeedTag';
import useArticles from "hooks/useArticles";

interface Props {
  article: IArticle;
}

export default function ArticleView({
  article,
}: Props): ReactElement {
  const { getArticleFeed } = useArticles();
  return (
    <div
      className="p-2 rounded-sm mb-4"
      key={article.guid}
    >
      <div className="flex items-center justify-between  p-3">
        <h1 className="text-3xl font-bold mb-2 text-left  max-w-xl">
          {article.title}
        </h1>
        <FeedTag feed={getArticleFeed(article)} />
      </div>
      <div className="flex items-center justify-between mb-2 p-3">
        <h2 className="text-md  mb-2 ">
          {/* Author Name */}
          <span
            dangerouslySetInnerHTML={{
              __html: article["dc:creator"],
            }}
          />
        </h2>

        <h4 className="text-sm font-bold mb-2 text-right">
          {/* Date */}
          {article.pubdate.toDateString()}
        </h4>
      </div>

      <div className="mb-4 ">
        <a
          href={article.link}
          target="_blank"
          className="btn btn-md btn-light"
        >
          Link to this article{" "}
          <ExternalLinkIcon className="w-4 h-4 ml-1" />
        </a>
      </div>

      <hr className="mb-8" />

      {/** in cases that doesn't have content but has description '*/}
      {article["content:encoded"] ? (
        <div className="prose prose-headings:text-purple-500 mx-auto">
          <span
            dangerouslySetInnerHTML={{
              __html: article["content:encoded"],
            }}
          />
        </div>
      ) : (
        <span
          dangerouslySetInnerHTML={{
            __html: article["description"],
          }}
        />
      )}
    </div>
  );
}

