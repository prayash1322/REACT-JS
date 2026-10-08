import * as types from '../actionTypes';
import { STORAGE_KEYS } from '../../utils/constants';
import { saveStorageItem, loadStorageItem } from '../../utils/storage';

export const loadFavorites = () => (dispatch) => {
  const favorites = loadStorageItem(STORAGE_KEYS.FAVORITES, []);
  dispatch({ type: types.LOAD_FAVORITES, payload: favorites });
};

export const addFavorite = (movie) => (dispatch, getState) => {
  const { user } = getState();
  const currentFavorites = user.favorites || [];
  if (currentFavorites.some((m) => m.id === movie.id)) return;

  const updatedFavorites = [movie, ...currentFavorites];
  saveStorageItem(STORAGE_KEYS.FAVORITES, updatedFavorites);
  dispatch({ type: types.ADD_FAVORITE, payload: movie });
};

export const removeFavorite = (movieId) => (dispatch, getState) => {
  const { user } = getState();
  const updatedFavorites = (user.favorites || []).filter((m) => m.id !== movieId);
  saveStorageItem(STORAGE_KEYS.FAVORITES, updatedFavorites);
  dispatch({ type: types.REMOVE_FAVORITE, payload: movieId });
};

export const loadWatchlist = () => (dispatch) => {
  const watchlist = loadStorageItem(STORAGE_KEYS.WATCHLIST, []);
  dispatch({ type: types.LOAD_WATCHLIST, payload: watchlist });
};

export const addToWatchlist = (movie) => (dispatch, getState) => {
  const { user } = getState();
  const currentWatchlist = user.watchlist || [];
  if (currentWatchlist.some((m) => m.id === movie.id)) return;

  const updatedWatchlist = [movie, ...currentWatchlist];
  saveStorageItem(STORAGE_KEYS.WATCHLIST, updatedWatchlist);
  dispatch({ type: types.ADD_TO_WATCHLIST, payload: movie });
};

export const removeFromWatchlist = (movieId) => (dispatch, getState) => {
  const { user } = getState();
  const updatedWatchlist = (user.watchlist || []).filter((m) => m.id !== movieId);
  saveStorageItem(STORAGE_KEYS.WATCHLIST, updatedWatchlist);
  dispatch({ type: types.REMOVE_FROM_WATCHLIST, payload: movieId });
};
