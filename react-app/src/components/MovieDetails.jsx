import { use } from "react";
import { useEffect, useState } from "react";

const api_key = "64b7db714e0ab0379c4f50f7b4ecb2f7";
const page = 1;
const language = "tr-TR";
const query = "batman"; // default query

export default function MovieDetails({ movieObj, onSetSelectedMovie }) {
  const [loadedMovie, setLoadedMovie] = useState({});
  useEffect(() => {
    async function getMovieDetails() {
      if (movieObj) {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieObj.id}?api_key=${api_key}&language=${language}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setLoadedMovie(data);
          console.log(data);
        } catch (error) {
          setError(error.message);
        }
      }
    }
    getMovieDetails();
  }, [movieObj.id]);

  return (
    <div className="movie-details-container my-3">
      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2 className="title h5 mb-0">Movie Details</h2>
          <button
            className="border-0 bg-transparent"
            onClick={() => onSetSelectedMovie(null)}
          >
            <i className="bi bi-x display-6"></i>
          </button>
        </div>
        <div className="card-body">
          {movieObj ? (
            <div className="row">
              <div className="col-md-4">
                <img
                  src={
                    movieObj.backdrop_path
                      ? "https://image.tmdb.org/t/p/original/" +
                        movieObj.backdrop_path
                      : "https://www.disa.com.tr/wp-content/themes/disawp/images/gorsel-yok.jpg"
                  }
                  alt=""
                  className="img-fluid"
                />
              </div>
              <div className="col-md-8">
                <h4>{loadedMovie.title}</h4>
                <p>{movieObj.overview}</p>
                <p>Release Date: {movieObj.release_date}</p>
                <p>Rating: {movieObj.vote_average}</p>
                <p>Total Revenue: {loadedMovie.revenue}</p>
              </div>
            </div>
          ) : (
            <div>No movie selected</div>
          )}
        </div>
      </div>
    </div>
  );
}
