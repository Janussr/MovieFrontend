import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiUtils from '../utils/apiUtils';

const MovieDetail = () => {
    const { id } = useParams();  // Get movie ID from route parameters
    const [movie, setMovie] = useState(null);
    const [quantity, setQuantity] = useState(1); // State for quantity
    const URL = apiUtils.getUrl();
  
    useEffect(() => {
      const fetchMovie = async () => {
        try {
          const response = await apiUtils.getAxios().get(`${URL}/api/Movie/${id}`);
          setMovie(response.data);
        } catch (error) {
          console.error('Error fetching movie details:', error);
        }
      };
      fetchMovie();
    }, [id, URL]);
  
    if (!movie) {
      return <p>Loading movie details...</p>;
    }

    const addMovieToCart = async () => {
      const userId = 1; // Replace with actual user ID if needed
      try {
        const intMovieId = parseInt(movie.id, 10);
        const intQuantity = parseInt(quantity, 10);
        const params = new URLSearchParams({
          movieId: intMovieId,
          userId,
          quantity: intQuantity,
        });
        const response = await apiUtils
          .getAxios()
          .post(`${URL}/api/cart/AddMovieToCart?${params.toString()}`);
  
        if (response.status === 200) {
          alert(
            `Movie ${intMovieId} added to cart with quantity ${intQuantity}!`
          );
        }
      } catch (error) {
        console.error(
          "Error adding movie to cart:",
          error.response ? error.response.data : error
        );
        alert("Failed to add movie to cart. Please try again.");
      }
    };



  
    return (
      <div className="movie-detail">
        <img src={movie.poster} alt={`${movie.title} Poster`} />
        <h2>{movie.title}</h2>
        <p><strong>Runtime:</strong> {movie.runtime} m</p>
        <p><strong>Year:</strong> {movie.releaseYear}</p>
        <p><strong>Description:</strong> {movie.summary}</p>
        <p><strong>Price:</strong> {movie.price} DKK.-</p>
        <p><strong>Rated:</strong> {movie.certificate}</p>
        <p><strong>Rating:</strong> {movie.rating}</p>
    
        {/* Input and Button Container */}
        <div className="quantity-container">
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="quantity-input" // Add class name for styling
          />
          <button onClick={addMovieToCart} className="add-to-cart-button"> {/* Add class name for styling */}
            Add to Cart
          </button>
        </div>
      </div>
    );
    
  };

export default MovieDetail