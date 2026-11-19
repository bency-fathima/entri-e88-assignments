import React from "react";

function MovieCard({
  id,
  title,
  genre,
  year,
  rating,
  isAdded,
  onAdd
}) {
  return (
    <div className="movie-card">

      <div className="movie-icon">🎬</div>

      <h3>{title}</h3>

      <p>
        <strong>Genre:</strong> {genre}
      </p>

      <p>
        <strong>Year:</strong> {year}
      </p>

      <p>
        <strong>Rating:</strong> ⭐ {rating}/10
      </p>

      <button
        className={isAdded ? "added-btn" : "add-btn"}
        onClick={() =>
          onAdd({ id, title, genre, year, rating })
        }
        disabled={isAdded}
      >
        {isAdded ? "Added ✓" : "Add to Watchlist"}
      </button>

    </div>
  );
}

export default MovieCard;