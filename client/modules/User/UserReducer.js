// Import Actions
import { SET_CURRENT_USER } from './UserActions';
import isEmpty from '../../validation/is-empty.js';

// Initial State
const initialState = {
  isAuthenticated: false,
  user: {},
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      };

    default:
      return state;
  }
};

export default UserReducer;
