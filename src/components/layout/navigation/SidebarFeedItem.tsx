import useArticles from "hooks/useArticles";
import Link from "next/link";
import React, { ReactElement, useState } from "react";
import { TrashIcon } from "@heroicons/react/solid";
import Modal from "../Modal";

export default function SidebarFeedItem(): ReactElement {
  const { feeds, removeFeed } = useArticles();
  const [selectedFeed, setSelectedFeed] = useState("");

  const removeFeedHandler = () => {
    removeFeed(selectedFeed);
    setSelectedFeed("");
  };

  const openModal = (feedName: string) => {
    setSelectedFeed(feedName);
  };

  const closeModal = () => {
    setSelectedFeed("");
  };

  const onKeyDownHandler = (event) => {
    if (event.key === "Enter") {
      closeModal();
    }
  };

  return (
    <>
      <ul className="p-2">
        {feeds.map((feed) => (
          <section className="flex justify-between  group">
            <Link href={`/feeds/${feed.name}`} key={feed.name}>
              <li
                key={feed.link}
                className=" mb-2 p-1 pl-3 cursor-pointer flex justify-between  "
              >
                {feed.name}
              </li>
            </Link>
            <button className="pl-4 " onClick={() => openModal(feed.name)}>
              <TrashIcon className="opacity-0 group-hover:opacity-100 transition duration-250 ease-in-out h-5 w-5 text-gray-500" />
            </button>
          </section>
        ))}
      </ul>
      <Modal
        title="hello"
        onClose={closeModal}
        onSubmit={closeModal}
        show={selectedFeed !== ""}
      >
        <div>
          <p className="text-lg font-semibold mb-5">
            Are you sure you want to delete this item?
          </p>
          <div className="flex items-center justify-around">
            <button
              onClick={removeFeedHandler}
              className="bg-indigo-400  hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white transition px-8 py-2 rounded-sm border-2 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-white"
            >
              Yes
            </button>
            <button
              onClick={closeModal}
              onKeyDown={onKeyDownHandler}
              className="bg-indigo-400  hover:bg-gray-900 hover:text-white focus:bg-gray-900 focus:text-white  transition px-8 py-2 rounded-sm border-2 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-white "
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
