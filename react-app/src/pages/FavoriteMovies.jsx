import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Movie from "../components/Movie";

const FavoriteMovies = () => {
  const { watchList } = useContext(UserContext);

  return (
    <div className="container  mt-3">
      <h2>Favori Filmlerim</h2>
      <div className="card-body border-0">
        {watchList.length == 0 ? (
          <div>Film bulunamadı</div>
        ) : (
          <div
            id="movie-list"
            className="row row-cols-2 row-cols-md-4 row-cols-lg-5 g-4"
          >
            {watchList.map((m, index) => (
              <Movie key={index} movieObj={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoriteMovies;
