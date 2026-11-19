import React, { useState, useEffect } from "react";
import axios from "axios";

import MovieCard from "./components/MovieCard";
import Watchlist from "./components/Watchlist";

import "./App.css";

function App() {
  // Store movies
  const [movies, setMovies] = useState([]);

  // Store watchlist
  const [watchlist, setWatchlist] = useState([]);

  // Store selected genre
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Loading state
  const [loading, setLoading] = useState(true);

  // Error state
  const [error, setError] = useState("");

  // Fetch movies using Axios and useEffect
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);

        const response = await axios.get("/movies.json");

        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);

        setError("Failed to load movies. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Add movie to watchlist
  const addToWatchlist = (movie) => {
    setWatchlist((prevWatchlist) => {
      const alreadyExists = prevWatchlist.some((item) => item.id === movie.id);

      if (alreadyExists) {
        return prevWatchlist;
      }

      return [...prevWatchlist, movie];
    });
  };

  // Remove movie from watchlist
  const removeMovie = (id) => {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.filter((movie) => movie.id !== id),
    );
  };

  // Genre buttons
  const genres = [
    "All",
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Romance",
    "Sci-Fi",
  ];

  // Filter movies by genre
  const filteredMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter((movie) => movie.genre === selectedGenre);

  // Check whether movie is already added
  const isMovieAdded = (id) => {
    return watchlist.some((movie) => movie.id === id);
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <h1>🎬 Movie Watchlist</h1>

        <p>Discover movies and create your personal watchlist</p>
      </header>

      {/* Genre Filter */}
      <section className="filter-section">
        <h2>Filter Movies by Genre</h2>

        <div className="filter-buttons">
          {genres.map((genre) => (
            <button
              key={genre}
              className={selectedGenre === genre ? "active" : ""}
              onClick={() => setSelectedGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
      </section>

      {/* Available Movies */}
      <section className="movies-section">
        <h2>Available Movies</h2>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>

            <p>Loading movies...</p>
          </div>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : filteredMovies.length === 0 ? (
          <p className="no-movies">No movies found</p>
        ) : (
          <div className="movie-container">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                genre={movie.genre}
                year={movie.year}
                rating={movie.rating}
                isAdded={isMovieAdded(movie.id)}
                onAdd={addToWatchlist}
              />
            ))}
          </div>
        )}
      </section>

      {/* Watchlist */}
      <Watchlist watchlist={watchlist} removeMovie={removeMovie} />
    </div>
  );
}

export default App;
