import MovieCard from '../MovieCard/MovieCard';
import MovieCardSkeleton from '../Skeletons/MovieCardSkeleton';
import './MovieGrid.css';

export default function MovieGrid({ movies = [], loading = false, skeletonCount = 12 }) {
  if (loading && (!movies || movies.length === 0)) {
    return (
      <div className="cine-movie-grid">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div key={`skel-${index}`} className="cine-grid-item">
            <MovieCardSkeleton />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="cine-movie-grid">
      {movies.map((movie) => (
        <div key={movie.id} className="cine-grid-item">
          <MovieCard movie={movie} />
        </div>
      ))}
    </div>
  );
}
