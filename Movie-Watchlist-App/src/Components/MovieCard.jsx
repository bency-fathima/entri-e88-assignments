
import React from "react";

function MovieCard({ title, genre, year, rating, isAdded, onAdd }) {
  return (
    <div className="card">
      <p>Genre: {genre}</p>

      <h3>{title}</h3>

      <p>Release Year: {year}</p>

      <p>Rating:  {rating}</p>

      <button onClick={onAdd} disabled={isAdded}>
        {isAdded ? "Added" : "Add to Watchlist"}
      </button>
    </div>
  );
}

export default MovieCard;
