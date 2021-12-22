import React, {
  useEffect,
  useState,
} from "react";
import { Fragment } from "react";
import {
  Dialog,
  Menu,
  Transition,
} from "@headlessui/react";
import {
  BellIcon,
  CalendarIcon,
  ChartBarIcon,
  FolderIcon,
  HomeIcon,
  InboxIcon,
  MenuAlt2Icon,
  UsersIcon,
  XIcon,
} from "@heroicons/react/outline";
import { SearchIcon } from "@heroicons/react/solid";
import useSidebar from "hooks/useSidebar";
import { classNames } from "utils/ui.utils";
import SidebarItem from "./SidebarItem";
import useModal from "hooks/useModal";
import Modal from "components/layout/Modal";
import useArticles from "hooks/useArticles";
import {
  getRSSFeedData,
  getRSSFeed,
} from "utils/rss.utils";

const navigation = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
  },
  {
    name: "Feeds",
    href: "/about",
    icon: UsersIcon,
  },
  {
    name: "Folders",
    href: "#",
    icon: FolderIcon,
  },
  // {
  //   name: "Calendar",
  //   href: "#",
  //   icon: CalendarIcon,
  //   current: false,
  // },
  // {
  //   name: "Documents",
  //   href: "#",
  //   icon: InboxIcon,
  //   current: false,
  // },
  // {
  //   name: "Reports",
  //   href: "#",
  //   icon: ChartBarIcon,
  //   current: false,
  // },
];

const Sidebar = () => {
  const [showModal, openModal, closeModal] =
    useModal();
  const { sidebarOpen, setSidebarOpen } =
    useSidebar();
  const { articles, addArticles, addFeed } =
    useArticles();
  const [selectNavItem, setSelectNavItem] =
    useState("");

  useEffect(() => {
    if (window) {
      document.documentElement.classList.add(
        "dark"
      );
    }
  }, []);

  const cssTricksRSS =
    "https://css-tricks.com/feed/";
  const joshRSS =
    "https://www.joshwcomeau.com/rss.xml";

  const [rssUrl, setRssUrl] =
    useState(cssTricksRSS);

  const inputHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRssUrl(e.target.value);
  };

  const handleGetFeedData = async (e) => {
    e.preventDefault();
    console.debug("handleGetFeedData >>");
    const results = await getRSSFeedData(rssUrl);
    addArticles(results);
    setRssUrl("");
  };
  {
    /**just take url and name IFeed and store it on Feeds on local storage */
  }
  const handleGetFeed = async (e) => {
    e.preventDefault();
    console.debug("handleGetFeed >>");
    const results = await getRSSFeed(rssUrl);
    console.debug("results is", results);

    if (results) addFeed(results);
    setRssUrl("");
  };

  const handleToggle = (name: string) => {
    navigation.forEach((item) => {
      if (item.name === name) {
        // item.current = !item.current;
        setSelectNavItem(name);
      }
    });
  };
  console.log("selectNavItem", selectNavItem);

  return (
    <>
      {/* Transition sidebar for small screens */}
      <Transition.Root
        show={sidebarOpen}
        as={Fragment}
      >
        <Dialog
          as="div"
          className="fixed inset-0 z-40 flex md:hidden"
          onClose={setSidebarOpen}
        >
          {/* Background */}
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>

          {/* Nav Sidebar */}
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute  top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() =>
                      setSidebarOpen(false)
                    }
                  >
                    <span className="sr-only">
                      Close sidebar
                    </span>
                    <XIcon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </Transition.Child>
              {/* Logo */}
              <div className="flex-shrink-0  px-4 flex items-center">
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
                  alt="Workflow"
                />
              </div>
              {/* Navigation Items */}
              <div className="mt-5  flex-1 h-0 overflow-y-auto">
                <nav className="px-2 space-y-1">
                  {navigation.map((item) => (
                    <SidebarItem
                      key={item.name}
                      item={item}
                      handleToggle={handleToggle}
                    />
                  ))}
                </nav>
              </div>
              <button
                onClick={openModal}
                className="btn btn-lg btn-light mx-auto mb-6"
              >
                Add New Item
              </button>{" "}
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14">
            {/* Dummy element to force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="border-r border-gray-200 pt-5 flex flex-col flex-grow bg-white overflow-y-auto">
          <div className="flex-shrink-0 px-4 flex items-center">
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/workflow-logo-indigo-600-mark-gray-800-text.svg"
              alt="Workflow"
            />
          </div>
          <div className="flex-grow mt-5 flex flex-col">
            <nav className="flex-1 px-2 pb-4 space-y-1">
              {navigation.map((item) => (
                <SidebarItem
                  key={item.name}
                  item={item}
                  handleToggle={handleToggle}
                />
              ))}
            </nav>
            <button
              onClick={openModal}
              className="btn btn-lg btn-light mx-auto mb-6"
            >
              Add New Item
            </button>
            {console.log(showModal)}
          </div>
          <Modal
            title="hello"
            onClose={closeModal}
            onSubmit={closeModal}
            show={showModal}
          >
            <form onSubmit={handleGetFeed}>
              <div className="flex flex-col space-y-5 justify-items-center">
                <label> Type Your RSS URL </label>

                <input
                  type="text"
                  onChange={inputHandler}
                  value={rssUrl}
                  className=" mb-2 border-4 border-gray-400"
                />
                <input
                  type="submit"
                  className="p-3 m-6 border-solid border-2 border-black"
                />
              </div>
            </form>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
