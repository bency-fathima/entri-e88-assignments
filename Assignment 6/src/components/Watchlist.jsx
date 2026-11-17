import "./Watchlist.css";

// Shows every movie the user has added, each with a Remove button.
function Watchlist({ movies, onRemove }) {
  return (
    <aside className="watchlist">
      <h2>
        My Watchlist <span className="count">{movies.length}</span>
      </h2>

      {movies.length === 0 ? (
        <p className="empty">Your watchlist is empty. Add a movie to get started.</p>
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id} className="watchlist-item">
              <div>
                <strong>{movie.title}</strong>
                <small>
                  {movie.genre} · {movie.year} · ★ {movie.rating}
                </small>
              </div>
              <button className="remove-btn" onClick={() => onRemove(movie.id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}

export default Watchlist;