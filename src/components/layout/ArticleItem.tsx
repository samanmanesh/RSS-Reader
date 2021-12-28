import useArticles from "hooks/useArticles";
import Link from "next/link";
import React, { ReactElement } from "react";
import { getRSSFeedName } from "utils/rss.utils";
import FeedTag from './FeedTag';

interface Props {
  item: IArticle;
}

export default function ArticleItem({
  item,
}: Props): ReactElement {
  const { getArticleFeed } = useArticles();

  return (
    <Link
      href={"/articles/" + item.id}
      key={item.id}
    >
      <button
        className="block w-full max-w-2xl mx-auto outline-none transition focus:ring-2
        focus:ring-offset-4 focus:ring-indigo-500  bg-gray-100 rounded-md cursor-pointer overflow-hidden
        group
        "
        key={item.guid}
        >
        {item.imageSrc ? (
          <div className="h-64 bg-black">
            <img
              src={item.imageSrc}
              className="w-full h-full object-cover opacity-80 transition group-hover:opacity-100 group-focus:opacity-100"
            />
          </div>
        ) : null}
        <div className="px-6 py-4">

        <div className="flex items-start justify-between gap-2">
          <h1 className="text-2xl font-bold mb-2 text-left max-w-md">
            {item.title}
          </h1>
          <FeedTag feed={getArticleFeed(item)} />
          {/* <div
            className={`flex-shrink-0 inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium`}
            style={{
              backgroundColor: getFeedColor(feed)
            }}
          >
            {getRSSFeedName(item.guid)}
          </div> */}
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-md  mb-2 ">
            {/* Author Name */}
            <span
            className="text-gray-600 font-medium"
              dangerouslySetInnerHTML={{
                __html: item["dc:creator"],
              }}
            />
          </h2>

          <h4 className="text-sm font-medium text-gray-600 mb-2 text-right">
            {/* Date */}
            {item.pubdate.toDateString()}
          </h4>
        </div>
        </div>
      </button>
    </Link>
  );
}
