import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const storedWatchList = localStorage.getItem("watchList");
  const initialWatchList = storedWatchList ? JSON.parse(storedWatchList) : [];
  const [watchList, setWatchList] = useState(initialWatchList);

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  function addToWatchList(movie) {
    const isAddedToList = watchList.map((i) => i.id).includes(movie.id);

    if (!isAddedToList) {
      setWatchList((movies) => [...movies, movie]);
      toast.success(`${movie.title} was added to your favourite list.`);
    } else {
      toast.info(`${movie.title} was already added to your favourite list.`);
    }
  }

  function removeFromWatchList(movie) {
    setWatchList((movies) => movies.filter((i) => i.id !== movie.id));
    toast.warning(`${movie.title} was removed from your favourite list.`);
  }
  return (
    <UserContext.Provider
      value={{ watchList, addToWatchList, removeFromWatchList }}
    >
      {children}
    </UserContext.Provider>
  );
}
