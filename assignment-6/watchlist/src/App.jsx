

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MovieCard from './components/MovieCard'
import Watchlist from './components/Watchlist'
import './App.css'

const defaultMovies = [
  { id: 1, title: 'Inception', genre: 'Action', year: 2010, rating: 8.8 },
  { id: 2, title: 'The Hangover', genre: 'Comedy', year: 2009, rating: 7.7 },
  { id: 3, title: 'The Shawshank Redemption', genre: 'Drama', year: 1994, rating: 9.3 },
  { id: 4, title: 'Mad Max: Fury Road', genre: 'Action', year: 2015, rating: 8.1 },
  { id: 5, title: 'Superbad', genre: 'Comedy', year: 2007, rating: 7.6 },
  { id: 6, title: 'Forrest Gump', genre: 'Sci-Fi', year: 1994, rating: 8.8 }
]

export default function App() {
  const [movies, setMovies] = useState([])
  const [watchlist, setWatchlist] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get('/Movies.json')
      .then((response) => {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setMovies(response.data)
        } else {
          setMovies(defaultMovies)
        }
        setLoading(false)
      })
      .catch(() => {
        setMovies(defaultMovies)
        setLoading(false)
      })
  }, [])

  const handleAddToWatchlist = (movie) => {
    const alreadyExists = watchlist.some((item) => item.id === movie.id)
    if (!alreadyExists) {
      setWatchlist([...watchlist, movie])
    }
  }

  const handleRemoveFromWatchlist = (id) => {
    setWatchlist(watchlist.filter((movie) => movie.id !== id))
  }

  const genres = ['All', 'Action', 'Comedy', 'Drama', 'Sci-Fi']

  const filteredMovies =
    selectedGenre === 'All'
      ? movies
      : movies.filter((movie) => movie.genre === selectedGenre)

  return (
    <div className="container">
      <h1>Movie Watchlist</h1>

      <div className="filter-buttons">
        {genres.map((genre) => (
          <button
            key={genre}
            className={selectedGenre === genre ? 'active' : ''}
            onClick={() => setSelectedGenre(genre)}
          >
            {genre}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="spinner">Loading movies...</div>
      ) : filteredMovies.length === 0 ? (
        <p className="no-movies">No movies found</p>
      ) : (
        <div className="movies-grid">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              genre={movie.genre}
              year={movie.year}
              rating={movie.rating}
              onAdd={() => handleAddToWatchlist(movie)}
              isAdded={watchlist.some((item) => item.id === movie.id)}
            />
          ))}
        </div>
      )}

      <Watchlist
        watchlist={watchlist}
        onRemove={handleRemoveFromWatchlist}
      />
    </div>
  )
}