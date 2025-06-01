import { useEffect, useState } from "react";
import Movie from "./Movie";
const apiUrl = "https://api.themoviedb.org/3";
const api_key = "64b7db714e0ab0379c4f50f7b4ecb2f7";

const language = "tr-TR";
export default function MovieList({ movieId }) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    async function getMovie() {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${apiUrl}/movie/${movieId}/similar?api_key=${api_key}&language=${language}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        const data = await response.json();
        setMovies(data.results);

        setError("");
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }
    getMovie();
  }, []);

  return (
    <div id="similar-movie-list">
      <div className="card-body p-0">
        {movies?.length == 0 ? (
          <div>Film bulunamadı</div>
        ) : (
          <div
            id="movie-list"
            className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-4"
          >
            {movies?.slice(0, 12).map((m, index) => (
              <Movie key={index} movieObj={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
