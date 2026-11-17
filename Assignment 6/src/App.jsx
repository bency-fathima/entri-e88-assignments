import { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "./components/MovieCard.jsx";
import Watchlist from "./components/Watchlist.jsx";
import GenreFilter from "./components/GenreFilter.jsx";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Fetch movies once on mount.
  useEffect(() => {
    axios
      .get("/movies.json")
      .then((response) => setMovies(response.data))
      .catch(() => setError("Could not load movies. Please try again."))
      .finally(() => setLoading(false));
  }, []);

  // Add a movie unless it is already there. Builds a new array, never mutates.
  const addToWatchlist = (movie) => {
    setWatchlist((prev) =>
      prev.some((m) => m.id === movie.id) ? prev : [...prev, movie]
    );
  };

  // Remove by id using filter, which returns a new array.
  const removeFromWatchlist = (id) => {
    setWatchlist((prev) => prev.filter((m) => m.id !== id));
  };

  // Genres are derived from the data, with "All" first.
  const genres = ["All", ...new Set(movies.map((m) => m.genre))];

  const filteredMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter((m) => m.genre === selectedGenre);

  const isInWatchlist = (id) => watchlist.some((m) => m.id === id);

  return (
    <div className="app">
      <header>
        <h1>Movie Watchlist</h1>
        <p>Browse movies and build your own watchlist.</p>
      </header>

      <div className="layout">
        <main>
          {loading ? (
            <div className="spinner-wrap" role="status">
              <div className="spinner" />
              <p>Loading movies...</p>
            </div>
          ) : error ? (
            <p className="error">{error}</p>
          ) : (
            <>
              <GenreFilter
                genres={genres}
                selected={selectedGenre}
                onSelect={setSelectedGenre}
              />

              {filteredMovies.length === 0 ? (
                <p className="no-movies">No movies found</p>
              ) : (
                <div className="grid">
                  {filteredMovies.map((movie) => (
                    <MovieCard
                      key={movie.id}
                      title={movie.title}
                      genre={movie.genre}
                      year={movie.year}
                      rating={movie.rating}
                      isAdded={isInWatchlist(movie.id)}
                      onAdd={() => addToWatchlist(movie)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </main>

        <Watchlist movies={watchlist} onRemove={removeFromWatchlist} />
      </div>
    </div>
  );
}

export default App;