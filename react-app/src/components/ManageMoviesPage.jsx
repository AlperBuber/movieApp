import React from "react";
import { Link, useNavigate } from "react-router";

const ManageMoviesPage = ({
  currentCategory,
  currentPage,
  totalPages,
  query,
}) => {
  const navigate = useNavigate();

  const handlePrevPage = () => {
    if (query) {
      navigate(
        `/search?q=${encodeURIComponent(query)}&page=${
          parseInt(currentPage) - 1
        }`
      );
    } else {
      navigate(
        `/movies?category=${currentCategory}&page=${parseInt(currentPage) - 1}`
      );
    }
  };

  const handleNextPage = () => {
    if (query) {
      navigate(
        `/search?q=${encodeURIComponent(query)}&page=${
          parseInt(currentPage) + 1
        }`
      );
    } else {
      navigate(
        `/movies?category=${currentCategory}&page=${parseInt(currentPage) + 1}`
      );
    }
  };
  return (
    <div className="pagination  d-flex flex-column align-items-center">
      <div className="totalAndCurrent-pages">
        <span>
          {currentPage} / {totalPages}
        </span>
      </div>
      <div className="pagination-buttons mt-3">
        <button
          className="btn btn-primary btn-sm me-2"
          onClick={handlePrevPage}
          disabled={parseInt(currentPage) === 1}
        >
          Geri
        </button>
        <button className="btn btn-primary btn-sm" onClick={handleNextPage}>
          İleri
        </button>
      </div>
    </div>
  );
};

export default ManageMoviesPage;
