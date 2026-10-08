import axios from 'axios';
import { TMDB_BASE_URL, TMDB_API_KEY } from '../utils/constants';
import { MOCK_MOVIES, getMockCastForMovie } from './mockData';

const apiClient = axios.create({
  baseURL: TMDB_BASE_URL,
  timeout: 3500
});

apiClient.interceptors.request.use((config) => {
  if (TMDB_API_KEY) {
    if (TMDB_API_KEY.startsWith('eyJ')) {
      config.headers.Authorization = `Bearer ${TMDB_API_KEY}`;
    } else {
      config.params = {
        ...config.params,
        api_key: TMDB_API_KEY
      };
    }
  }
  return config;
});

const isKeyConfigured = () => {
  return Boolean(TMDB_API_KEY && TMDB_API_KEY.trim() && TMDB_API_KEY !== 'your_key_here');
};

const mockResponse = (results, page = 1, total_pages = 1) => ({
  page,
  results,
  total_results: results.length,
  total_pages
});

const filterMockCatalog = (filters = {}, page = 1) => {
  let filtered = [...MOCK_MOVIES];
  if (filters.with_genres) {
    const genreId = Number(filters.with_genres);
    filtered = filtered.filter((m) => m.genre_ids?.includes(genreId));
  }
  if (filters.primary_release_year) {
    const year = String(filters.primary_release_year);
    filtered = filtered.filter((m) => m.release_date?.startsWith(year));
  }
  if (filters['vote_average.gte']) {
    const minRating = Number(filters['vote_average.gte']);
    filtered = filtered.filter((m) => m.vote_average >= minRating);
  }
  if (filters.sort_by) {
    if (filters.sort_by.includes('vote_average')) {
      filtered.sort((a, b) => b.vote_average - a.vote_average);
    } else if (filters.sort_by.includes('primary_release_date')) {
      filtered.sort((a, b) => (b.release_date || '').localeCompare(a.release_date || ''));
    } else {
      filtered.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }
  }
  return mockResponse(filtered, page, 1);
};

