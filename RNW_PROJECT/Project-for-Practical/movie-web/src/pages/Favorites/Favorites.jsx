import { useSelector } from 'react-redux';
import { Heart } from 'lucide-react';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import EmptyState from '../../components/EmptyState/EmptyState';
import './Favorites.css';

export default function Favorites() {
  const { favorites = [] } = useSelector((state) => state.user);

  return (
    <div className="favorites-page-container pb-5">
      <div className="container-fluid px-3 px-md-5">
        <div className="favorites-header mb-4">
          <span className="badge-rating mb-2 d-inline-flex align-items-center gap-1">
            <Heart size={13} className="text-danger" fill="#E50914" /> Personal Collection
          </span>
          <h1 className="favorites-title mb-2">Favorite Movies</h1>
          <p className="text-secondary favorites-subtitle mb-0">
            {favorites.length} film{favorites.length === 1 ? '' : 's'} saved to your library.
          </p>
        </div>

        {favorites.length === 0 ? (
          <EmptyState
            icon="heart"
            title="No favorites yet."
            description="Start exploring movies and save the ones you want to remember."
            actionText="Browse Movies"
            actionLink="/movies"
          />
        ) : (
          <MovieGrid movies={favorites} />
        )}
      </div>
    </div>
  );
}
