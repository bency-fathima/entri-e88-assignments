
import React, { useState, useEffect } from "react";
import axios from "axios";

import MovieCard from "./Components/MovieCard";
import Watchlist from "./Components/Watchlist";
import GenreFilter from "./Components/GenreFilter";

import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get("/movies.json")
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.log("Error fetching movies:", error);
      })
      .finally(() => {
        setLoading(false);
      });

  }, []);


  function addToWatchlist(movie) {

    const alreadyAdded = watchlist.some(
      (item) => item.id === movie.id
    );

    if (!alreadyAdded) {
      setWatchlist((prev) => [...prev, movie]);
    }
  }


  function removeFromWatchlist(id) {

    setWatchlist((prev) =>
      prev.filter((movie) => movie.id !== id)
    );

  }

  const genres = [
    "All",
    "Action",
    "Comedy",
    "Drama",
    "Sci-Fi",
    "Romance",
    "Horror"
  ];

  const filteredMovies =
    selectedGenre === "All"
      ? movies
      : movies.filter(
          (movie) => movie.genre === selectedGenre
      )

  if (loading) {
    return <h2>Loading movies...</h2>;
  }


  return (
    <div className="app">

      <h1>Movie Watchlist</h1>

      <h2>Explore Movies</h2>

      <GenreFilter
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
      />



      <div className="movie-container">

        {filteredMovies.length === 0 ? (
          <p>No movies found.</p>
        ) : (

          filteredMovies.map((movie) => (

            <MovieCard
              key={movie.id}
              title={movie.title}
              genre={movie.genre}
              year={movie.year}
              rating={movie.rating}

              isAdded={watchlist.some(
                (item) => item.id === movie.id
              )}

              onAdd={() => addToWatchlist(movie)}
            />

          ))

        )}

      </div>

      <Watchlist
        movies={watchlist}
        onRemove={removeFromWatchlist}
      />

    </div>
  );
}

export default App;
