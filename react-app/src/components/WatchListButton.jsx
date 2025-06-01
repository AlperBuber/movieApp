import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { redirect, useNavigate } from "react-router";

export default function WatchListButton() {
  const { watchList } = useContext(UserContext);
  const navigate = useNavigate();

  function redirectToFavorites() {
    navigate("/favorites");
  }
  return (
    <div className="mb-2 mb-lg-0 ms-1">
      <button
        onClick={redirectToFavorites}
        type="button"
        className="btn btn-outline-light position-relative"
      >
        <i className="bi bi-heart"></i>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {watchList?.length}
        </span>
      </button>
    </div>
  );
}
