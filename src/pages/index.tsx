import RssTest from "components/RssTest";
import { useEffect, useState } from "react";
import { getRSSFeedData } from "utils/rss.utils";
import useArticles from "hooks/useArticles";
import Link from "next/link";

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

  console.debug("localFeeds", localFeeds);
  console.debug("articles in index", articles);
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

  return (
    <div className="h-full">
      {/* <RssTest /> */}

      {/* showing image if has, title, author name, feed name and date  */}
      {articles.map((item) => {
        return (
          <Link href={'/articles/' + item.id } key={item.id}  >
            
            <div
              className="bg-gray-100 p-2 rounded-sm mb-4"
              key={item.guid}
            >
              <div className="w-4 h-2 mb-8">
                Image Wrapper 
              </div>

              <hr className="my-5 block" />

              <h1 className="text-2xl font-bold mb-2">
                {item.title}
              </h1>

              <h2 className="text-xl font-bold mb-2">
                Author Name
              </h2>

              <h3 className="text-xl font-bold mb-2">
                Feed Name
              </h3>

              <h4 className="text-xl font-bold mb-2">
                Date
              </h4>

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
            </div>
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