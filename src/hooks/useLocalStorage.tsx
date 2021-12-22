import { useState } from "react";

export default function useLocalStorage<T>(key: string) {
  const actualKey = `rss-reader-${key}`;

  const [value, setValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(actualKey);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  });

  const setItem = (item: any) => {
    try {
      window.localStorage.setItem(actualKey, JSON.stringify(item));
      setValue(item);
    } catch (error) {
      console.error(error);
    }
  };

  return [value, setItem] as [T, (item: T) => void];
}
