import { useSelector } from 'react-redux';
import { Bookmark } from 'lucide-react';
import MovieGrid from '../../components/MovieGrid/MovieGrid';
import EmptyState from '../../components/EmptyState/EmptyState';
import './Watchlist.css';

export default function Watchlist() {
  const { watchlist = [] } = useSelector((state) => state.user);

  return (
    <div className="watchlist-page-container pb-5">
      <div className="container-fluid px-3 px-md-5">
        <div className="watchlist-header mb-4">
          <span className="badge-rating mb-2 d-inline-flex align-items-center gap-1">
            <Bookmark size={13} className="text-warning" fill="#ffc107" /> Queue
          </span>
          <h1 className="watchlist-title mb-2">My Watchlist</h1>
          <p className="text-secondary watchlist-subtitle mb-0">
            {watchlist.length} film{watchlist.length === 1 ? '' : 's'} queued for upcoming viewing.
          </p>
        </div>

        {watchlist.length === 0 ? (
          <EmptyState
            icon="bookmark"
            title="Your watchlist is empty."
            description="Save movies here and come back when you're ready to watch them."
            actionText="Browse Movies"
            actionLink="/movies"
          />
        ) : (
          <MovieGrid movies={watchlist} />
        )}
      </div>
    </div>
  );
}
