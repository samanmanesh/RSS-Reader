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

  const checkIsActive = (feed: IFeed) => {
    const isActive =
      router.query.id === feed.name;
    return isActive;
  };
  return (
    <>
      <ul className="p-2 space-y-2.5">
        {feeds.map((feed) => (
          <section className="flex">
            <Link
              href={`/feeds/${feed.name}`}
              key={feed.name}
            >
              <button className="block w-full group focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded-md">
                <li
                  key={feed.link}
                  className={`${
                    checkIsActive(feed)
                      ? "bg-gray-200"
                      : "bg-white"
                  } p-1 pl-3 cursor-pointer flex items-center overflow-hidden rounded-md  hover:bg-gray-100 w-full`}
                >
                  <span
                    className="w-2 h-2 rounded-full block flex-shrink-0 mr-2.5"
                    style={{
                      backgroundColor:
                        getFeedColor(feed),
                    }}
                  />
                  <span className="truncate">
                    {feed.name}
                  </span>
                  <button
                    className="ml-auto group"
                    onClick={() =>
                      openModal(feed.name)
                    }
                  >
                    <TrashIcon className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition duration-250 ease-in-out h-5 w-5 text-gray-500 py-auto " />
                  </button>
                </li>
              </button>
            </Link>
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
              onClick={closeModal}
              onKeyDown={onKeyDownHandler}
              className="btn btn-lg btn-light bg-white hover:bg-gray-100 border-gray-900 text-gray-900 focus:ring-red-500 w-full text-center grid place-items-center"
            >
              Cancel
            </button>
            <button
              onClick={removeFeedHandler}
              // className="btn btn-lg btn-light bg-red-500 hover:bg-red-700 text-white border-gray-900 w-full text-center grid place-items-center"
              className="btn-red btn-lg   w-full transition border-gray-900  "
            >
              Remove
            </button>
            
          </div>
        </div>
      </Modal>
    </>
  );
}
