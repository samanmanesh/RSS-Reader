import { atom, useRecoilState } from "recoil";

const sidebarState = atom({
  key: "sidebarState",
  default: false,
});

const filterFeedState = atom({
  key: "filterFeedState",
  default: "",
});
const useSidebar = () => {
  const [sidebarOpen, setSidebarOpen] =
    useRecoilState<boolean>(sidebarState);

  const [filterFeed, setFilterFeed] =
    useRecoilState(filterFeedState);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const changeFilterFeed = ( feedName: string) =>
    setFilterFeed(feedName? feedName : "");

  return {
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
    filterFeed,
    changeFilterFeed,
  };
};

export default useSidebar;
