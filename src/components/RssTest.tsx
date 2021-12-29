import React, { useState } from "react";
import { getRSSFeedData } from "../utils/rss.utils";
import useArticles from "../hooks/useArticles";

{/*
//! this component is test and not relarted to the project
*/}
const podcastRSS =
  "https://feeds.acast.com/public/shows/5ea17537-f11f-4532-8202-294d976b9d5c";
const joshRSS =
  "https://www.joshwcomeau.com/rss.xml";

const cssTricksRSS =
  "https://css-tricks.com/feed/";

const RssTest = (): JSX.Element => {
  const [rssUrl, setRssUrl] =
    useState(joshRSS);

  const { articles,  } = useArticles();

  const handleGetFeed = async (e) => {
    e.preventDefault();
    // console.debug("handleGetFeed >>");
    const results = await getRSSFeedData(rssUrl);
    //addArticles(results);
    setRssUrl("");
  };

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRssUrl(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleGetFeed}>
        <div>
          <label> rss url</label>
          <br />
          <input
            type="text"
            onChange={inputHandler}
            value={rssUrl}
            className=" mb-2 border-4 border-gray-400"
          />
        </div>
        <input type="submit" />
      </form>

      {articles.map((item) => {
        return (
          <div
            className="bg-gray-100 p-2 rounded-sm mb-4"
            key={item.id}
          >
            <h1 className="text-3xl font-bold mb-2">
              {item.title}
            </h1>
            <hr className="my-5 block" />
            {Object.entries(item).map(
              ([key, value]) => {
                return (
                  <div key={key} className="mb-2">
                    <span className="font-bold">
                      {key}:{" "}
                    </span>
                    <div className="prose prose-headings:text-purple-500">
                      <span
                        dangerouslySetInnerHTML={{
                          __html: value,
                        }}
                      />
                    </div>
                  </div>
                );
              }
            )}
            {/* <article
              className="text-lg text-gray-500 max-w-2xl"
              dangerouslySetInnerHTML={{
                __html: item.description,
              }}
            />
            <article
              dangerouslySetInnerHTML={{
                __html:
                  item.content ||
                  item["content:encoded"],
              }}
              className="whitespace-pre-line"
            /> */}

            <a href={item.link} target="_blank">
              Read More &rarr;
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default RssTest;
