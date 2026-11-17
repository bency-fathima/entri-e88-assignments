import "./GenreFilter.css";

// Row of buttons; the active genre is highlighted.
function GenreFilter({ genres, selected, onSelect }) {
  return (
    <div className="genre-filter">
      {genres.map((genre) => (
        <button
          key={genre}
          className={genre === selected ? "chip chip-active" : "chip"}
          onClick={() => onSelect(genre)}
        >
          {genre}
        </button>
      ))}
    </div>
  );
}

export default GenreFilter;