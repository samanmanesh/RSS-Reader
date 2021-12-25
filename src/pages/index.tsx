import RssTest from "components/RssTest";
import { getRSSFeedName } from "utils/rss.utils";
import useArticles from "hooks/useArticles";
import Link from "next/link";
import Dashboard from "components/layout/Dashboard";

const bgColor = `bg-orange-300`;

export default function Home() {
  const { articles } =
    useArticles();

  const cssTricksRSS =
    "https://css-tricks.com/feed/";
  const joshRSS =
    "https://www.joshwcomeau.com/rss.xml";
  const mediumRSS =
    "https://medium.com/feed/@joshwcomeau";

  

  // const getRSSFeedNameHandler = (
  //   article: IArticle
  // ) => {
  //   const hostname = getRSSFeedName(article.guid);
  //   console.debug(
  //     ">",
  //     hostname,
  //     article.feedName
  //   );
  //   return hostname;
  // };

  return (
    <div className="h-full">
      {/* showing image if has, title, author name, feed name and date  */}
      {articles.map((item) => {
        return (
          <Dashboard item={item}/>
          // <Link
          //   href={"/articles/" + item.id}
          //   key={item.id}
          // >
          //   <button
          //     className="block w-full outline-none transition focus:ring-2 
          //     focus:ring-offset-4 focus:ring-indigo-500  bg-gray-100 p-2 rounded-sm mb-4 cursor-pointer "
          //     key={item.guid}
          //   >
          //     <div className="flex items-center justify-between">
          //       <h1 className="text-2xl font-bold mb-2 ">
          //         {item.title}
          //       </h1>
          //       <div
          //         className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium ${bgColor} `}
          //       >
          //         {getRSSFeedNameHandler(item)}
          //       </div>
          //     </div>
          //     <div className="flex items-center justify-between">
          //       <h2 className="text-md  mb-2 ">
          //         {/* Author Name */}
          //         <span
          //           dangerouslySetInnerHTML={{
          //             __html: item["dc:creator"],
          //           }}
          //         />
          //       </h2>

          //       <h4 className="text-sm font-bold mb-2 text-right">
          //         {/* Date */}
          //         {item.pubdate.toDateString()}
          //       </h4>
          //     </div>
          //   </button>
          // </Link>
        );
      })}
    </div>
  );
}
