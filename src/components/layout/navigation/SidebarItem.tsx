import useArticles from "hooks/useArticles";
import React, { ReactElement } from "react";
import { classNames } from "utils/ui.utils";

interface ISidebarItem {
  name: string;
  href: string;
  icon: (
    props: React.SVGProps<SVGSVGElement>
  ) => JSX.Element;
  current: boolean;
}

interface Props {
  item: ISidebarItem;
  handleToggle : (name: string) => void;
}

export default function SidebarItem({
  item,
  handleToggle

}: Props): ReactElement {
  const {feeds} =useArticles();

  return (
    <div onClick={()=>handleToggle(item.name)}>
      <a
        key={item.name}
        href={item.href}
        className={classNames(
          item.current
            ? "bg-gray-100 text-gray-900"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
          "group rounded-md py-2 px-2 flex items-center text-base font-medium"
        )}
      >
        <item.icon
          className={classNames(
            item.current
              ? "text-gray-500"
              : "text-gray-400 group-hover:text-gray-500",
            "mr-4 flex-shrink-0 h-6 w-6"
          )}
          aria-hidden="true"
        />
        {item.name}
      </a>
      {item.name === "Feeds" && item.current && (
        <ul className="p-2">
          {feeds.map((feed) => (
            <li key={feed.link} className="mb-2 p-1 pl-10 ">{feed.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
