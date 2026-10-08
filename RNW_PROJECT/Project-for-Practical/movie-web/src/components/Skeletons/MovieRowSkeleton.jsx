import MovieCardSkeleton from './MovieCardSkeleton';
import './Skeletons.css';

export default function MovieRowSkeleton({ count = 6 }) {
  return (
    <div className="py-3">
      <div className="container-fluid px-3 px-md-5">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <div className="skeleton-block" style={{ width: '180px', height: '24px' }}></div>
          <div className="skeleton-block" style={{ width: '80px', height: '18px' }}></div>
        </div>
        <div className="d-flex gap-3 overflow-hidden">
          {Array.from({ length: count }).map((_, i) => (
            <div key={i} className="movie-row-item">
              <MovieCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