export const tmdbApi = {
  isConfigured: isKeyConfigured,

  getPopularMovies: async (page = 1) => {
    if (!isKeyConfigured()) {
      return mockResponse(MOCK_MOVIES, page);
    }
    try {
      const response = await apiClient.get('/movie/popular', { params: { page } });
      return response.data;
    } catch {
      return mockResponse(MOCK_MOVIES, page);
    }
  },

  getTrendingMovies: async (timeWindow = 'week', page = 1) => {
    if (!isKeyConfigured()) {
      return mockResponse([...MOCK_MOVIES].reverse(), page);
    }
    try {
      const response = await apiClient.get(`/trending/movie/${timeWindow}`, { params: { page } });
      return response.data;
    } catch {
      return mockResponse([...MOCK_MOVIES].reverse(), page);
    }
  },

  getUpcomingMovies: async (page = 1) => {
    if (!isKeyConfigured()) {
      const upcoming = MOCK_MOVIES.filter((_, idx) => idx % 2 === 0);
      return mockResponse(upcoming.length ? upcoming : MOCK_MOVIES, page);
    }
    try {
      const response = await apiClient.get('/movie/upcoming', { params: { page } });
      return response.data;
    } catch {
      return mockResponse(MOCK_MOVIES, page);
    }
  },

  getTopRatedMovies: async (page = 1) => {
    if (!isKeyConfigured()) {
      const topRated = [...MOCK_MOVIES].sort((a, b) => b.vote_average - a.vote_average);
      return mockResponse(topRated, page);
    }
    try {
      const response = await apiClient.get('/movie/top_rated', { params: { page } });
      return response.data;
    } catch {
      return mockResponse(MOCK_MOVIES, page);
    }
  },

  getNowPlayingMovies: async (page = 1) => {
    if (!isKeyConfigured()) {
      const nowPlaying = MOCK_MOVIES.filter((_, idx) => idx % 2 === 1);
      return mockResponse(nowPlaying.length ? nowPlaying : MOCK_MOVIES, page);
    }
    try {
      const response = await apiClient.get('/movie/now_playing', { params: { page } });
      return response.data;
    } catch {
      return mockResponse(MOCK_MOVIES, page);
    }
  },

  discoverMovies: async (filters = {}, page = 1) => {
    if (!isKeyConfigured()) {
      return filterMockCatalog(filters, page);
    }
    try {
      const response = await apiClient.get('/discover/movie', {
        params: {
          page,
          include_adult: false,
          sort_by: filters.sort_by || 'popularity.desc',
          ...filters
        }
      });
      return response.data;
    } catch {
      return filterMockCatalog(filters, page);
    }
  },

  searchMovies: async (query, page = 1) => {
    if (!query || !query.trim()) {
      return mockResponse([], 1, 0);
    }
    if (!isKeyConfigured()) {
      const q = query.toLowerCase().trim();
      const filtered = MOCK_MOVIES.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          (m.overview && m.overview.toLowerCase().includes(q))
      );
      return mockResponse(filtered, page, 1);
    }
    try {
      const response = await apiClient.get('/search/movie', {
        params: {
          query: query.trim(),
          page,
          include_adult: false
        }
      });
      return response.data;
    } catch {
      const q = query.toLowerCase().trim();
      const filtered = MOCK_MOVIES.filter((m) => m.title.toLowerCase().includes(q));
      return mockResponse(filtered, page, 1);
    }
  },

  getMovieDetails: async (id) => {
    const numericId = Number(id);
    if (!isKeyConfigured()) {
      const found = MOCK_MOVIES.find((m) => m.id === numericId) || MOCK_MOVIES[0];
      return { ...found, id: numericId || found.id };
    }
    try {
      const response = await apiClient.get(`/movie/${id}`);
      return response.data;
    } catch {
      const found = MOCK_MOVIES.find((m) => m.id === numericId) || MOCK_MOVIES[0];
      return { ...found, id: numericId || found.id };
    }
  },

  getMovieCredits: async (id) => {
    const numericId = Number(id);
    if (!isKeyConfigured()) {
      return { id: numericId, cast: getMockCastForMovie(numericId) };
    }
    try {
      const response = await apiClient.get(`/movie/${id}/credits`);
      return response.data;
    } catch {
      return { id: numericId, cast: getMockCastForMovie(numericId) };
    }
  },

  getSimilarMovies: async (id, page = 1) => {
    const numericId = Number(id);
    if (!isKeyConfigured()) {
      const similar = MOCK_MOVIES.filter((m) => m.id !== numericId);
      return mockResponse(similar, page, 1);
    }
    try {
      const response = await apiClient.get(`/movie/${id}/similar`, { params: { page } });
      return response.data;
    } catch {
      const similar = MOCK_MOVIES.filter((m) => m.id !== numericId);
      return mockResponse(similar, page, 1);
    }
  },

  getMovieVideos: async (id) => {
    const numericId = Number(id);
    if (!isKeyConfigured()) {
      const found = MOCK_MOVIES.find((m) => m.id === numericId);
      const trailerKey = found?.trailer_key || 'YoHD9XEInc0';
      return {
        id: numericId,
        results: [
          {
            id: 'mock_trailer',
            key: trailerKey,
            name: 'Official Trailer',
            site: 'YouTube',
            type: 'Trailer',
            official: true
          }
        ]
      };
    }
    try {
      const response = await apiClient.get(`/movie/${id}/videos`);
      return response.data;
    } catch {
      return {
        id: numericId,
        results: [
          {
            id: 'mock_trailer',
            key: 'YoHD9XEInc0',
            name: 'Official Trailer',
            site: 'YouTube',
            type: 'Trailer',
            official: true
          }
        ]
      };
    }
  }
};

export default tmdbApi;
