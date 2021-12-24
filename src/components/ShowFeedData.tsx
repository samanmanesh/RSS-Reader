import React, { ReactElement } from "react";

interface Props {
  article: IArticle;
}
//Todo gets the feed name by param to show */
export default function ShowFeedData({
  article,
}: Props): ReactElement {
  return (
    <div
      className="bg-gray-100 p-2 rounded-sm mb-4"
      key={article.guid}
    >
      <h1 className="text-3xl font-bold mb-2">
        {article.title}
      </h1>
      <hr className="my-5 block" />
      <div>
        <span
          dangerouslySetInnerHTML={{
            __html: article["dc:creator"],
          }}
        />
        {/**show the feed name */}

        <span
          dangerouslySetInnerHTML={{
            __html: article["d"],
          }}
        />
      </div>

      <div className="prose prose-headings:text-purple-500">
        <span
          dangerouslySetInnerHTML={{
            __html: article["content:encoded"],
          }}
        />
      </div>

      {Object.entries(article).map(
        ([key, value]) => {
          return (
            <div key={key} className="mb-2">
              {console.debug(key)}
              <span className="font-bold bg-red-400">
                {key}
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
