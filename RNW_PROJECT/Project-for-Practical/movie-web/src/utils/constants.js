export const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p';
export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY || '';

export const STORAGE_KEYS = {
  AUTH: 'cinevault_auth',
  FAVORITES: 'cinevault_favorites',
  WATCHLIST: 'cinevault_watchlist'
};

export const DEMO_CREDENTIALS = {
  email: 'demo@cinevault.io',
  password: 'password123',
  name: 'Alex Mercer'
};

export const MOVIE_GENRES = [
  { id: 28, name: 'Action' },
  { id: 12, name: 'Adventure' },
  { id: 16, name: 'Animation' },
  { id: 35, name: 'Comedy' },
  { id: 80, name: 'Crime' },
  { id: 18, name: 'Drama' },
  { id: 27, name: 'Horror' },
  { id: 10749, name: 'Romance' },
  { id: 878, name: 'Science Fiction' },
  { id: 53, name: 'Thriller' }
];

export const GENRE_MAP = MOVIE_GENRES.reduce((acc, curr) => {
  acc[curr.id] = curr.name;
  return acc;
}, {});
