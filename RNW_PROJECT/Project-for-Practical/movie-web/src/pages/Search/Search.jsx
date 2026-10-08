import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Search as SearchIcon, X, TrendingUp } from 'lucide-react';
import { searchMovies, clearSearch, fetchTrendingMovies } from '../../redux/actions/movieActions';
import { useDebounce } from '../../hooks/useDebounce';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import EmptyState from '../../components/EmptyState/EmptyState';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import './Search.css';

const POPULAR_SEARCH_TERMS = [
  'Interstellar',
  'Dune',
  'Dark Knight',
  'Oppenheimer',
  'Deadpool',
  'Inception',
  'Avatar',
  'Spider-Man'
];

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(queryParam);

  const debouncedSearchTerm = useDebounce(searchTerm, 400);
  const dispatch = useDispatch();

  const { search, trending } = useSelector((state) => state.movies);

  useEffect(() => {
    if (!trending.data || trending.data.length === 0) {
      dispatch(fetchTrendingMovies());
    }
  }, [dispatch, trending.data]);

  useEffect(() => {
    const trimmed = debouncedSearchTerm.trim();
    if (trimmed.length >= 2) {
      setSearchParams({ q: trimmed }, { replace: true });
      dispatch(searchMovies(trimmed));
    } else if (trimmed.length === 0) {
      setSearchParams({}, { replace: true });
      dispatch(clearSearch());
    }
  }, [debouncedSearchTerm, dispatch, setSearchParams]);

  const handleClear = () => {
    setSearchTerm('');
    setSearchParams({}, { replace: true });
    dispatch(clearSearch());
  };

  const handleTagClick = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="search-page-container pb-5">
      <div className="container-fluid px-3 px-md-5">
        <div className="search-hero text-center mx-auto mb-4">
          <span className="badge-rating mb-2 d-inline-flex align-items-center gap-1">
            <SearchIcon size={13} /> Universal Finder
          </span>
          <h1 className="search-title mb-2">Search the Movie Vault</h1>
          <p className="text-secondary search-subtitle mb-4">
            Search titles, franchises, directors, and storylines across thousands of movies.
          </p>

          <div className="search-input-box position-relative mx-auto">
            <SearchIcon size={20} className="search-input-icon" />
            <input
              type="text"
              className="search-text-field"
              placeholder="Search by movie title or keyword (e.g. Interstellar, Batman)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              aria-label="Search movies"
            />
            {searchTerm && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={handleClear}
                aria-label="Clear search input"
                title="Clear input"
              >
                <X size={18} />
              </button>
            )}
          </div>

          <div className="d-flex flex-wrap align-items-center justify-content-center gap-2 mt-3 search-tags-row">
            <span className="text-secondary small me-1">Popular:</span>
            {POPULAR_SEARCH_TERMS.map((term) => (
              <button
                key={term}
                type="button"
                className={`search-tag-chip ${searchTerm === term ? 'active' : ''}`}
                onClick={() => handleTagClick(term)}
              >
                {term}
              </button>
            ))}
          </div>
        </div>

        {search.query && !search.loading && (
          <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
            <h2 className="fs-5 m-0 text-white">
              {search.totalResults || search.data.length} result
              {search.data.length === 1 ? '' : 's'} for &ldquo;
              <span className="text-danger">{search.query}</span>&rdquo;
            </h2>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary"
              onClick={handleClear}
            >
              Clear Results
            </button>
          </div>
        )}

        {search.error ? (
          <ErrorMessage
            title="Search query failed"
            message={search.error}
            onRetry={() => dispatch(searchMovies(searchTerm))}
          />
        ) : search.loading ? (
          <MovieGrid movies={[]} loading={true} skeletonCount={12} />
        ) : search.query && search.data.length === 0 ? (
          <EmptyState
            icon="search"
            title={`No results found for "${search.query}"`}
            description="We could not find any movies matching that query. Check spelling or try a different keyword."
            actionText="Clear Search"
            onActionClick={handleClear}
          />
        ) : search.data.length > 0 ? (
          <MovieGrid movies={search.data} loading={false} />
        ) : (
          <div className="search-explore-section mt-4">
            <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
              <div>
                <h2 className="fs-5 fw-bold text-white m-0 d-flex align-items-center gap-2">
                  <TrendingUp size={18} className="text-danger" /> Trending Movies Right Now
                </h2>
                <small className="text-secondary">Discover the most popular movies being watched today</small>
              </div>
            </div>
            <MovieGrid movies={trending.data || []} loading={trending.loading} skeletonCount={12} />
          </div>
        )}
      </div>
    </div>
  );
}
