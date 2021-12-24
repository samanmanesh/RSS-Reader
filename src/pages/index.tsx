import RssTest from "components/RssTest";
import { useEffect, useState } from "react";
import {
  getRSSFeed,
  getRSSFeedData,
  validateRSSUrl,
  getRSSFeedName,
} from "utils/rss.utils";
import useArticles from "hooks/useArticles";
import Link from "next/link";

const color = 'orange'

const bgColor = `bg-orange-300`;
// const routes = [
//   {}

// ];

export default function Home() {
  const { articles, localFeeds, feeds } =
    useArticles();
  // useEffect(() => {
  //   if (window) {
  //     document.documentElement.classList.add(
  //       "dark"
  //     );
  //   }
  // }, []);

  // console.debug("localFeeds", localFeeds);
  // console.debug("articles in index", articles);
  const cssTricksRSS =
    "https://css-tricks.com/feed/";
  const joshRSS =
    "https://www.joshwcomeau.com/rss.xml";
  const mediumRSS =
    "https://medium.com/feed/@joshwcomeau";

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
  console.debug("articles", articles);
  //Todo show the feed name
  const getRSSFeedNameHandler = (
    article: IArticle
  ) => {
    const hostname = getRSSFeedName(article.guid);
    return hostname;
  };

  return (
    <div className="h-full">
      {/* <RssTest /> */}



      {/* showing image if has, title, author name, feed name and date  */}
      {articles.map((item) => {
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
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${bgColor} `}>
                  {getRSSFeedNameHandler(item)}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <h2 className="text-md  mb-2 ">
                  {/* Author Name */}
                  <span
                    dangerouslySetInnerHTML={{
                      __html: item["dc:creator"],
                    }}
                  />
                </h2>

                <h4 className="text-sm font-bold mb-2 text-right">
                  {/* Date */}
                  {item.pubdate.toDateString()}
                </h4>
              </div>

              {/* {Object.entries(item).map(
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
            )} */}
            </button>
          </Link>
        );
      })}
    </div>
  );
}

//       <div
//         className="bg-gray-100 p-2 rounded-sm mb-4"
//         key={item.guid}
//       >
//         <h1 className="text-3xl font-bold mb-2">
//           {item.title}
//         </h1>
//         <hr className="my-5 block" />

//         {Object.entries(item).map(
//           ([key, value]) => {
//             return (
//               <div key={key} className="mb-2">
//                 <span className="font-bold">
//                   {key}:{" "}
//                 </span>
//                 <div className="prose prose-headings:text-purple-500">
//                   <span
//                     dangerouslySetInnerHTML={{
//                       __html: value,
//                     }}
//                   />
//                 </div>
//               </div>
//             );
//           }
//         )}
//       </div>
//     );
//   })}

// </div>
