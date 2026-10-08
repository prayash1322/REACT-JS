import { useEffect, useState } from 'react';
import { Star, Play, Heart, Bookmark, Film } from 'lucide-react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchMovieDetails,
  fetchMovieCredits,
  fetchSimilarMovies,
  fetchMovieVideos
} from '../../redux/actions/movieActions';
import {
  addFavorite,
  removeFavorite,
  addToWatchlist,
  removeFromWatchlist
} from '../../redux/actions/userActions';
import { getPosterUrl, getBackdropUrl } from '../../utils/imageHelpers';
import CastList from '../../components/CastList/CastList';
import MovieRow from '../../components/MovieRow/MovieRow';
import MovieDetailsSkeleton from '../../components/Skeletons/MovieDetailsSkeleton';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import TrailerModal from '../../components/TrailerModal/TrailerModal';
import StarBorder from '../../components/StarBorder/StarBorder';
import './MovieDetails.css';

function MovieDetailsPoster({ posterPath, title }) {
  const [imgError, setImgError] = useState(false);
  const posterUrl = getPosterUrl(posterPath, 'w500');

  return (
    <div className="details-poster-box shadow-lg d-flex align-items-center justify-content-center" style={{ backgroundColor: '#11151e' }}>
      {posterUrl && !imgError ? (
        <img
          src={posterUrl}
          alt={title}
          className="details-poster-img"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="d-flex flex-column align-items-center justify-content-center p-4 text-center">
          <Film size={44} strokeWidth={1.5} className="text-secondary opacity-50 mb-2" />
          <span className="small text-secondary">No Poster</span>
        </div>
      )}
    </div>
  );
}

