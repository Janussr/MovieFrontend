import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import apiUtils from "../utils/apiUtils";
import Pagination from "../components/Pagination";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const URL = apiUtils.getUrl();
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 25;
  const [sortDirection, setSortDirection] = useState('ASC');
  const navigate = useNavigate();  // Initialize useNavigate

  useEffect(() => {
    const getMovies = async () => {
      const response = await apiUtils.getAxios().get(URL + `/api/Movie/all`);
      setMovies(response.data);
    };
    getMovies();
  }, [URL]);

  const sortMoviesByYearASC = async () => {
    const response = await apiUtils.getAxios().get(URL + '/api/Movies/SortMovieByYearASC');
    setMovies(response.data);
    setSortDirection('ASC');
  };

  const sortMoviesByYearDESC = async () => {
    const response = await apiUtils.getAxios().get(URL + '/api/Movies/SortMovieByYearDESC');
    setMovies(response.data);
    setSortDirection('DESC');
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const addMovieToCart = async (movieId, quantity) => {
    const userId = 1;
    try {
      const intMovieId = parseInt(movieId, 10);
      const intQuantity = parseInt(quantity, 10);
      const params = new URLSearchParams({ movieId: intMovieId, userId, quantity: intQuantity });
      const response = await apiUtils.getAxios().post(`${URL}/api/cart/AddMovieToCart?${params.toString()}`);

      if (response.status === 200) {
        alert(`Movie ${intMovieId} added to cart with quantity ${intQuantity}!`);
      }
    } catch (error) {
      console.error('Error adding movie to cart:', error.response ? error.response.data : error);
      alert('Failed to add movie to cart. Please try again.');
    }
  };

  return (
    <div className="center">
      <div className="sorting-buttons">
        <button onClick={sortMoviesByYearASC}>Sort by Year (ASC)</button>
        <button onClick={sortMoviesByYearDESC}>Sort by Year (DESC)</button>
      </div>

      <ul className="movie-grid">
        {movies
          .slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage)
          .map(movie => (
            <li key={movie.id} className="movie-item">
              <img
                className="movie-poster"
                src={movie.poster}
                alt={`${movie.title} Poster`}
                onClick={() => navigate(`/moviedetail/${movie.id}`)}  // Redirect on click
              />
              {movie.title}
              <input
                type="number"
                min="1"
                defaultValue={1}
                id={`quantity-${movie.id}`}
                style={{ width: '50px', marginLeft: '10px' }}
              />
              <button
                onClick={() => {
                  const quantity = document.getElementById(`quantity-${movie.id}`).value;
                  addMovieToCart(movie.id, quantity);
                }}
              >
                Add to Cart
              </button>
            </li>
          ))}
      </ul>

      <Pagination
        moviesPerPage={moviesPerPage}
        totalMovies={movies.length}
        currentPage={currentPage}
        paginate={paginate}
        sortDirection={sortDirection}
        sortASC={sortMoviesByYearASC}
        sortDESC={sortMoviesByYearDESC}
      />
    </div>
  );
};

export default MovieList;
