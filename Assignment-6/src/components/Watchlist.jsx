import React from "react";

function Watchlist({ watchlist, removeMovie }) {
  return (
    <div className="watchlist-section">

      <h2>❤️ My Watchlist</h2>

      <p className="watch-count">
        Total Movies: {watchlist.length}
      </p>

      {watchlist.length === 0 ? (
        <p className="empty-message">
          Your watchlist is empty. Add some movies!
        </p>
      ) : (

        <div className="watchlist-container">

          {watchlist.map((movie) => (

            <div className="watchlist-item" key={movie.id}>

              <div>
                <h3>{movie.title}</h3>
                <p>
                  {movie.genre} | {movie.year} | ⭐ {movie.rating}
                </p>
              </div>

              <button
                className="remove-btn"
                onClick={() => removeMovie(movie.id)}
              >
                Remove
              </button>

            </div>

          ))}

        </div>
      )}

    </div>
  );
}

export default Watchlist;