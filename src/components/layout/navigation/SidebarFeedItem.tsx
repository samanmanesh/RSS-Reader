import useArticles from "hooks/useArticles";
import useSidebar from "hooks/useSidebar";
import Link from "next/link";
import React, { ReactElement } from "react";



export default function SidebarFeedItem(): ReactElement {
  const { feeds } = useArticles();
  const {changeFilterFeed} = useSidebar();
  const filterHandler = (feed: string) => {
    console.debug("feed", feed);
    changeFilterFeed(feed);
  };

  return (

    <ul className="p-2">
    {feeds.map((feed) => (
      <Link
      href={"/feeds/"}
      key={feed.name}
    >
      <button onClick={() => filterHandler(feed.link)} key={feed.name} className="">

      <li
        key={feed.link}
        className="mb-2 p-1 pl-10 "
      >
        {feed.name}
      </li>
      </button>
      </Link>
    ))}
  </ul>
     );
}
