import Logo from "./Logo";
import { NavLink, useSearchParams } from "react-router";
import "bootstrap/dist/js/bootstrap.bundle.min";
import SearchForm from "./SearchForm";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import WatchListButton from "./WatchListButton";

export default function Navbar() {
  const { theme } = useContext(ThemeContext);
  return (
    <nav
      className={`navbar navbar-expand-lg navbar-light bg-${theme} py-2 m-0`}
      data-bs-theme={theme}
    >
      <div className="container d-flex justify-content-between">
        <Logo />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse flex justify-content-between"
          id="navbarNav"
        >
          <ul className="navbar-nav ">
            <li className="nav-item">
              <a className="nav-link text-white" href="/">
                Home
              </a>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Movies
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    className="dropdown-item"
                    href="/movies?category=popular&page=1"
                  >
                    Popular
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="/movies?category=now_playing&page=1"
                  >
                    On Screen
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="/movies?category=upcoming&page=1"
                  >
                    Upcoming
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item"
                    href="/movies?category=top_rated&page=1"
                  >
                    Most Rated
                  </a>
                </li>
              </ul>
            </li>
          </ul>
          <div className="d-flex">
            <SearchForm />
            <WatchListButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
