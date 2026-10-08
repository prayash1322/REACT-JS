import tmdbApi from '../../services/tmdbApi';
import * as types from '../actionTypes';

export const fetchPopularMovies = (page = 1) => async (dispatch) => {
  dispatch({ type: types.FETCH_POPULAR_REQUEST });
  try {
    const data = await tmdbApi.getPopularMovies(page);
    dispatch({ type: types.FETCH_POPULAR_SUCCESS, payload: data.results || [] });
  } catch (error) {
    dispatch({
      type: types.FETCH_POPULAR_FAILURE,
      payload: error.message || 'Failed to fetch popular movies'
    });
  }
};

export const fetchTrendingMovies = (timeWindow = 'week', page = 1) => async (dispatch) => {
  dispatch({ type: types.FETCH_TRENDING_REQUEST });
  try {
    const data = await tmdbApi.getTrendingMovies(timeWindow, page);
    dispatch({ type: types.FETCH_TRENDING_SUCCESS, payload: data.results || [] });
  } catch (error) {
    dispatch({
      type: types.FETCH_TRENDING_FAILURE,
      payload: error.message || 'Failed to fetch trending movies'
    });
  }
};

export const fetchUpcomingMovies = (page = 1) => async (dispatch) => {
  dispatch({ type: types.FETCH_UPCOMING_REQUEST });
  try {
    const data = await tmdbApi.getUpcomingMovies(page);
    dispatch({ type: types.FETCH_UPCOMING_SUCCESS, payload: data.results || [] });
  } catch (error) {
    dispatch({
      type: types.FETCH_UPCOMING_FAILURE,
      payload: error.message || 'Failed to fetch upcoming movies'
    });
  }
};

export const fetchTopRatedMovies = (page = 1) => async (dispatch) => {
  dispatch({ type: types.FETCH_TOP_RATED_REQUEST });
  try {
    const data = await tmdbApi.getTopRatedMovies(page);
    dispatch({ type: types.FETCH_TOP_RATED_SUCCESS, payload: data.results || [] });
  } catch (error) {
    dispatch({
      type: types.FETCH_TOP_RATED_FAILURE,
      payload: error.message || 'Failed to fetch top rated movies'
    });
  }
};

export const fetchNowPlayingMovies = (page = 1) => async (dispatch) => {
  dispatch({ type: types.FETCH_NOW_PLAYING_REQUEST });
  try {
    const data = await tmdbApi.getNowPlayingMovies(page);
    dispatch({ type: types.FETCH_NOW_PLAYING_SUCCESS, payload: data.results || [] });
  } catch (error) {
    dispatch({
      type: types.FETCH_NOW_PLAYING_FAILURE,
      payload: error.message || 'Failed to fetch now playing movies'
    });
  }
};

export const fetchDiscoverMovies = (filters = {}, page = 1) => async (dispatch) => {
  dispatch({ type: types.FETCH_DISCOVER_REQUEST });
  try {
    const data = await tmdbApi.discoverMovies(filters, page);
    dispatch({
      type: types.FETCH_DISCOVER_SUCCESS,
      payload: {
        results: data.results || [],
        page: data.page || page,
        totalPages: data.total_pages || 1,
        totalResults: data.total_results || 0,
        append: page > 1
      }
    });
  } catch (error) {
    dispatch({
      type: types.FETCH_DISCOVER_FAILURE,
      payload: error.message || 'Failed to discover movies'
    });
  }
};

export const fetchMovieDetails = (id) => async (dispatch) => {
  dispatch({ type: types.FETCH_MOVIE_DETAILS_REQUEST });
  try {
    const data = await tmdbApi.getMovieDetails(id);
    dispatch({ type: types.FETCH_MOVIE_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: types.FETCH_MOVIE_DETAILS_FAILURE,
      payload: error.message || 'Failed to fetch movie details'
    });
  }
};

export const fetchMovieCredits = (id) => async (dispatch) => {
  dispatch({ type: types.FETCH_CREDITS_REQUEST });
  try {
    const data = await tmdbApi.getMovieCredits(id);
    dispatch({ type: types.FETCH_CREDITS_SUCCESS, payload: data.cast || [] });
  } catch (error) {
    dispatch({
      type: types.FETCH_CREDITS_FAILURE,
      payload: error.message || 'Failed to fetch movie credits'
    });
  }
};

export const fetchSimilarMovies = (id, page = 1) => async (dispatch) => {
  dispatch({ type: types.FETCH_SIMILAR_REQUEST });
  try {
    const data = await tmdbApi.getSimilarMovies(id, page);
    dispatch({ type: types.FETCH_SIMILAR_SUCCESS, payload: data.results || [] });
  } catch (error) {
    dispatch({
      type: types.FETCH_SIMILAR_FAILURE,
      payload: error.message || 'Failed to fetch similar movies'
    });
  }
};

export const fetchMovieVideos = (id) => async (dispatch) => {
  dispatch({ type: types.FETCH_VIDEOS_REQUEST });
  try {
    const data = await tmdbApi.getMovieVideos(id);
    dispatch({ type: types.FETCH_VIDEOS_SUCCESS, payload: data.results || [] });
  } catch (error) {
    dispatch({
      type: types.FETCH_VIDEOS_FAILURE,
      payload: error.message || 'Failed to fetch movie trailers'
    });
  }
};

export const searchMovies = (query, page = 1) => async (dispatch) => {
  if (!query || !query.trim()) {
    dispatch({ type: types.CLEAR_SEARCH });
    return;
  }
  dispatch({ type: types.SEARCH_MOVIES_REQUEST, payload: query });
  try {
    const data = await tmdbApi.searchMovies(query, page);
    dispatch({
      type: types.SEARCH_MOVIES_SUCCESS,
      payload: {
        results: data.results || [],
        page: data.page || 1,
        totalResults: data.total_results || 0,
        totalPages: data.total_pages || 1,
        query
      }
    });
  } catch (error) {
    dispatch({
      type: types.SEARCH_MOVIES_FAILURE,
      payload: error.message || 'Search failed'
    });
  }
};

export const clearSearch = () => ({
  type: types.CLEAR_SEARCH
});
