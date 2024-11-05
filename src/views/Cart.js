import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiUtils from "../utils/apiUtils";

const Cart = () => {
    const [movies, setMovies] = useState([]);
    const URL = apiUtils.getUrl();
    const navigate = useNavigate();

    useEffect(() => {
        const getMovies = async () => {
            try {
                const response = await apiUtils.getAxios().get(`${URL}/api/cart/Items?userId=1`);
                setMovies(response.data);
            } catch (error) {
                console.error("Error fetching cart items:", error);
            }
        };
        getMovies();
    }, [URL]);

    // Function to handle purchase
    const handlePurchase = async () => {
        try {
            const response = await apiUtils.getAxios().post(`${URL}/api/cart/Purchase?userId=1`);
            
            if (response.status === 200) {
                setMovies([]); // Clear cart after purchase
            }
        } catch (error) {
            console.error("Error purchasing cart items:", error);
            alert("Failed to complete purchase. Please try again.");
        }
    };

    return (
        <div className="center">
            <h1>Cart</h1>
            
            {movies.length > 0 ? (
                <ul className="movie-grid">
                    {movies.map((movie) => (
                        <li key={movie.id} className="movie-item">
                            <h2>{movie.title}</h2>
                            <p>Quantity: {movie.quantity}</p>
                            <img
                                className="movie-poster"
                                src={movie.poster}
                                alt={`${movie.title} Poster`}
                                onClick={() => navigate(`/moviedetail/${movie.id}`)} // Redirect on click
                            />
                            {/* Add more movie details here if needed */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Your cart is empty.</p>
            )}

            {movies.length > 0 && (
                <button onClick={handlePurchase} className="purchase-button">
                    Purchase All
                </button>
            )}
        </div>
    );
}

export default Cart;
