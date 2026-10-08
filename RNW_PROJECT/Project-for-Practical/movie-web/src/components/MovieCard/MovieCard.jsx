import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Star, Heart, Bookmark, Info, Film } from 'lucide-react';
import { addFavorite, removeFavorite, addToWatchlist, removeFromWatchlist } from '../../redux/actions/userActions';
import { getPosterUrl } from '../../utils/imageHelpers';
import { GENRE_MAP } from '../../utils/constants';
import ShinyText from '../ShinyText/ShinyText';
import StarBorder from '../StarBorder/StarBorder';
import './MovieCard.css';

export default function MovieCard({ movie }) {
  const [imgError, setImgError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { favorites = [], watchlist = [] } = useSelector((state) => state.user);

  if (!movie) return null;

  const isFav = favorites.some((m) => m.id === movie.id);
  const isWatch = watchlist.some((m) => m.id === movie.id);

  const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : 'N/A';
  const rating = typeof movie.vote_average === 'number' ? movie.vote_average.toFixed(1) : 'NR';

  let primaryGenre = '';
  if (movie.genres && movie.genres.length > 0) {
    primaryGenre = movie.genres[0].name;
  } else if (movie.genre_ids && movie.genre_ids.length > 0) {
    primaryGenre = GENRE_MAP[movie.genre_ids[0]] || '';
  }

  const posterUrl = getPosterUrl(movie.poster_path, 'w500');

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleToggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (isFav) {
      dispatch(removeFavorite(movie.id));
    } else {
      dispatch(addFavorite(movie));
    }
  };

  const handleToggleWatchlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }

    if (isWatch) {
      dispatch(removeFromWatchlist(movie.id));
    } else {
      dispatch(addToWatchlist(movie));
    }
  };

  return (
    <StarBorder
      as="div"
      className="movie-card-star-container"
      color="#E50914"
      speed="3.5s"
      thickness={1}
      borderRadius="var(--radius-sm, 3px)"
      backgroundColor="var(--bg-card)"
      borderColor="var(--border)"
      hoverOnly={true}
    >
      <div
        className="movie-card-wrapper"
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
        aria-label={`View details for ${movie.title}`}
      >
        <div className="movie-poster-box">
          {posterUrl && !imgError ? (
            <img
              src={posterUrl}
              alt={movie.title}
              className="movie-poster-img"
              loading="lazy"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="w-100 h-100 d-flex flex-column align-items-center justify-content-center p-3 text-center" style={{ backgroundColor: '#11151e' }}>
              <Film size={34} strokeWidth={1.5} className="text-secondary opacity-50 mb-2" />
              <span className="small text-white fw-semibold text-truncate w-100">{movie.title}</span>
              <span className="text-secondary mt-1" style={{ fontSize: '0.72rem' }}>No Poster</span>
            </div>
          )}

          <div className="movie-card-rating">
            <Star size={12} fill="#ffc107" color="#ffc107" />
            <span>{rating}</span>
          </div>

          <div className="movie-card-actions">
            <button
              type="button"
              className={`card-action-btn ${isFav ? 'active' : ''}`}
              onClick={handleToggleFavorite}
              aria-label={isFav ? `Remove ${movie.title} from favorites` : `Add ${movie.title} to favorites`}
              title={isFav ? 'Remove Favorite' : 'Add to Favorites'}
            >
              <Heart size={15} fill={isFav ? '#E50914' : 'none'} color={isFav ? '#E50914' : 'currentColor'} />
            </button>
            <button
              type="button"
              className={`card-action-btn ${isWatch ? 'active' : ''}`}
              onClick={handleToggleWatchlist}
              aria-label={isWatch ? `Remove ${movie.title} from watchlist` : `Add ${movie.title} to watchlist`}
              title={isWatch ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <Bookmark size={15} fill={isWatch ? '#E50914' : 'none'} color={isWatch ? '#E50914' : 'currentColor'} />
            </button>
          </div>

          <div className="movie-card-hover-overlay">
            <span className="btn-cine-primary btn-sm d-inline-flex align-items-center gap-1">
              <Info size={14} /> Details
            </span>
          </div>
        </div>

        <div className="movie-card-info">
          <h3 className="movie-card-title" title={movie.title}>
            <ShinyText
              text={movie.title}
              disabled={!isHovered}
              color="#FFFFFF"
              shineColor="#E50914"
              speed={1.6}
              shineWidth={45}
              softness={0.7}
              glow={0}
              trigger="loop"
            />
          </h3>
          <div className="movie-card-meta">
            <span className="movie-year">{releaseYear}</span>
            {primaryGenre && (
              <>
                <span className="meta-dot">&bull;</span>
                <span className="movie-genre">{primaryGenre}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </StarBorder>
  );
}
