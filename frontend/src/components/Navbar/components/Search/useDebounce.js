import { useEffect, useState } from "react";

export default function useDebounce(searchText, delay = 500) {
  const [debouncedText, setDebouncedText] = useState(searchText);

  useEffect(() => {
    const id = setTimeout(() => {
      setDebouncedText(searchText);
    }, delay);

    return () => {
      clearTimeout(id);
    };
  }, [searchText, delay]);

  return debouncedText;
}
