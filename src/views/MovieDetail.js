import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiUtils from '../utils/apiUtils';

const MovieDetail = () => {
    const { id } = useParams();  // Get movie ID from route parameters
    const [movie, setMovie] = useState(null);
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

        {/* Add more movie details as needed */}
      </div>
    );
  };

export default MovieDetail