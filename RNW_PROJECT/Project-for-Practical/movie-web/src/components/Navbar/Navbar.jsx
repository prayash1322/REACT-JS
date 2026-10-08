import { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Film, Search, ChevronDown, Menu, X, Heart, Bookmark, User, LogOut, Home, Compass } from 'lucide-react';
import { logout } from '../../redux/actions/authActions';
import StarBorder from '../StarBorder/StarBorder';
import './Navbar.css';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { favorites = [], watchlist = [] } = useSelector((state) => state.user);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.user-profile-btn') && !e.target.closest('.profile-dropdown-menu')) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  const handleSignOut = () => {
    dispatch(logout());
    setProfileDropdownOpen(false);
    navigate('/');
  };

  return (
    <header className={`cine-navbar-wrapper ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container-fluid px-3 px-md-5">
        <nav className="cine-navbar d-flex align-items-center justify-content-between">
          <Link to="/" className="cine-brand d-flex align-items-center gap-2">
            <span className="brand-icon">
              <Film size={18} strokeWidth={2.2} />
            </span>
            <span className="brand-text">
              CINE<span className="brand-accent">VAULT</span>
            </span>
          </Link>

          <ul className="cine-nav-links d-none d-lg-flex align-items-center m-0 p-0">
            <li>
              <NavLink to="/" end className={({ isActive }) => `cine-nav-link ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies" className={({ isActive }) => `cine-nav-link ${isActive ? 'active' : ''}`}>
                Movies
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" className={({ isActive }) => `cine-nav-link ${isActive ? 'active' : ''}`}>
                Search
              </NavLink>
            </li>
            <li>
              <NavLink to="/favorites" className={({ isActive }) => `cine-nav-link ${isActive ? 'active' : ''}`}>
                Favorites
                {favorites.length > 0 && <span className="nav-counter">{favorites.length}</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/watchlist" className={({ isActive }) => `cine-nav-link ${isActive ? 'active' : ''}`}>
                Watchlist
                {watchlist.length > 0 && <span className="nav-counter">{watchlist.length}</span>}
              </NavLink>
            </li>
          </ul>

          <div className="cine-nav-actions d-none d-lg-flex align-items-center gap-3">
            <Link to="/search" className="btn-cine-icon" aria-label="Search movies">
              <Search size={16} />
            </Link>

            {isAuthenticated ? (
              <div className="position-relative">
                <button
                  type="button"
                  className="user-profile-btn d-flex align-items-center gap-2"
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  aria-expanded={profileDropdownOpen}
                  aria-label="User profile options"
                >
                  <div
                    className="user-avatar rounded-circle d-flex align-items-center justify-content-center text-white fw-bold"
                    style={{ width: '32px', height: '32px', backgroundColor: '#E50914', fontSize: '0.85rem' }}
                  >
                    {user?.name ? user.name.charAt(0).toUpperCase() : <User size={15} />}
                  </div>
                  <span className="user-name d-none d-xl-inline">{user?.name?.split(' ')[0] || 'Profile'}</span>
                  <ChevronDown size={14} className={`toggle-arrow ${profileDropdownOpen ? 'open' : ''}`} />
                </button>

                {profileDropdownOpen && (
                  <div className="profile-dropdown-menu fade-in">
                    <div className="dropdown-user-header px-3 py-2 border-bottom">
                      <p className="m-0 fw-bold text-truncate">{user?.name || 'Explorer'}</p>
                      <small className="text-secondary text-truncate d-block">{user?.email}</small>
                    </div>
                    <Link to="/profile" className="dropdown-item-link" onClick={() => setProfileDropdownOpen(false)}>
                      <User size={15} className="me-2" /> My Profile
                    </Link>
                    <Link to="/favorites" className="dropdown-item-link" onClick={() => setProfileDropdownOpen(false)}>
                      <Heart size={15} className="me-2" /> Saved Favorites
                    </Link>
                    <Link to="/watchlist" className="dropdown-item-link" onClick={() => setProfileDropdownOpen(false)}>
                      <Bookmark size={15} className="me-2" /> My Watchlist
                    </Link>
                    <div className="dropdown-divider"></div>
                    <button type="button" className="dropdown-item-link text-danger w-100 text-start border-0 bg-transparent" onClick={handleSignOut}>
                      <LogOut size={15} className="me-2" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <StarBorder
                as={Link}
                to="/login"
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
                <span className="d-inline-flex align-items-center gap-1" style={{ padding: '0.25rem 0.65rem' }}>
                  <User size={14} /> Sign In
                </span>
              </StarBorder>
            )}
          </div>

          <div className="d-flex align-items-center gap-2 d-lg-none">
            <Link to="/search" className="btn-cine-icon" aria-label="Search">
              <Search size={16} />
            </Link>
            <button
              type="button"
              className="cine-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {mobileMenuOpen && (
        <div className="cine-mobile-drawer fade-in">
          <ul className="mobile-nav-list p-0 m-0">
            <li>
              <NavLink to="/" end className="mobile-nav-link d-flex align-items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Home size={18} /> Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/movies" className="mobile-nav-link d-flex align-items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Compass size={18} /> Movies Catalog
              </NavLink>
            </li>
            <li>
              <NavLink to="/search" className="mobile-nav-link d-flex align-items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Search size={18} /> Search
              </NavLink>
            </li>
            <li>
              <NavLink to="/favorites" className="mobile-nav-link d-flex align-items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Heart size={18} /> Favorites
                {favorites.length > 0 && <span className="nav-counter ms-auto">{favorites.length}</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/watchlist" className="mobile-nav-link d-flex align-items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Bookmark size={18} /> Watchlist
                {watchlist.length > 0 && <span className="nav-counter ms-auto">{watchlist.length}</span>}
              </NavLink>
            </li>
          </ul>

          <div className="mobile-drawer-auth mt-3 pt-3 border-top">
            {isAuthenticated ? (
              <div className="d-flex flex-column gap-2">
                <Link to="/profile" className="mobile-nav-link d-flex align-items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <User size={18} /> Profile ({user?.name})
                </Link>
                <button
                  type="button"
                  className="btn btn-outline-danger w-100 text-start mt-2 d-flex align-items-center justify-content-center gap-2"
                  onClick={handleSignOut}
                >
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            ) : (
              <Link to="/login" className="btn-cine-primary w-100 justify-content-center d-flex align-items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <User size={16} /> Sign In to Account
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