export default function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const [trailerOpen, setTrailerOpen] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { favorites = [], watchlist = [] } = useSelector((state) => state.user);
  const { selectedMovie, credits, similar, videos } = useSelector((state) => state.movies);

  useEffect(() => {
    if (id) {
      window.scrollTo(0, 0);
      dispatch(fetchMovieDetails(id));
      dispatch(fetchMovieCredits(id));
      dispatch(fetchSimilarMovies(id));
      dispatch(fetchMovieVideos(id));
    }
  }, [dispatch, id]);

  const movie = selectedMovie.data;
  const isFav = movie ? favorites.some((m) => m.id === movie.id) : false;
  const isWatch = movie ? watchlist.some((m) => m.id === movie.id) : false;

  const handleToggleFavorite = () => {
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

  const handleToggleWatchlist = () => {
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

  const trailerKey = videos.data?.find(
    (v) => (v.type === 'Trailer' || v.type === 'Teaser') && v.site === 'YouTube'
  )?.key || movie?.trailer_key || '';

  const formatRuntime = (mins) => {
    if (!mins) return null;
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return h > 0 ? `${h}h ${m}m` : `${m}m`;
  };

  const formatCurrency = (amount) => {
    if (!amount || amount <= 0) return null;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (selectedMovie.loading) {
    return <MovieDetailsSkeleton />;
  }

  if (selectedMovie.error || !movie) {
    return (
      <div className="container py-5 mt-5">
        <ErrorMessage
          title="Movie not found"
          message={selectedMovie.error || 'The requested movie information could not be retrieved.'}
          onRetry={() => dispatch(fetchMovieDetails(id))}
        />
      </div>
    );
  }

  const rating = typeof movie.vote_average === 'number' ? movie.vote_average.toFixed(1) : 'NR';
  const releaseYear = movie.release_date ? movie.release_date.substring(0, 4) : '';
  const runtimeFormatted = formatRuntime(movie.runtime);
  const formattedBudget = formatCurrency(movie.budget);
  const formattedRevenue = formatCurrency(movie.revenue);

  return (
    <div className="movie-details-page">
      <div
        className="details-hero-banner"
        style={{
          backgroundImage: `url(${getBackdropUrl(movie.backdrop_path, 'original')})`
        }}
      >
        <div className="details-hero-overlay"></div>

        <div className="container-fluid px-3 px-md-5 details-hero-content">
          <div className="row gy-4 align-items-end">
            <div className="col-12 col-md-4 col-lg-3">
              <MovieDetailsPoster key={movie.id} posterPath={movie.poster_path} title={movie.title} />
            </div>

            <div className="col-12 col-md-8 col-lg-9">
              <div className="details-header-info">
                <div className="d-flex flex-wrap align-items-center gap-2 mb-2">
                  <span className="badge-rating d-inline-flex align-items-center gap-1">
                    <Star size={13} fill="#ffc107" color="#ffc107" /> {rating} / 10
                  </span>
                  {releaseYear && <span className="badge-quality">{releaseYear}</span>}
                  {runtimeFormatted && <span className="badge-quality">{runtimeFormatted}</span>}
                  {movie.status && <span className="badge-quality">{movie.status}</span>}
                </div>

                <h1 className="details-title mb-1">{movie.title}</h1>
                {movie.tagline && <p className="details-tagline mb-3">{movie.tagline}</p>}

                {movie.genres && movie.genres.length > 0 && (
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    {movie.genres.map((g) => (
                      <span key={g.id} className="badge-genre">
                        {g.name}
                      </span>
                    ))}
                  </div>
                )}

                <div className="details-actions d-flex flex-wrap align-items-center gap-3 mt-4">
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
                    onClick={() => setTrailerOpen(true)}
                    disabled={!trailerKey}
                    aria-label="Watch movie trailer"
                  >
                    <span className="d-inline-flex align-items-center gap-2">
                      <Play size={18} fill="currentColor" /> Watch Trailer
                    </span>
                  </StarBorder>

                  <button
                    type="button"
                    className={`btn-cine-outline d-inline-flex align-items-center gap-2 ${isFav ? 'active' : ''}`}
                    onClick={handleToggleFavorite}
                    aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                  >
                    <Heart size={16} fill={isFav ? '#E50914' : 'none'} color={isFav ? '#E50914' : 'currentColor'} />
                    {isFav ? 'Favorited' : 'Add to Favorites'}
                  </button>

                  <button
                    type="button"
                    className={`btn-cine-outline d-inline-flex align-items-center gap-2 ${isWatch ? 'active' : ''}`}
                    onClick={handleToggleWatchlist}
                    aria-label={isWatch ? 'Remove from watchlist' : 'Add to watchlist'}
                  >
                    <Bookmark size={16} fill={isWatch ? '#E50914' : 'none'} color={isWatch ? '#E50914' : 'currentColor'} />
                    {isWatch ? 'In Watchlist' : 'Add to Watchlist'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid px-3 px-md-5 py-5">
        <div className="row gy-5">
          <div className="col-12 col-lg-8">
            <div className="details-section mb-5">
              <h2 className="section-title mb-3">Storyline</h2>
              <p className="details-overview-text text-secondary">
                {movie.overview || 'No storyline summary has been recorded for this film.'}
              </p>
            </div>

            <div className="details-section mb-5">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="section-title">Top Billed Cast</h2>
              </div>
              <CastList cast={credits.data} />
            </div>
          </div>

          <div className="col-12 col-lg-4">
            <div className="details-meta-sidebar p-4 rounded">
              <h3 className="fs-5 fw-bold text-white mb-3 border-bottom pb-2">
                Movie Information
              </h3>

              <div className="meta-info-list d-flex flex-column gap-3">
                {movie.release_date && (
                  <div className="meta-item">
                    <span className="text-secondary small d-block">Release Date</span>
                    <span className="fw-semibold">{movie.release_date}</span>
                  </div>
                )}

                {runtimeFormatted && (
                  <div className="meta-item">
                    <span className="text-secondary small d-block">Runtime</span>
                    <span className="fw-semibold">{runtimeFormatted}</span>
                  </div>
                )}

                {movie.spoken_languages && movie.spoken_languages.length > 0 && (
                  <div className="meta-item">
                    <span className="text-secondary small d-block">Spoken Languages</span>
                    <span className="fw-semibold">
                      {movie.spoken_languages.map((l) => l.english_name || l.name).join(', ')}
                    </span>
                  </div>
                )}

                {formattedBudget && (
                  <div className="meta-item">
                    <span className="text-secondary small d-block">Budget</span>
                    <span className="fw-semibold">{formattedBudget}</span>
                  </div>
                )}

                {formattedRevenue && (
                  <div className="meta-item">
                    <span className="text-secondary small d-block">Revenue</span>
                    <span className="fw-semibold">{formattedRevenue}</span>
                  </div>
                )}

                {movie.production_companies && movie.production_companies.length > 0 && (
                  <div className="meta-item">
                    <span className="text-secondary small d-block">Production</span>
                    <span className="fw-semibold">
                      {movie.production_companies.map((p) => p.name).join(', ')}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {similar.data && similar.data.length > 0 && (
        <div className="border-top pt-4">
          <MovieRow
            title="More Like This"
            subtitle="Titles sharing related genres, themes, or tones."
            movies={similar.data}
            loading={similar.loading}
          />
        </div>
      )}

      <TrailerModal
        isOpen={trailerOpen}
        trailerKey={trailerKey}
        movieTitle={movie.title}
        onClose={() => setTrailerOpen(false)}
      />
    </div>
  );
}
