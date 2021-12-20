import { atom, useRecoilState } from "recoil";

const sidebarState = atom({
  key: "sidebarState",
  default: false,
});

const useSidebar = () => {
  const [sidebarOpen, setSidebarOpen] =
    useRecoilState<boolean>(sidebarState);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return {
    sidebarOpen,
    setSidebarOpen,
    toggleSidebar,
  };
};

export default useSidebar;
