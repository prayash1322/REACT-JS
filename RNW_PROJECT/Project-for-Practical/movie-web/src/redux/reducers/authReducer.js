import * as types from '../actionTypes';
import { STORAGE_KEYS } from '../../utils/constants';
import { loadStorageItem } from '../../utils/storage';

const savedUser = loadStorageItem(STORAGE_KEYS.AUTH, null);

const initialState = {
  isAuthenticated: Boolean(savedUser),
  user: savedUser,
  loading: false,
  error: null
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case types.AUTH_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };

    case types.AUTH_LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
        error: null
      };

    case types.AUTH_LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.payload
      };

    case types.AUTH_LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: null
      };

    default:
      return state;
  }
}
