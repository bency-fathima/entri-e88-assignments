import "./MovieCard.css";

// Displays one movie. Receives title, genre, year and rating as props,
// plus whether it is already in the watchlist and a handler for adding it.
function MovieCard({ title, genre, year, rating, isAdded, onAdd }) {
  return (
    <article className="movie-card">
      <span className="movie-genre">{genre}</span>
      <h3 className="movie-title">{title}</h3>
      <div className="movie-meta">
        <span>{year}</span>
        <span className="movie-rating">★ {rating}</span>
      </div>
      <button
        className={isAdded ? "card-btn card-btn-added" : "card-btn card-btn-add"}
        onClick={onAdd}
        disabled={isAdded}
      >
        {isAdded ? "Added" : "Add to Watchlist"}
      </button>
    </article>
  );
}

export default MovieCard;