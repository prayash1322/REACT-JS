import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from '../MovieCard/MovieCard';
import MovieCardSkeleton from '../Skeletons/MovieCardSkeleton';
import './MovieRow.css';

export default function MovieRow({
  title,
  subtitle,
  movies = [],
  loading = false,
  error = null,
  onRetry,
  viewAllLink
}) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = rowRef.current.clientWidth * 0.75;
      rowRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="movie-row-section">
      <div className="container-fluid px-3 px-md-5">
        <div className="movie-row-header d-flex align-items-center justify-content-between mb-3">
          <div>
            <h2 className="section-title">{title}</h2>
            {subtitle && <p className="section-subtitle text-secondary mb-0 mt-1">{subtitle}</p>}
          </div>

          <div className="d-flex align-items-center gap-2">
            {viewAllLink && (
              <Link to={viewAllLink} className="section-link me-2 d-none d-sm-inline-flex align-items-center gap-1">
                View All <ChevronRight size={15} />
              </Link>
            )}

            <div className="d-none d-md-flex gap-1">
              <button
                type="button"
                className="rail-arrow-btn"
                onClick={() => scroll('left')}
                aria-label={`Scroll ${title} left`}
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                className="rail-arrow-btn"
                onClick={() => scroll('right')}
                aria-label={`Scroll ${title} right`}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {error ? (
          <div className="alert alert-danger d-flex align-items-center justify-content-between p-3 rounded" role="alert">
            <span className="small">Unable to load {title.toLowerCase()}.</span>
            {onRetry && (
              <button type="button" className="btn btn-sm btn-outline-danger" onClick={onRetry}>
                Try again
              </button>
            )}
          </div>
        ) : (
          <div className="movie-row-scroller hide-scrollbar" ref={rowRef}>
            {loading ? (
              Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="movie-row-item">
                  <MovieCardSkeleton />
                </div>
              ))
            ) : movies && movies.length > 0 ? (
              movies.map((movie) => (
                <div key={movie.id} className="movie-row-item">
                  <MovieCard movie={movie} />
                </div>
              ))
            ) : (
              <div className="text-secondary small py-4">No titles currently available.</div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
