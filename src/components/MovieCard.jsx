function MovieCard({ movie, onAdd, isAdded }) {
  return (
    <article className="movie-card">
      <h3>{movie.title}</h3>
      <p>
        <strong>Genre:</strong> {movie.genre}
      </p>
      <p>
        <strong>Year:</strong> {movie.year}
      </p>
      <p>
        <strong>Rating:</strong> {movie.rating}
      </p>
      <button onClick={() => onAdd(movie)} disabled={isAdded}>
        {isAdded ? "Added to Watchlist" : "Add to Watchlist"}
      </button>
    </article>
  );
}

export default MovieCard;
