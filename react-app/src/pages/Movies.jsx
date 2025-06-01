import React, { use, useCallback, useEffect, useState } from "react";
import {
  Link,
  NavLink,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router";
import Loading from "../components/loading";
import ErrorMessage from "../components/ErrorMessage";
import Movie from "../components/Movie";
import ManageMoviesPage from "../components/ManageMoviesPage";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const apiUrl = "https://api.themoviedb.org/3";
const api_key = "64b7db714e0ab0379c4f50f7b4ecb2f7";

const language = "en-EN";

const Movies = () => {
  const [totalPages, setTotalPages] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "popular";
  const page = searchParams.get("page") || "1";

  const currentCategory = category || "popular";
  const currentPage = page || "1";

  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const callbackMovies = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${apiUrl}/movie/${currentCategory}?api_key=${api_key}&page=${currentPage}&language=${language}`
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
      if (data.total_pages > 500) {
        setTotalPages(500);
      } else {
        setTotalPages(data.total_pages);
      }
      setError("");
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [category, currentPage]);

  useEffect(() => {
    callbackMovies();
  }, [callbackMovies]);

  if (isLoading) {
    return <Loading />;
  }

  function getCategoryTitle(category) {
    switch (category) {
      case "now_playing":
        return "On Screen";

      case "top_rated":
        return "Most Rated";
      default:
        return category.charAt(0).toUpperCase() + category.slice(1);
    }
  }
  const categoryTitle = getCategoryTitle(currentCategory);

  function handlePageChange(event, value) {
    navigate(`/movies?category=${currentCategory}&page=${value}`);
  }

  return (
    <div className="container my-3">
      <div className="card border-0">
        <div className="card-header border-0">
          <h2 className="card-title h2 mb-0">{`${categoryTitle} Movies`}</h2>
        </div>
        <div className="card-body border-0">
          {movies.length == 0 ? (
            <div>Film bulunamadı</div>
          ) : (
            <div
              id="movie-list"
              className="row row-cols-2 row-cols-md-4 row-cols-lg-5 g-4"
            >
              {movies.map((m, index) => (
                <Movie key={index} movieObj={m} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-center mt-3 mb-5">
        <Stack spacing={2}>
          <Pagination
            variant="outlined"
            count={totalPages}
            onChange={handlePageChange}
            page={Number(currentPage)}
            boundaryCount={1}
            siblingCount={2}
          />
        </Stack>
      </div>
    </div>
  );
};

export default Movies;
