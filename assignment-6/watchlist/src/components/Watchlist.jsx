import React from 'react'

export default function Watchlist({ watchlist, onRemove }) {
    return (
        <div className="watchlist">
            <h2>My Watchlist ({watchlist.length})</h2>
            {watchlist.length === 0 ? (
                <p>Your watchlist is empty.</p>
            ) : (
                watchlist.map((movie) => (
                    <div key={movie.id} className="watchlist-item">
                        <span>
                            {movie.title} ({movie.year}) - {movie.genre} | ⭐ {movie.rating}
                        </span>
                        <button onClick={() => onRemove(movie.id)}>Remove</button>
                    </div>
                ))
            )}
        </div>
    )
}