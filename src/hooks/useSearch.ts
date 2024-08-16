import { useSearchParams, useRouter } from "next/navigation";
import { FormEvent, useState, useEffect } from "react";

const useSearch = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    const searchParam = searchParams.get("search") || "";
    setSearchWord(searchParam);
  }, [searchParams]);

  const handleSearch = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    router.push(`?search=${encodeURIComponent(searchWord)}`);
  };

  return { searchWord, setSearchWord, handleSearch };
};

export default useSearch;
