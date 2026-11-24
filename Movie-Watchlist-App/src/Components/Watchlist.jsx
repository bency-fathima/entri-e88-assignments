
import React from "react";

function Watchlist({ movies, onRemove }) {
  return (
    <div>
      <h2>My Watchlist</h2>

      {movies.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        movies.map((movie) => (
          <div className="watchlist-item" key={movie.id}>
            <span>{movie.title}</span>

            <button onClick={() => onRemove(movie.id)}>
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Watchlist;
