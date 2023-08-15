import React, { useState, useEffect } from "react";
import apiUtils from "../utils/apiUtils";
import Pagination from "../components/Pagination";


const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const URL = apiUtils.getUrl();
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 25


  useEffect(() => {
    const getMovies = async () => {
        const response = await apiUtils.getAxios().get(URL + `/api/Movies/GetMovies`);
        setMovies(response.data);
    };
    getMovies();
}, [URL]);


 //Change page
 const paginate = (pageNumber) => {
  setCurrentPage(pageNumber);
}


return (
  <div className="center">
    <h1>Movie List</h1>

    <ul>
      {movies
        .slice((currentPage - 1) * moviesPerPage, currentPage * moviesPerPage)
        .map(movie => (
          <li key={movie.id}>{movie.title} - {movie.runtime} </li>
        ))}
    </ul>

    <Pagination
      moviesPerPage={moviesPerPage}
      totalMovies={movies.length}
      currentPage={currentPage}
      paginate={paginate}
    />
  </div>
);

};

export default MovieList;
