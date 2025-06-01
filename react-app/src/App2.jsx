import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import ErrorMessage from "./components/ErrorMessage";
import Logo from "./components/Logo";
import SearchForm from "./components/SearchForm";
import WatchListButton from "./components/WatchListButton";

import MovieList from "./components/MovieList";
import WatchList from "./components/WatchList";

import { movie_list } from "./data";
import Loading from "./components/loading";
import MovieDetails from "./components/MovieDetails";

const api_key = "64b7db714e0ab0379c4f50f7b4ecb2f7";
const page = 1;
const language = "tr-TR";
const query = "batman"; // default query

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watchListMovies, setWatchListMovies] = useState([]);
  const [isWatchListOpen, setIsWatchListOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [queryString, setQueryString] = useState("batman");

  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    async function getMovies() {
      setIsLoading(true);

      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${queryString}&page=${page}&language=${language}`
        );
        if (response.status === 404) {
          throw new Error(
            "404 Not Found: The requested resource could not be found."
          );
        }
        if (response.status === 500) {
          throw new Error(
            "500 Internal Server Error: The server encountered an error."
          );
        }
        if (response.status === 401) {
          throw new Error(
            "401 Unauthorized: Access is denied due to invalid credentials."
          );
        }
        if (response.status === 403) {
          throw new Error(
            "403 Forbidden: The server understood the request, but it refuses to authorize it."
          );
        }
        if (response.status === 408) {
          throw new Error(
            "408 Request Timeout: The server timed out waiting for the request."
          );
        }

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        const data = await response.json();
        if (data.results.length != 0) {
          setMovies(data.results);
        }
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }
    getMovies();
  }, [queryString]);

  function handleAddToWatchList(movie) {
    const isAddedToList = watchListMovies.map((i) => i.id).includes(movie.id);

    if (!isAddedToList) {
      setWatchListMovies((movies) => [...movies, movie]);
    }
  }

  function handleRemoveFromWatchList(movie) {
    setWatchListMovies((movies) => movies.filter((i) => i.id !== movie.id));
  }
  function handleSelectedMovie(movie) {
    setSelectedMovie(movie);
    window.scrollTo(0, 0);
  }

  return (
    <>
      <Header>
        <Logo />
        <SearchForm
          queryString={queryString}
          onSetQueryString={setQueryString}
        />
        <WatchListButton
          movies={watchListMovies}
          onSetIsWatchListOpen={setIsWatchListOpen}
        />
      </Header>

      <Main>
        <WatchList
          movies={watchListMovies}
          isWatchListOpen={isWatchListOpen}
          onRemoveFromWatchList={handleRemoveFromWatchList}
        />
        {selectedMovie && (
          <MovieDetails
            movieObj={selectedMovie}
            onSetSelectedMovie={setSelectedMovie}
          />
        )}
        {isLoading && <Loading />}
        {!isLoading && !error && (
          <MovieList
            movies={movies}
            onAddToList={handleAddToWatchList}
            selectedMovie={selectedMovie}
            onSetSelectedMovie={handleSelectedMovie}
          />
        )}
        {error && <ErrorMessage error={error} />}
      </Main>
      <Footer />
    </>
  );
}
