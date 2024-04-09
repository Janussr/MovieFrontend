import React, { useEffect, useState } from 'react';

type Movie = {
    id: number;
    movieId: string;
    title: string;
}

function ProjectsPage() {
    // State to store the movies
    const [movies, setMovies] = useState<Movie[]>([]);

    // Function to fetch movies from your API
    const fetchMovies = async () => {
        try {
            const response = await fetch('https://localhost:7238/api/movie', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                // Additional options like 'mode' might be needed if you run into CORS issues
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setMovies(data);
        } catch (error) {
            console.error('There was a problem with your fetch operation:', error);
        }
    };

    // useEffect to call fetchMovies when the component mounts
    useEffect(() => {
        fetchMovies();
    }, []); // The empty array ensures this effect runs only once after the initial render

    return (
        <div>
            <h1>Projects</h1>
            <div>
                {movies.length > 0 ? (
                    <ul>
                        {movies.map((movie) => (
                            <li key={movie.id}>{movie.title}</li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading movies...</p>
                )}
            </div>
        </div>
    );
}

export default ProjectsPage;
