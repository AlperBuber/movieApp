import React, { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router";
import ErrorMessage from "../components/ErrorMessage";
import Loading from "../components/loading";
import SimilarMovieList from "../components/SimilarMovieList";

const apiUrl = "https://api.themoviedb.org/3";
const api_key = "64b7db714e0ab0379c4f50f7b4ecb2f7";
const language = "tr-TR";

const MovieCastDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    async function getMovie() {
      setIsLoading(true);

      try {
        const response = await fetch(
          `${apiUrl}/movie/${id}?api_key=${api_key}&language=${language}&append_to_response=credits`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        const data = await response.json();
        setMovie(data);
        setError("");
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    }
    getMovie();
  }, [id]);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage message={error} />;
  }
  console.log(movie);

  return (
    <div className="">
      <div className="   py-4" id="cast-details-bg">
        <div className="container d-flex align-items-center">
          <div className="mini-image">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
              alt={movie?.title}
              className="img-fluid rounded"
              style={{ height: "150px" }}
            />
          </div>
          <div>
            <h2 className="fw-bold text-white  ms-3">
              {movie?.title}
              <span className="text-white-50 ms-2">
                ({movie?.release_date?.split("-")[0]})
              </span>
            </h2>
            <div className="return-main-page ms-3">
              <Link
                to={`/movie/${id}`}
                className="text-decoration-none rounded-0 border-0 text-white-50"
              >
                <i className="bi bi-arrow-left"></i> Geri Dön
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container ">
        <div className="row">
          <div className="card border-0 col-6 ">
            <div className="card-header border-0 d-flex align-items-center ">
              <h2 className="card-title h2 mb-0">Oyuncular </h2>{" "}
              <span className="text-dark text-secondary fs-3 ms-2">
                {movie?.credits?.cast?.length}
              </span>
            </div>
            <div className="card-body border-0">
              {movie?.credits?.cast?.length == 0 ? (
                <div>Oyuncu bulunamadı</div>
              ) : (
                <div id="movie-list" className="row row-cols-12">
                  {movie?.credits?.cast?.slice(0, 60).map((m, index) => (
                    <NavLink
                      key={index}
                      to={`/person/${m.id}`}
                      className="text-decoration-none text-white"
                    >
                      <div className="col d-flex align-items-center gap-3 mb-3">
                        <img
                          id="cast-image"
                          src={
                            m.profile_path
                              ? `https://image.tmdb.org/t/p/w500/${m.profile_path}`
                              : "https://www.drnitinborse.com/wp-content/uploads/2018/02/user-icon-300x300.png"
                          }
                          alt={m.name}
                          className={
                            m.profile_path
                              ? "img-fluid rounded"
                              : "img-fluid rounded noMiniImage"
                          }
                        />
                        <div>
                          <h5 className="text-dark">{m.name}</h5>
                          <p className="text-dark">{m.character}</p>
                        </div>
                      </div>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="card border-0 col-6 ">
            <div className="card-header border-0 d-flex align-items-center ">
              <h2 className="card-title h2 mb-0">Ekip Kadrosu </h2>{" "}
              <span className="text-dark text-secondary fs-3 ms-2">
                {movie?.credits?.crew?.length}
              </span>
            </div>
            <div className="card-body border-0">
              {movie?.credits?.crew?.length == 0 ? (
                <div>Oyuncu bulunamadı</div>
              ) : (
                <div id="movie-list" className="row row-cols-12">
                  {movie?.credits?.crew?.slice(0, 60).map((m, index) => (
                    <NavLink
                      key={index}
                      to={`/person/${m.id}`}
                      className="text-decoration-none text-white"
                    >
                      <div className="col d-flex align-items-center gap-3 mb-3">
                        <img
                          id="cast-image"
                          src={
                            m.profile_path
                              ? `https://image.tmdb.org/t/p/w500/${m.profile_path}`
                              : "https://www.drnitinborse.com/wp-content/uploads/2018/02/user-icon-300x300.png"
                          }
                          alt={m.name}
                          className={
                            m.profile_path
                              ? "img-fluid rounded"
                              : "img-fluid rounded noMiniImage"
                          }
                        />
                        <div>
                          <h5 className="text-dark">{m.name}</h5>
                          <p className="text-dark">{m.known_for_department}</p>
                        </div>
                      </div>
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCastDetails;
