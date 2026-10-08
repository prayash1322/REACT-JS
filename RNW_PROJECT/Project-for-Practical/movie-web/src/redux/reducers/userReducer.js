import * as types from '../actionTypes';
import { STORAGE_KEYS } from '../../utils/constants';
import { loadStorageItem } from '../../utils/storage';

const initialFavorites = loadStorageItem(STORAGE_KEYS.FAVORITES, []);
const initialWatchlist = loadStorageItem(STORAGE_KEYS.WATCHLIST, []);

const initialState = {
  favorites: initialFavorites,
  watchlist: initialWatchlist
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case types.LOAD_FAVORITES:
      return {
        ...state,
        favorites: action.payload || []
      };

    case types.ADD_FAVORITE:
      if (state.favorites.some((m) => m.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        favorites: [action.payload, ...state.favorites]
      };

    case types.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter((m) => m.id !== action.payload)
      };

    case types.LOAD_WATCHLIST:
      return {
        ...state,
        watchlist: action.payload || []
      };

    case types.ADD_TO_WATCHLIST:
      if (state.watchlist.some((m) => m.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist]
      };

    case types.REMOVE_FROM_WATCHLIST:
      return {
        ...state,
        watchlist: state.watchlist.filter((m) => m.id !== action.payload)
      };

    default:
      return state;
  }
}
