
import { useState, useEffect } from "react";
import axios from "axios";

import MovieCard from "./components/MovieCard";
import Watchlist from "./components/Watchlist";

import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [genre, setGenre] = useState("All");
  const [loading, setLoading] = useState(true);

  // Fetch movies using useEffect and Axios
  useEffect(() => {
    axios
      .get("/movies.json")
      .then((response) => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching movies:", error);
        setLoading(false);
      });
  }, []);

  // Add movie to watchlist
  const addToWatchlist = (movie) => {
    setWatchlist((currentWatchlist) => {
      const alreadyAdded = currentWatchlist.some(
        (item) => item.id === movie.id
      );

      return alreadyAdded ? currentWatchlist : [...currentWatchlist, movie];
    });
  };

  // Remove movie from watchlist
  const removeFromWatchlist = (id) => {
    setWatchlist((currentWatchlist) =>
      currentWatchlist.filter((movie) => movie.id !== id)
    );
  };

  // Filter movies based on genre
  const filteredMovies =
    genre === "All"
      ? movies
      : movies.filter((movie) => movie.genre === genre);

  const genres = [
    "All",
    "Action",
    "Comedy",
    "Drama",
    "Romance",
    "Horror"
  ];

  return (
    <div className="app">

      <header>
        <h1>🎬 Movie Watchlist</h1>
        <p>Discover movies and create your personal watchlist</p>
      </header>

      <main>

        <section>
          <h2>Explore Movies</h2>

          {/* Genre Filter */}
          <div className="filter-buttons">
            {genres.map((item) => (
              <button
                key={item}
                className={genre === item ? "active" : ""}
                onClick={() => setGenre(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {/* Loading Spinner */}
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading movies...</p>
            </div>
          ) : filteredMovies.length === 0 ? (
            <p className="no-movies">No movies found.</p>
          ) : (
            <div className="movie-container">
              {filteredMovies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onAdd={addToWatchlist}
                  isAdded={watchlist.some(
                    (item) => item.id === movie.id
                  )}
                />
              ))}
            </div>
          )}
        </section>

        {/* Watchlist */}
        <Watchlist
          watchlist={watchlist}
          onRemove={removeFromWatchlist}
        />

      </main>

      <footer>
        <p>Movie Watchlist Application | React Assignment</p>
      </footer>

    </div>
  );
}

export default App;
