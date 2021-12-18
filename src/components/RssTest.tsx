import React, { useState } from "react";
import { getRSSFeed } from '../utils/rss.utils';
import useArticles from '../hooks/useArticles';

const podcastRSS =
  "https://feeds.acast.com/public/shows/5ea17537-f11f-4532-8202-294d976b9d5c";
const joshRSS =
  "https://www.joshwcomeau.com/rss.xml";

const cssTricksRSS =
  "https://css-tricks.com/feed/";

const RssTest = ():JSX.Element => {
  const [rssUrl, setRssUrl] = useState(cssTricksRSS);
  const [items, setItems] = useState<IArticle[]>(
    []
  );
  const {articles,addArticles} = useArticles();

  // const getRss = async (e) => {
  //   e.preventDefault();
  //   const urlRegex =
  //     /(http|ftp|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/;
  //   if (!urlRegex.test(rssUrl)) {
  //     console.error("URL is not valid");
  //     return;
  //   }
  //   const res = await fetch(
  //     `https://api.allorigins.win/get?url=${rssUrl}`
  //   );
  //   const { contents } = await res.json();
  //   const feed =
  //     new window.DOMParser().parseFromString(
  //       contents,
  //       "text/xml"
  //     );
  //   const items = feed.querySelectorAll("item");

  //   const articles = Array.from(items).map(
  //     convertItemToArticle
  //   );
  //   setItems(articles);

  //   console.debug("articles >>", articles);

  //   setRssUrl("");
  // };

  const handleGetFeed = async () => {
    const results = await getRSSFeed(rssUrl);
    setItems(results)
    addArticles(results);
    setRssUrl("");
  }

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

      {items.map((item) => {
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
