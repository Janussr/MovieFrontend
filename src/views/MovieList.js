import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import apiUtils from "../utils/apiUtils";
import Pagination from "../components/Pagination";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const URL = apiUtils.getUrl();
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 25;
  const [sortDirection, setSortDirection] = useState("ASC");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const getMovies = async () => {
      const response = await apiUtils.getAxios().get(URL + `/api/Movie/all`);
      setMovies(response.data);
    };
    getMovies();
  }, [URL]);

  const toggleSortMoviesByYear = () => {
    if (sortDirection === "ASC") {
      const sortedMovies = [...movies].sort(
        (a, b) => b.releaseYear - a.releaseYear
      );
      setMovies(sortedMovies);
      setSortDirection("DESC");
    } else {
      const sortedMovies = [...movies].sort(
        (a, b) => a.releaseYear - b.releaseYear
      );
      setMovies(sortedMovies);
      setSortDirection("ASC");
    }
  };
  const toggleSortMoviesByRating = () => {
    if (sortDirection === "ASC") {
      const sortedMovies = [...movies].sort((a, b) => b.rating - a.rating);
      setMovies(sortedMovies);
      setSortDirection("DESC");
    } else {
      const sortedMovies = [...movies].sort((a, b) => a.rating - b.rating);
      setMovies(sortedMovies);
      setSortDirection("ASC");
    }
  };
  const toggleSortMoviesByRuntime = () => {
    if (sortDirection === "ASC") {
      const sortedMovies = [...movies].sort((a, b) => b.runtime - a.runtime);
      setMovies(sortedMovies);
      setSortDirection("DESC");
    } else {
      const sortedMovies = [...movies].sort((a, b) => a.runtime - b.runtime);
      setMovies(sortedMovies);
      setSortDirection("ASC");
    }
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

 

  return (
    <div className="center">
      <div className="sorting-buttons">
        <button onClick={toggleSortMoviesByYear}>
          {sortDirection === "ASC"
            ? "Sort by Year (DESC)"
            : "Sort by Year (ASC)"}
        </button>
        <button onClick={toggleSortMoviesByRating}>
          {sortDirection === "ASC"
            ? "Sort by Rating (DESC)"
            : "Sort by Rating (ASC)"}
        </button>
        <button onClick={toggleSortMoviesByRuntime}>
          {sortDirection === "ASC"
            ? "Sort by Runtime (DESC)"
            : "Sort by Runtime (ASC)"}
        </button>
      </div>

      <ul className="movie-grid">
        {movies
          .slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage)
          .map((movie) => (
            <li key={movie.id} className="movie-item">
              <img
                className="movie-poster"
                src={movie.poster}
                alt={`${movie.title} Poster`}
                onClick={() => navigate(`/moviedetail/${movie.id}`)} // Redirect on click
              />
              {movie.title}
            </li>
          ))}
      </ul>

      <Pagination
        moviesPerPage={moviesPerPage}
        totalMovies={movies.length}
        currentPage={currentPage}
        paginate={paginate}
        sortDirection={sortDirection}
      />
    </div>
  );
};

export default MovieList;
