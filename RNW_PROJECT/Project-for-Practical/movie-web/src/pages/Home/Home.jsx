import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Heart, Bookmark, Search, Compass, Library } from 'lucide-react';
import {
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies
} from '../../redux/actions/movieActions';
import HeroCarousel from '../../components/Hero/HeroCarousel';
import HeroSkeleton from '../../components/Skeletons/HeroSkeleton';
import MovieRow from '../../components/MovieRow/MovieRow';
import StarBorder from '../../components/StarBorder/StarBorder';
import { MOVIE_GENRES } from '../../utils/constants';
import './Home.css';

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    popular,
    trending,
    upcoming,
    topRated,
    nowPlaying
  } = useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(fetchPopularMovies());
    dispatch(fetchTrendingMovies());
    dispatch(fetchUpcomingMovies());
    dispatch(fetchTopRatedMovies());
    dispatch(fetchNowPlayingMovies());
  }, [dispatch]);

  const handleGenreClick = (genreId) => {
    navigate(`/movies?genre=${genreId}`);
  };

  return (
    <div className="home-page-container">
      {popular.loading && !popular.data.length ? (
        <HeroSkeleton />
      ) : (
        <HeroCarousel movies={popular.data.length ? popular.data : trending.data} />
      )}

      <MovieRow
        title="Popular Right Now"
        subtitle="The most-watched films buzzing across cinemas worldwide."
        movies={popular.data}
        loading={popular.loading}
        error={popular.error}
        onRetry={() => dispatch(fetchPopularMovies())}
        viewAllLink="/movies?sort=popularity.desc"
      />

      <MovieRow
        title="Trending This Week"
        subtitle="Critically acclaimed and high-momentum titles gaining traction."
        movies={trending.data}
        loading={trending.loading}
        error={trending.error}
        onRetry={() => dispatch(fetchTrendingMovies())}
        viewAllLink="/movies?sort=popularity.desc"
      />

      <section className="home-genre-section py-5">
        <div className="container-fluid px-3 px-md-5">
          <div className="section-header mb-4">
            <div>
              <h2 className="section-title">Browse by Genre</h2>
              <p className="text-secondary section-subtitle m-0 mt-1">
                Filter titles according to your preferred cinematic taste and mood.
              </p>
            </div>
            <Link to="/movies" className="section-link d-none d-sm-inline-flex align-items-center gap-1">
              Explore All <ChevronRight size={15} />
            </Link>
          </div>

          <div className="genre-grid">
            {MOVIE_GENRES.map((genre) => (
              <div
                key={genre.id}
                className="genre-card"
                onClick={() => handleGenreClick(genre.id)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleGenreClick(genre.id)}
              >
                <div className="genre-card-body">
                  <span className="genre-card-name">{genre.name}</span>
                  <ArrowRight size={16} className="genre-card-icon" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <MovieRow
        title="In Theaters"
        subtitle="Currently playing on the big screen in cinemas right now."
        movies={nowPlaying.data}
        loading={nowPlaying.loading}
        error={nowPlaying.error}
        onRetry={() => dispatch(fetchNowPlayingMovies())}
        viewAllLink="/movies"
      />

      <MovieRow
        title="Top Rated"
        subtitle="Masterpieces and legendary cinematic classics voted by audiences."
        movies={topRated.data}
        loading={topRated.loading}
        error={topRated.error}
        onRetry={() => dispatch(fetchTopRatedMovies())}
        viewAllLink="/movies?rating=8"
      />

      <MovieRow
        title="Coming Soon"
        subtitle="Exciting upcoming releases to add directly to your watchlist."
        movies={upcoming.data}
        loading={upcoming.loading}
        error={upcoming.error}
        onRetry={() => dispatch(fetchUpcomingMovies())}
        viewAllLink="/movies"
      />

      <section className="personalization-section py-5">
        <div className="container-fluid px-3 px-md-5">
          <div className="personalization-card p-4 p-md-5">
            <div className="row align-items-center gy-4">
              <div className="col-12 col-lg-7">
                <span className="badge-rating mb-3 d-inline-flex align-items-center gap-1">
                  <Library size={14} /> Personal Library
                </span>
                <h2 className="personalization-title mb-3">
                  Save the movies you care about.
                </h2>
                <p className="personalization-desc text-secondary mb-4">
                  Keep favorites and watchlist items in one place and pick up where you left off.
                  Easily access curated films across your desktop and mobile devices anytime.
                </p>
                <div className="d-flex flex-wrap gap-3">
                  <StarBorder
                    as={Link}
                    to="/watchlist"
                    className="btn-star-cine"
                    color="#ffffff"
                    speed="3.5s"
                    thickness={1}
                    borderRadius="var(--radius-sm, 4px)"
                    backgroundColor="var(--accent)"
                    borderColor="var(--accent)"
                    textColor="#FFFFFF"
                    hoverOnly={true}
                  >
                    <span className="d-inline-flex align-items-center gap-2">
                      <Bookmark size={16} /> Open Watchlist
                    </span>
                  </StarBorder>

                  <StarBorder
                    as={Link}
                    to="/favorites"
                    className="btn-star-cine"
                    color="#ffffff"
                    speed="3.5s"
                    thickness={1}
                    borderRadius="var(--radius-sm, 4px)"
                    backgroundColor="rgba(255, 255, 255, 0.08)"
                    borderColor="var(--border)"
                    textColor="#FFFFFF"
                    hoverOnly={true}
                  >
                    <span className="d-inline-flex align-items-center gap-2">
                      <Heart size={16} /> View Favorites
                    </span>
                  </StarBorder>
                </div>
              </div>

              <div className="col-12 col-lg-5">
                <div className="features-mini-list d-flex flex-column gap-3">
                  <div className="feature-mini-item d-flex align-items-center gap-3 p-3">
                    <div className="feature-icon-box">
                      <Heart size={20} className="text-danger" fill="#E50914" />
                    </div>
                    <div>
                      <h4 className="m-0 fs-6 fw-bold">Instant Favorites</h4>
                      <small className="text-secondary">Bookmark movies you loved with a single tap.</small>
                    </div>
                  </div>

                  <div className="feature-mini-item d-flex align-items-center gap-3 p-3">
                    <div className="feature-icon-box">
                      <Bookmark size={20} className="text-warning" fill="#ffc107" />
                    </div>
                    <div>
                      <h4 className="m-0 fs-6 fw-bold">Organized Watchlist</h4>
                      <small className="text-secondary">Track titles you plan to watch during movie night.</small>
                    </div>
                  </div>

                  <div className="feature-mini-item d-flex align-items-center gap-3 p-3">
                    <div className="feature-icon-box">
                      <Search size={20} className="text-info" />
                    </div>
                    <div>
                      <h4 className="m-0 fs-6 fw-bold">Fast Live Search</h4>
                      <small className="text-secondary">Real-time filtering with debounced responses.</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="final-cta-section py-5 text-center">
        <div className="container">
          <div className="final-cta-box p-4 p-md-5">
            <h2 className="final-cta-title mb-3">Find something worth watching tonight.</h2>
            <p className="final-cta-text text-secondary mb-4 mx-auto">
              Dive into our complete catalog with genre filters, high-resolution backdrops,
              official trailers, and full cast listings.
            </p>
            <StarBorder
              as={Link}
              to="/movies"
              className="btn-star-cine mx-auto"
              color="#ffffff"
              speed="3.5s"
              thickness={1}
              borderRadius="var(--radius-sm, 4px)"
              backgroundColor="var(--accent)"
              borderColor="var(--accent)"
              textColor="#FFFFFF"
              hoverOnly={true}
            >
              <span className="d-inline-flex align-items-center gap-2 py-1 px-2">
                <Compass size={20} /> Explore Movies
              </span>
            </StarBorder>
          </div>
        </div>
      </section>
    </div>
  );
}
