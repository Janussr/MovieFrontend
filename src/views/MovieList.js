import React, { useState, useEffect } from "react";
import apiUtils from "../utils/apiUtils";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const URL = apiUtils.getUrl();

  useEffect(() => {
    const getMovies = async () => {
        const response = await apiUtils.getAxios().get(URL + `/api/Movies/GetMovies`);
        setMovies(response.data);
    };
    getMovies();
}, [URL]);

  return (
    <div className="center">
      <h1>Movie List</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title}{movie.runtime}</li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
