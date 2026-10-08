import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { User, LogOut, Heart, Bookmark, Compass, ChevronRight } from 'lucide-react';
import { logout } from '../../redux/actions/authActions';
import './Profile.css';

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { favorites = [], watchlist = [] } = useSelector((state) => state.user);

  const handleSignOut = () => {
    dispatch(logout());
    navigate('/');
  };

  const initial = user?.name ? user.name.charAt(0).toUpperCase() : null;

  return (
    <div className="profile-page-container pb-5">
      <div className="container px-3 px-md-5">
        <div className="profile-card-wrapper p-4 p-md-5 mx-auto">
          <div className="d-flex flex-column flex-sm-row align-items-center gap-4 border-bottom pb-4 mb-4">
            <div
              className="profile-large-avatar rounded-circle d-flex align-items-center justify-content-center text-white fw-bold fs-2 flex-shrink-0 shadow-sm"
              style={{ width: '84px', height: '84px', backgroundColor: '#E50914' }}
            >
              {initial || <User size={40} />}
            </div>
            <div className="text-center text-sm-start flex-grow-1">
              <span className="badge-rating mb-2">Member</span>
              <h1 className="profile-user-name mb-1">{user?.name || 'Cinema Explorer'}</h1>
              <p className="text-secondary small mb-1">{user?.email}</p>
              <span className="text-secondary opacity-75 small">
                Account Active &bull; Joined {user?.joinedDate || 'Recently'}
              </span>
            </div>
            <button
              type="button"
              className="btn btn-outline-danger btn-sm d-inline-flex align-items-center gap-1"
              onClick={handleSignOut}
            >
              <LogOut size={14} /> Sign Out
            </button>
          </div>

          <div className="row g-3 mb-4">
            <div className="col-12 col-sm-6">
              <div className="profile-stat-box p-3 rounded d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-secondary small d-block">Saved Favorites</span>
                  <span className="fs-3 fw-bold text-white">{favorites.length}</span>
                </div>
                <div className="stat-icon-circle text-danger d-flex align-items-center justify-content-center">
                  <Heart size={20} fill="#E50914" color="#E50914" />
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6">
              <div className="profile-stat-box p-3 rounded d-flex align-items-center justify-content-between">
                <div>
                  <span className="text-secondary small d-block">Watchlist Titles</span>
                  <span className="fs-3 fw-bold text-white">{watchlist.length}</span>
                </div>
                <div className="stat-icon-circle text-warning d-flex align-items-center justify-content-center">
                  <Bookmark size={20} fill="#ffc107" color="#ffc107" />
                </div>
              </div>
            </div>
          </div>

          <div className="profile-actions-grid d-flex flex-column gap-3">
            <Link to="/favorites" className="profile-action-link p-3 rounded d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <Heart size={22} className="text-danger" />
                <div>
                  <h3 className="fs-6 fw-bold m-0 text-white">Browse Favorite Movies</h3>
                  <small className="text-secondary">View all the titles you have favorited</small>
                </div>
              </div>
              <ChevronRight size={18} className="text-secondary" />
            </Link>

            <Link to="/watchlist" className="profile-action-link p-3 rounded d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <Bookmark size={22} className="text-warning" />
                <div>
                  <h3 className="fs-6 fw-bold m-0 text-white">Browse Watchlist</h3>
                  <small className="text-secondary">View movies planned for upcoming streaming</small>
                </div>
              </div>
              <ChevronRight size={18} className="text-secondary" />
            </Link>

            <Link to="/movies" className="profile-action-link p-3 rounded d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <Compass size={22} className="text-info" />
                <div>
                  <h3 className="fs-6 fw-bold m-0 text-white">Explore Movies Catalog</h3>
                  <small className="text-secondary">Discover trending releases and apply filters</small>
                </div>
              </div>
              <ChevronRight size={18} className="text-secondary" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
