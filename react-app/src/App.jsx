import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import MainLayout from "./layouts/MainLayout";
import Movies from "./pages/Movies";
import MovieCastDetails from "./pages/MovieCastDetails";
import SearchResults from "./pages/SearchResults";
import PersonProfile from "./pages/PersonProfile";
import FavoriteMovies from "./pages/FavoriteMovies";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      // { path: "/movies", element: <Movies /> },
      { path: "/movies", element: <Movies /> },
      { path: "/:movie/:id", element: <MovieDetails /> },
      { path: "/:movie/:id/cast", element: <MovieCastDetails /> },
      { path: "search", element: <SearchResults /> },
      { path: "/person/:id", element: <PersonProfile /> },
      { path: "/favorites", element: <FavoriteMovies /> },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={routes} />
      <ToastContainer
        position="top-right"
        autoClose={1300}
        hideProgressBar={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default App;
