import React, { ReactElement } from "react";

interface Props {
  article: IArticle;
}

export default function ShowFeedData({
  article,
}: Props): ReactElement {
  return <div>{article.title}</div>;
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
