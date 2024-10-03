import React, { useState, useEffect } from "react";
import apiUtils from "../utils/apiUtils";
import Pagination from "../components/Pagination";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const URL = apiUtils.getUrl();
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 25;
  const [sortDirection, setSortDirection] = useState('ASC'); // Initial sort direction

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

  //Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Function to add movie to cart
  const addMovieToCart = async (movieId, quantity) => {
    const userId = 1; // Hardcoded user ID
    try {
        // Ensure movieId and quantity are integers
        const intMovieId = parseInt(movieId, 10);
        const intQuantity = parseInt(quantity, 10);

        // Construct the query string
        const params = new URLSearchParams({
            movieId: intMovieId,
            userId: userId,
            quantity: intQuantity,
        });

        // Log the constructed URL for debugging
        console.log('Constructed URL:', `${URL}/api/cart/AddMovieToCart?${params.toString()}`);

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
      <h1>Movie List</h1>

      <div className="sorting-buttons">
        <button onClick={sortMoviesByYearASC}>Sort by Year (ASC)</button>
        <button onClick={sortMoviesByYearDESC}>Sort by Year (DESC)</button>
      </div>

      <ul>
        {movies
          .slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage)
          .map(movie => (
            <li key={movie.id}>
              <img
                className="movie-poster"
                src={movie.poster}
                alt={`${movie.title} Poster`}
              />
              {/* Display movie title, runtime, and release year */}
              {movie.title} - {movie.runtime} - {movie.releaseYear} Release Year

              {/* Input for quantity */}
              <input
                type="number"
                min="1" // Minimum quantity of 1
                defaultValue={1} // Default quantity
                id={`quantity-${movie.id}`} // Unique ID for the input
                style={{ width: '50px', marginLeft: '10px' }} // Inline style for width and margin
              />

              {/* Button to add movie to cart */}
              <button onClick={() => {
                const quantity = document.getElementById(`quantity-${movie.id}`).value; // Get the quantity value
                // Add debugging logs to confirm values
                console.log('Quantity:', quantity);
                console.log('Movie ID:', movie.id); // Ensure movie.id is correct
                addMovieToCart(movie.id, quantity); // Using movie.id instead of movie.movieId
              }}>
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
