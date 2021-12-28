import useArticles from "hooks/useArticles";
import useSidebar from "hooks/useSidebar";
import Link from "next/link";
import React, { ReactElement } from "react";
import {
  TrashIcon,
} from "@heroicons/react/solid";

export default function SidebarFeedItem(): ReactElement {
  const { feeds } = useArticles();
  
  const removeFeedHandler = (FeedName:string) => {

        
  }

  return (
    <ul className="p-2">
      {feeds.map((feed) => (
        <section className ="flex justify-between  ">
          <Link
            href={`/feeds/${feed.name}`}
            key={feed.name}
          >
            <li
              key={feed.link}
              className=" mb-2 p-1 pl-3 cursor-pointer flex justify-between  "
            >
              {feed.name}
            </li>
          </Link>
          <button className=" group pl-4 " onClick={()=>removeFeedHandler(feed.name)}>
            <TrashIcon className="invisible group-hover:visible transition duration-250 ease-in-out h-5 w-5 " />
          </button>
        </section>
      ))}
    </ul>
  );
}
