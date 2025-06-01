import React, { useCallback, useState, useEffect, use } from "react";
import { Link, useParams } from "react-router";

const apiUrl = "https://api.themoviedb.org/3";
const api_key = "64b7db714e0ab0379c4f50f7b4ecb2f7";

const language = "en-EN";

const PersonProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  const [bioOverFlow, setBioOverflow] = useState(false);

  const [actor, setActor] = useState({});
  const [actorOtherMovies, setActorOtherMovies] = useState([]);

  const callbackActors = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${apiUrl}/person/${id}?api_key=${api_key}&language=${language}`
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
      console.log(data);
      if (data) {
        setActor(data);
        console.log("sa");
      }

      setError("");
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [id]);

  const callbackActorOtherMovies = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${apiUrl}/person/${id}/combined_credits?api_key=${api_key}&language=${language}`
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
      console.log(data);
      if (data) {
        setActorOtherMovies(data);
        console.log("as");
      }

      setError("");
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    callbackActors();
  }, [callbackActors]);

  useEffect(() => {
    callbackActorOtherMovies();
  }, [callbackActorOtherMovies]);

  function personJob() {
    switch (actor?.known_for_department) {
      case "Acting":
        return "Oyuncu";
      case "Directing":
        return "Yönetmen";
      case "Production":
        return "Yapımcı";
      case "Writing":
        return "Senarist";
      default:
        return actor?.known_for_department;
    }
  }

  const personJobTitle = personJob();

  return (
    <div className="container">
      <div className="row justify-content-center justify-content-md-start">
        <div className="aside col-12 col-md-3 mt-4 d-flex flex-column align-items-center align-items-md-start">
          <div className="actor-image">
            <img
              src={`https://image.tmdb.org/t/p/w500/${actor?.profile_path}`}
              alt={actor?.name}
              className="img-fluid rounded"
            />
          </div>
          <div className="actor-personal-details text-center text-md-start">
            <h4 className="mt-3">Kişisel Bilgiler</h4>
            <p className=" m-0 fw-bold">Bilinen İşi</p>
            <p className="m-0">{personJobTitle}</p>
            <p className=" m-0 fw-bold">Doğum Tarihi</p>
            <p className="m-0">
              {actor?.birthday
                ? actor?.birthday.split("-").reverse().join("/")
                : "Bilinmiyor"}
            </p>
          </div>
        </div>
        <div className="actor-details col-12 col-md-9 mt-4 d-flex flex-column align-items-center align-items-md-start">
          <div className="actor-name w-100">
            <h2 className="fw-bold text-black text-center text-md-start">
              {actor?.name}
            </h2>
          </div>
          <div className={`actor-bio ${bioOverFlow ? "expanded" : ""} w-100`}>
            <h4 className="fw-bold text-black text-center text-md-start">
              Biyografi
            </h4>
            <p className="">
              {actor?.biography
                ? actor?.biography
                : "Bu oyuncu hakkında bilgi bulunamadı."}
            </p>
          </div>
          <strong
            className={`float-end actor-details-read-more `}
            style={{ cursor: "pointer" }}
            onClick={() => {
              setBioOverflow(!bioOverFlow);
            }}
          >
            {`${bioOverFlow ? "Daha Az Göster <" : "Daha Fazla Göster >"}`}
          </strong>
          <div className="actor-other-movies w-100">
            <p className="fw-bolder h5 mt-5 text-center text-md-start">{`More movies by ${actor.name}`}</p>
            <div className="otherMovies-IMG mt-3">
              <div className="row justify-content-center justify-content-md-start">
                {actorOtherMovies?.cast?.length > 0 &&
                  actorOtherMovies?.cast
                    .filter((movie) => movie.popularity > 4)
                    .slice(0, 6)
                    .map((movie) => {
                      return (
                        <div
                          className="col-6 col-md-4 col-lg-3 col-xl-2 mb-3 d-flex justify-content-center justify-content-md-start"
                          key={movie.id}
                        >
                          <Link
                            className="text-decoration-none"
                            to={`/${movie.media_type}/${movie.id}`}
                          >
                            <div className="">
                              <img
                                src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                                alt={movie?.title}
                                className="img-fluid rounded"
                                style={{ height: "200px" }}
                              />
                              <p className="text-black hover text-center text-md-start">
                                {movie.title}
                              </p>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonProfile;
