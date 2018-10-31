/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import app from './modules/App/AppReducer';
import errors from './modules/App/ErrorReducer';
import auth from './modules/User/UserReducer';
import posts from './modules/Post/PostReducer';
import intl from './modules/Intl/IntlReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  app,
  errors,
  auth,
  posts,
  intl,
});
