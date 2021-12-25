import useArticles from "hooks/useArticles";
import useSidebar from "hooks/useSidebar";
import Link from "next/link";
import React, { ReactElement } from "react";
import { getRSSFeedName } from "utils/rss.utils";

interface Props {}

export default function feeds({}: Props): ReactElement {
  const { articles, localFeeds, feeds } =
    useArticles();
  const { filterFeed } = useSidebar();

  const getRSSFeedNameHandler = (
    article: IArticle
  ) => {
    const hostname = getRSSFeedName(article.guid);
    return hostname;
  };

  console.debug(articles);

  console.debug("filterFeeds", filterFeed);

  return (
    <div className="h-full">
      {/* showing image if has, title, author name, feed name and date  */}
      {/* {articles.map((article) => { article.filter( item => item.guid === filterFeed  ) */}
      {articles
        .filter(
          (article) => article.feedName === filterFeed
        )
        .map((item) => {
          return (
            <Link
              href={"/articles/" + item.id}
              key={item.id}
            >
              <button
                className="block w-full outline-none transition focus:ring-2 
              focus:ring-offset-4 focus:ring-indigo-500  bg-gray-100 p-2 rounded-sm mb-4 cursor-pointer "
                key={item.guid}
              >
                <div className="flex items-center justify-between">
                  <h1 className="text-2xl font-bold mb-2 ">
                    {item.title}
                  </h1>
                  <div
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-red-400 `}
                  >
                    {getRSSFeedNameHandler(item)}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <h2 className="text-md  mb-2 ">
                    {/* Author Name */}
                    <span
                      dangerouslySetInnerHTML={{
                        __html:
                          item["dc:creator"],
                      }}
                    />
                  </h2>

                  <h4 className="text-sm font-bold mb-2 text-right">
                    {/* Date */}
                    {item.pubdate.toDateString()}
                  </h4>
                </div>
              </button>
            </Link>
          );
        })}
    </div>
  );
}
