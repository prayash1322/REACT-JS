import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Film, AlertCircle } from 'lucide-react';
import { login } from '../../redux/actions/authActions';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const from = location.state?.from || '/profile';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(login(email, password, rememberMe));
    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="login-page-container d-flex align-items-center justify-content-center">
      <div className="login-card-box p-4 p-md-5">
        <div className="text-center mb-4">
          <Link to="/" className="cine-brand d-inline-flex align-items-center gap-2 mb-2">
            <span className="brand-icon">
              <Film size={18} strokeWidth={2.2} />
            </span>
            <span className="brand-text">
              CINE<span className="brand-accent">VAULT</span>
            </span>
          </Link>
          <h1 className="fs-4 fw-bold text-white mb-1">Welcome Back</h1>
          <p className="text-secondary small mb-0">
            Sign in to access your personal watchlist and saved favorite movies.
          </p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small d-flex align-items-center gap-2" role="alert">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="login-email" className="form-label text-secondary small">Email Address</label>
            <div className="position-relative">
              <input
                id="login-email"
                type="email"
                className="cine-input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="login-password" className="form-label text-secondary small">Password</label>
            <div className="position-relative">
              <input
                id="login-password"
                type="password"
                className="cine-input"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="d-flex align-items-center justify-content-between mb-4">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="rememberCheck"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label className="form-check-label text-secondary small" htmlFor="rememberCheck">
                Remember me
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="btn-cine-primary w-100 justify-content-center py-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Signing In...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="text-center mt-4 pt-3 border-top border-secondary border-opacity-25">
          <p className="text-secondary small m-0">
            Looking for films without an account?{' '}
            <Link to="/movies" className="text-white fw-semibold hover-text-danger">
              Browse Catalog
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
