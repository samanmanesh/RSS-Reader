import useArticles from "hooks/useArticles";
import Link from "next/link";
import React, { ReactElement } from "react";



export default function SidebarFeedItem(): ReactElement {
  const { feeds } = useArticles();

  return (

    <ul className="p-2">
    {feeds.map((feed) => (
      <li
        key={feed.link}
        className="mb-2 p-1 pl-10 "
      >
        {feed.name}
      </li>
    ))}
  </ul>
     );
}
