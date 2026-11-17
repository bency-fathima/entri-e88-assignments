import React from 'react'

export default function MovieCard({ title, genre, year, rating, onAdd, isAdded }) {
  return (
    <div className="movie-card">
      <h3>{title}</h3>
      <p>Genre: {genre}</p>
      <p>Year: {year}</p>
      <p>Rating: {rating}</p>
      <button onClick={onAdd} disabled={isAdded}>
        {isAdded ? 'Added' : 'Add to Watchlist'}
      </button>
    </div>
  )
}