function Watchlist({ watchlist, onRemove }) {
  return (
    <section className="watchlist">
      <h2>My Watchlist</h2>

      {watchlist.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        watchlist.map((movie) => (
          <div key={movie.id} className="watchlist-item">
            <span>{movie.title}</span>
            <button onClick={() => onRemove(movie.id)}>Remove</button>
          </div>
        ))
      )}
    </section>
  );
}

export default Watchlist;
