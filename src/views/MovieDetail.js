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
        <h2>{movie.title}</h2>
        <img src={movie.poster} alt={`${movie.title} Poster`} />
        <p><strong>Runtime:</strong> {movie.runtime}</p>
        <p><strong>Release Year:</strong> {movie.releaseYear}</p>
        <p><strong>Description:</strong> {movie.summary}</p>
        {/* Add more movie details as needed */}
      </div>
    );
  };

export default MovieDetail