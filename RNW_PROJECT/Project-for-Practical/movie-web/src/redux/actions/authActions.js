import * as types from '../actionTypes';
import { STORAGE_KEYS } from '../../utils/constants';
import { saveStorageItem, removeStorageItem, loadStorageItem } from '../../utils/storage';

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: types.AUTH_LOGIN_REQUEST });

  await new Promise((res) => setTimeout(res, 500));

  if (!email || !password) {
    dispatch({
      type: types.AUTH_LOGIN_FAILURE,
      payload: 'Please enter both email and password.'
    });
    return false;
  }

  const userName = email.split('@')[0].replace(/[._-]/g, ' ');
  const capitalizedName = userName
    .split(' ')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');

  const user = {
    id: 'user_' + Date.now(),
    email,
    name: capitalizedName || 'Cinema Explorer',
    avatar: null,
    joinedDate: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  };

  saveStorageItem(STORAGE_KEYS.AUTH, user);
  dispatch({ type: types.AUTH_LOGIN_SUCCESS, payload: user });
  return true;
};

export const logout = () => (dispatch) => {
  removeStorageItem(STORAGE_KEYS.AUTH);
  dispatch({ type: types.AUTH_LOGOUT });
};

export const restoreAuth = () => (dispatch) => {
  const savedUser = loadStorageItem(STORAGE_KEYS.AUTH, null);
  if (savedUser) {
    dispatch({ type: types.AUTH_LOGIN_SUCCESS, payload: savedUser });
  }
};
