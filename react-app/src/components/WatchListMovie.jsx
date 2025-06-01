export default function WatchListMovie({ movieObj, onRemoveFromWatchList }) {
  return (
    <div className="col">
      {
        <div className="card movie position-relative">
          <img
            src={
              "https://image.tmdb.org/t/p/original/" + movieObj.backdrop_path
            }
            alt=""
            className="card-img-top"
          />
          <div className="card-body" id="movie-card-body">
            <div className="card-title d-flex justify-content-between align-items-center">
              <h4 className="">{movieObj.title}</h4>
              <button
                onClick={() => onRemoveFromWatchList(movieObj)}
                type="button"
                className="btn btn-light border favorite-button"
              >
                <i className="bi bi-heart-fill "></i>
              </button>
            </div>
            {movieObj.is_new && (
              <span className="position-absolute top-0 end-0 badge bg-danger m-1">
                New
              </span>
            )}
          </div>
        </div>
      }
    </div>
  );
}
