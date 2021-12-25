import { atom, useRecoilState } from "recoil";

const searchState = atom({
  key: "searchState",
  default: "",
});

export default function useSearch() {
  const [search, setSearch] =
    useRecoilState(searchState);

  return {
    search,
    setSearch,
  };
}
