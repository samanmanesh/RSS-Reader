import React, { ReactElement } from "react";
import { getRSSFeedName } from "utils/rss.utils";

interface Props {
  article: IArticle;
}

export default function ArticleView({
  article,
}: Props): ReactElement {
  // console.debug("article view");
  return (
    <div
      className="p-2 rounded-sm mb-4"
      key={article.guid}
    >
      <div className="flex items-center justify-between  p-3">
        <h1 className="text-3xl font-bold mb-2 text-left  max-w-xl">
          {article.title}
        </h1>
        <div className="tag bg-indigo-300 flex-shrink-0 inline-flex">
          {getRSSFeedName(article.guid)}
        </div>
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
          className=" px-2.5 py-1 bg-cyan-300 rounded-tl-lg rounded-br-lg  "
        >
          Link to this article &rarr;
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

//       <div
//         className="bg-gray-100 p-2 rounded-sm mb-4"
//         key={article.guid}
//       >
//         <h1 className="text-3xl font-bold mb-2">
//           {article.title}
//         </h1>
//         <hr className="my-5 block" />

//         {Object.entries(article).map(
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
