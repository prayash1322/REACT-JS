import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Play, Info, Bookmark, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { addToWatchlist, removeFromWatchlist } from '../../redux/actions/userActions';
import { getBackdropUrl } from '../../utils/imageHelpers';
import { GENRE_MAP } from '../../utils/constants';
import TrailerModal from '../TrailerModal/TrailerModal';
import StarBorder from '../StarBorder/StarBorder';
import './HeroCarousel.css';

export default function HeroCarousel({ movies = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [activeTrailerMovie, setActiveTrailerMovie] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { watchlist = [] } = useSelector((state) => state.user);

  const featured = movies && movies.length > 0 ? movies.slice(0, 5) : [];

  useEffect(() => {
    if (featured.length <= 1 || trailerOpen) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 7000);

    return () => clearInterval(timer);
  }, [featured.length, trailerOpen]);

  if (featured.length === 0) return null;

  const currentMovie = featured[currentIndex];
  const isInWatchlist = watchlist.some((m) => m.id === currentMovie.id);

  const releaseYear = currentMovie.release_date
    ? currentMovie.release_date.substring(0, 4)
    : '';
  const rating = typeof currentMovie.vote_average === 'number'
    ? currentMovie.vote_average.toFixed(1)
    : 'NR';

  const genreNames = (currentMovie.genre_ids || [])
    .slice(0, 3)
    .map((id) => GENRE_MAP[id])
    .filter(Boolean);

  const handleToggleWatchlist = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location.pathname } });
      return;
    }
    if (isInWatchlist) {
      dispatch(removeFromWatchlist(currentMovie.id));
    } else {
      dispatch(addToWatchlist(currentMovie));
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? featured.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featured.length);
  };

  const handleWatchTrailer = () => {
    setActiveTrailerMovie(currentMovie);
    setTrailerOpen(true);
  };

  const handleCloseTrailer = () => {
    setTrailerOpen(false);
    setActiveTrailerMovie(null);
  };

  return (
    <div className="hero-carousel-wrapper">
      <div
        className="hero-backdrop"
        style={{
          backgroundImage: `url(${getBackdropUrl(currentMovie.backdrop_path, 'original') || ''})`
        }}
      >
        <div className="hero-gradient-overlay"></div>
      </div>

      <div className="container-fluid px-3 px-md-5 hero-content-container">
        <div className="hero-content">
          <div className="hero-meta-row d-flex flex-wrap align-items-center gap-2 mb-3">
            <span className="badge-rating d-inline-flex align-items-center gap-1">
              <Star size={13} fill="#ffc107" color="#ffc107" /> {rating}
            </span>
            {releaseYear && <span className="badge-quality">{releaseYear}</span>}
            <span className="badge-quality">HD</span>
            {genreNames.map((name) => (
              <span key={name} className="hero-genre-tag">
                {name}
              </span>
            ))}
          </div>

          <h1 className="hero-title mb-3">{currentMovie.title}</h1>

          <p className="hero-overview mb-4 text-secondary">
            {currentMovie.overview || 'Explore details, trailers, and more for this featured cinematic title.'}
          </p>

          <div className="hero-actions d-flex flex-wrap align-items-center gap-3">
            <StarBorder
              as="button"
              type="button"
              className="btn-star-cine"
              color="#ffffff"
              speed="3.5s"
              thickness={1}
              borderRadius="var(--radius-sm, 4px)"
              backgroundColor="var(--accent)"
              borderColor="var(--accent)"
              textColor="#FFFFFF"
              hoverOnly={true}
              onClick={handleWatchTrailer}
              aria-label="Watch movie trailer"
            >
              <span className="d-inline-flex align-items-center gap-2">
                <Play size={18} fill="currentColor" /> Watch Trailer
              </span>
            </StarBorder>

            <StarBorder
              as="button"
              type="button"
              className="btn-star-cine"
              color="#ffffff"
              speed="3.5s"
              thickness={1}
              borderRadius="var(--radius-sm, 4px)"
              backgroundColor="rgba(255, 255, 255, 0.1)"
              borderColor="var(--border)"
              textColor="#FFFFFF"
              hoverOnly={true}
              onClick={() => navigate(`/movie/${currentMovie.id}`)}
              aria-label="View movie details"
            >
              <span className="d-inline-flex align-items-center gap-2">
                <Info size={18} /> View Details
              </span>
            </StarBorder>

            <button
              type="button"
              className={`btn-cine-icon ${isInWatchlist ? 'active' : ''}`}
              onClick={handleToggleWatchlist}
              aria-label={isInWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
              title={isInWatchlist ? 'In Watchlist' : 'Add to Watchlist'}
            >
              <Bookmark size={18} fill={isInWatchlist ? '#E50914' : 'none'} color={isInWatchlist ? '#E50914' : 'currentColor'} />
            </button>
          </div>
        </div>
      </div>

      <div className="hero-nav-controls d-none d-md-flex align-items-center gap-2">
        <button
          type="button"
          className="hero-arrow-btn"
          onClick={handlePrev}
          aria-label="Previous featured movie"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          type="button"
          className="hero-arrow-btn"
          onClick={handleNext}
          aria-label="Next featured movie"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="hero-indicators">
        {featured.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            className={`hero-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

      <TrailerModal
        isOpen={trailerOpen}
        trailerKey={activeTrailerMovie?.trailer_key || 'zSWdZVtXT7E'}
        movieTitle={activeTrailerMovie?.title}
        onClose={handleCloseTrailer}
      />
    </div>
  );
}
