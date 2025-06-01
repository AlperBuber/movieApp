import { useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../contexts/UserContext";
import { useLocation } from "react-router";

export default function Movie({ movieObj }) {
  const { watchList, addToWatchList, removeFromWatchList } =
    useContext(UserContext);

  const location = useLocation();
  const isFavoritesPage = location.pathname === "/favorites";

  function handleAddOrRemoveMovie() {
    const isInWatchList = watchList.some((movie) => movie.id === movieObj.id);
    if (isInWatchList && isFavoritesPage) {
      removeFromWatchList(movieObj);
    } else {
      addToWatchList(movieObj);
    }
  }
  function formatDate(dateString) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const [year, month, day] = dateString.split("-");
    return `${parseInt(day)} ${months[parseInt(month) - 1]} ${year}`;
  }

  const formattedDate = formatDate(movieObj.release_date);

  return (
    <div className="col">
      {
        <div className="card movie position-relative h-100">
          <Link to={`/movie/${movieObj.id}`} className="position-relative">
            {" "}
            <img
              src={
                movieObj.poster_path
                  ? "https://image.tmdb.org/t/p/original/" +
                    movieObj.poster_path
                  : "https://www.disa.com.tr/wp-content/themes/disawp/images/gorsel-yok.jpg"
              }
              alt=""
              className="card-img-top "
              style={{
                height: "300px",
                objectFit: "cover",
              }}
            />
          </Link>
          <div className="card-body" id="movie-card-body">
            <div className="card-title d-flex justify-content-between align-items-center">
              <Link
                to={`/movies/${movieObj.id}`}
                className="position-relative text-decoration-none text-dark"
              >
                <h4 className="">{movieObj.title}</h4>
              </Link>
            </div>
            <div className="card-text text-secondary">{formattedDate}</div>
          </div>
          <div className="favorite-button">
            <button
              onClick={handleAddOrRemoveMovie}
              type="button"
              className="btn position-absolute top-0 end-0 badge bg-dark m-1"
            >
              <i
                className={`bi ${
                  isFavoritesPage ? "bi-heart-fill" : "bi-heart"
                }`}
              ></i>
            </button>
          </div>
        </div>
      }
    </div>
  );
}
