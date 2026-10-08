import { useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Film, ArrowDownCircle, Calendar, Star, ArrowUpDown, RotateCcw, X } from 'lucide-react';
import { fetchDiscoverMovies } from '../../redux/actions/movieActions';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import GenreFilter from '../../components/GenreFilter/GenreFilter';
import EmptyState from '../../components/EmptyState/EmptyState';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { GENRE_MAP } from '../../utils/constants';
import './Movies.css';

const YEARS = ['2026', '2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2015', '2010', '2000'];
const RATINGS = [
  { label: 'Any Rating', value: '' },
  { label: '8+ Masterpieces', value: '8' },
  { label: '7+ Great', value: '7' },
  { label: '6+ Good', value: '6' },
  { label: '5+ Mixed', value: '5' }
];

export default function Movies() {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();

  const { discover } = useSelector((state) => state.movies);

  const selectedGenre = searchParams.get('genre') || '';
  const selectedYear = searchParams.get('year') || '';
  const selectedRating = searchParams.get('rating') || '';
  const selectedSort = searchParams.get('sort') || 'popularity.desc';

  const filters = useMemo(() => {
    const params = {
      sort_by: selectedSort
    };
    if (selectedGenre) params.with_genres = selectedGenre;
    if (selectedYear) params.primary_release_year = selectedYear;
    if (selectedRating) params['vote_average.gte'] = selectedRating;
    return params;
  }, [selectedGenre, selectedYear, selectedRating, selectedSort]);

  useEffect(() => {
    dispatch(fetchDiscoverMovies(filters, 1));
  }, [dispatch, filters]);

  const updateParam = (key, value) => {
    const updated = new URLSearchParams(searchParams);
    if (value) {
      updated.set(key, value);
    } else {
      updated.delete(key);
    }
    setSearchParams(updated);
  };

  const handleClearFilters = () => {
    setSearchParams({});
  };

  const handleLoadMore = () => {
    if (discover.page < discover.totalPages && !discover.loading) {
      dispatch(fetchDiscoverMovies(filters, discover.page + 1));
    }
  };

  const hasActiveFilters = Boolean(selectedGenre || selectedYear || selectedRating || (selectedSort && selectedSort !== 'popularity.desc'));

  const activeGenreName = selectedGenre ? (GENRE_MAP[Number(selectedGenre)] || 'Genre') : '';

  return (
    <div className="movies-catalog-page pb-5">
      <div className="container-fluid px-3 px-md-5">
        <div className="catalog-header mb-4">
          <span className="badge-rating mb-2 d-inline-flex align-items-center gap-1">
            <Film size={14} /> Full Catalog
          </span>
          <h1 className="catalog-title mb-2">Explore Cinema</h1>
          <p className="text-secondary catalog-subtitle mb-0">
            Discover films tailored by genre, release timeframe, audience rating, and popularity.
          </p>
        </div>

        <div className="catalog-genre-rail-container mb-4">
          <div className="d-flex align-items-center justify-content-between mb-2">
            <span className="small text-secondary fw-semibold text-uppercase tracking-wider">
              Browse Categories
            </span>
            {selectedGenre && (
              <button
                type="button"
                className="btn btn-sm btn-link text-secondary text-decoration-none p-0 small"
                onClick={() => updateParam('genre', '')}
              >
                Clear Category
              </button>
            )}
          </div>
          <GenreFilter
            selectedGenre={selectedGenre}
            onSelectGenre={(gId) => updateParam('genre', gId || '')}
          />
        </div>

        <div className="catalog-filter-bar p-3 p-md-4 mb-4 rounded">
          <div className="row g-3 align-items-end">
            <div className="col-12 col-sm-6 col-md-3">
              <label htmlFor="filter-year" className="form-label text-secondary small mb-1 d-flex align-items-center gap-1">
                <Calendar size={13} /> Release Year
              </label>
              <select
                id="filter-year"
                className="cine-select w-100"
                value={selectedYear}
                onChange={(e) => updateParam('year', e.target.value)}
              >
                <option value="">Any Year</option>
                {YEARS.map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <label htmlFor="filter-rating" className="form-label text-secondary small mb-1 d-flex align-items-center gap-1">
                <Star size={13} /> Minimum Rating
              </label>
              <select
                id="filter-rating"
                className="cine-select w-100"
                value={selectedRating}
                onChange={(e) => updateParam('rating', e.target.value)}
              >
                {RATINGS.map((r) => (
                  <option key={r.value} value={r.value}>
                    {r.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-12 col-sm-6 col-md-3">
              <label htmlFor="filter-sort" className="form-label text-secondary small mb-1 d-flex align-items-center gap-1">
                <ArrowUpDown size={13} /> Sort By
              </label>
              <select
                id="filter-sort"
                className="cine-select w-100"
                value={selectedSort}
                onChange={(e) => updateParam('sort', e.target.value)}
              >
                <option value="popularity.desc">Most Popular</option>
                <option value="vote_average.desc">Highest Rated</option>
                <option value="primary_release_date.desc">Newest First</option>
              </select>
            </div>

            <div className="col-12 col-sm-6 col-md-3 d-flex align-items-center justify-content-between justify-content-md-end gap-2">
              {hasActiveFilters && (
                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger py-2 px-3 d-inline-flex align-items-center gap-1"
                  onClick={handleClearFilters}
                  title="Reset all filters"
                >
                  <RotateCcw size={14} /> Reset
                </button>
              )}
              <div className="badge-quality py-2 px-3">
                {discover.loading ? 'Updating...' : `${discover.data?.length || 0} Titles`}
              </div>
            </div>
          </div>

          {hasActiveFilters && (
            <div className="active-filters-strip mt-3 pt-3 border-top border-secondary border-opacity-25 d-flex flex-wrap align-items-center gap-2">
              <span className="small text-secondary me-1">Active filters:</span>
              {selectedGenre && (
                <span className="active-filter-chip">
                  Genre: {activeGenreName}
                  <button
                    type="button"
                    onClick={() => updateParam('genre', '')}
                    aria-label="Remove genre filter"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {selectedYear && (
                <span className="active-filter-chip">
                  Year: {selectedYear}
                  <button
                    type="button"
                    onClick={() => updateParam('year', '')}
                    aria-label="Remove year filter"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {selectedRating && (
                <span className="active-filter-chip">
                  Rating: {selectedRating}+
                  <button
                    type="button"
                    onClick={() => updateParam('rating', '')}
                    aria-label="Remove rating filter"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
              {selectedSort !== 'popularity.desc' && (
                <span className="active-filter-chip">
                  Sorted: {selectedSort === 'vote_average.desc' ? 'Highest Rated' : 'Newest First'}
                  <button
                    type="button"
                    onClick={() => updateParam('sort', 'popularity.desc')}
                    aria-label="Reset sort order"
                  >
                    <X size={12} />
                  </button>
                </span>
              )}
            </div>
          )}
        </div>

        {discover.error ? (
          <ErrorMessage
            title="Failed to load movies"
            message={discover.error}
            onRetry={() => dispatch(fetchDiscoverMovies(filters, 1))}
          />
        ) : !discover.loading && (!discover.data || discover.data.length === 0) ? (
          <EmptyState
            icon="compass"
            title="No matching movies found"
            description="We could not find any titles matching your selected filters. Try broadening your criteria."
            actionText="Clear Filters"
            onActionClick={handleClearFilters}
          />
        ) : (
          <>
            <MovieGrid movies={discover.data} loading={discover.loading} skeletonCount={12} />

            {discover.page < discover.totalPages && (
              <div className="text-center mt-5">
                <button
                  type="button"
                  className="btn-cine-secondary px-4 py-2 d-inline-flex align-items-center gap-2"
                  onClick={handleLoadMore}
                  disabled={discover.loading}
                >
                  {discover.loading ? (
                    <>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                      Loading...
                    </>
                  ) : (
                    <>
                      <ArrowDownCircle size={18} /> Load More Titles
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
