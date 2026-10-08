import { MOVIE_GENRES } from '../../utils/constants';
import './GenreFilter.css';

export default function GenreFilter({ selectedGenre, onSelectGenre }) {
  return (
    <div className="genre-filter-wrapper hide-scrollbar">
      <button
        type="button"
        className={`genre-filter-pill ${!selectedGenre ? 'active' : ''}`}
        onClick={() => onSelectGenre(null)}
      >
        All Genres
      </button>
      {MOVIE_GENRES.map((genre) => (
        <button
          key={genre.id}
          type="button"
          className={`genre-filter-pill ${String(selectedGenre) === String(genre.id) ? 'active' : ''}`}
          onClick={() => onSelectGenre(genre.id)}
        >
          {genre.name}
        </button>
      ))}
    </div>
  );
}
