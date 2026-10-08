import { combineReducers } from 'redux';
import movieReducer from './movieReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  movies: movieReducer,
  auth: authReducer,
  user: userReducer
});

export default rootReducer;
