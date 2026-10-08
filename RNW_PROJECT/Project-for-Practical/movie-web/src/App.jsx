import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { restoreAuth } from './redux/actions/authActions';
import { loadFavorites, loadWatchlist } from './redux/actions/userActions';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import DevKeyNotice from './components/DevKeyNotice/DevKeyNotice';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import Home from './pages/Home/Home';
import Movies from './pages/Movies/Movies';
import Search from './pages/Search/Search';
import MovieDetails from './pages/MovieDetails/MovieDetails';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Favorites from './pages/Favorites/Favorites';
import Watchlist from './pages/Watchlist/Watchlist';
import NotFound from './pages/NotFound/NotFound';

import './App.css';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreAuth());
    dispatch(loadFavorites());
    dispatch(loadWatchlist());
  }, [dispatch]);

  return (
    <Router>
      <ScrollToTop />
      <DevKeyNotice />
      <Navbar />

      <main className="cine-main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/search" element={<Search />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/login" element={<Login />} />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <Favorites />
              </ProtectedRoute>
            }
          />
          <Route
            path="/watchlist"
            element={
              <ProtectedRoute>
                <Watchlist />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </Router>
  );
}
