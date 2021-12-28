import useArticles from "hooks/useArticles";
import Link from "next/link";
import React, {
  ReactElement,
  useState,
} from "react";
import { TrashIcon } from "@heroicons/react/solid";
import Modal from "../Modal";
import { useRouter } from "next/router";

export default function SidebarFeedItem(): ReactElement {
  const { feeds, removeFeed, getFeedColor } =
    useArticles();
  const [selectedFeed, setSelectedFeed] =
    useState("");

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
  const router = useRouter();
  // const isActive = router.pathname === item.href;

  const checkIsActive = (feed) => {
    const isActive =
      router.query.id === feed.name;
    return isActive;
  };
  return (
    <>
      <ul className="p-2">
        {feeds.map((feed) => (
          <section className="flex justify-between  group ">
            <Link
              href={`/feeds/${feed.name}`}
              key={feed.name}
            >
              <li
                key={feed.link}
                // className="mb-2 p-1 pl-3 cursor-pointer flex items-center space-x-2 overflow-hidden"
                className={`${
                  checkIsActive(feed)
                    ? "bg-gray-200"
                    : "bg-white"
                } mb-2 p-1 pl-3 cursor-pointer flex items-center space-x-2 overflow-hidden rounded-md w-full hover:bg-gray-100`}
              >
                <span
                  className="w-2 h-2 rounded-full block flex-shrink-0"
                  style={{
                    backgroundColor:
                      getFeedColor(feed),
                  }}
                />
                <span className="truncate">
                  {feed.name}
                </span>
              </li>
            </Link>
            <button
               className=" "
              onClick={() => openModal(feed.name)}
            >
              <TrashIcon className="opacity-0 group-hover:opacity-100 transition duration-250 ease-in-out h-5 w-5 text-gray-500 py-auto " />
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
            Are you sure you want to delete this
            item?
          </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={removeFeedHandler}
              className="btn btn-lg btn-light w-full text-center grid place-items-center"
            >
              Yes
            </button>
            <button
              onClick={closeModal}
              onKeyDown={onKeyDownHandler}
              className="btn btn-lg btn-light w-full text-center grid place-items-center"
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
