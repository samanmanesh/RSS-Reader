import RssTest from "components/RssTest";
import { useEffect, useState } from "react";
import { getRSSFeed } from "utils/rss.utils";
import useArticles from "hooks/useArticles";

export default function Home() {
  const { articles, addArticles } = useArticles();
  useEffect(() => {
    if (window) {
      document.documentElement.classList.add(
        "dark"
      );
    }
  }, []);

  const cssTricksRSS =
    "https://css-tricks.com/feed/";
  const joshRSS =
    "https://www.joshwcomeau.com/rss.xml";

  // const [rssUrl, setRssUrl] = useState(cssTricksRSS);

  // const inputHandler = (
  //   e: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   setRssUrl(e.target.value);
  // };

  // const handleGetFeed = async (e) => {
  //   e.preventDefault();
  //   console.debug("handleGetFeed >>");
  //   const results = await getRSSFeed(rssUrl);
  //   console.debug("handleGetFeed <<", results);
  //   addArticles(results);
  //   setRssUrl("");
  // };

  console.debug("index", articles);

  return (
    <div className="h-full">
      {/* <RssTest /> */}

      {/* {articles.map((article) => (
        <div key={article.guid}>
          {article.guid}
        </div>
      ))} */}

      {articles.map((item) => {
        return (
          <div
            className="bg-gray-100 p-2 rounded-sm mb-4"
            key={item.guid}
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
          </div>
        );
      })}
    </div>
  );
}
