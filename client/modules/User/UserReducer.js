// Import Actions
import { LOGIN_USER } from './UserActions';

// Initial State
const initialState = { data: [] };

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER :
      return {
        data: [action.post, ...state.data],
      };

    default:
      return state;
  }
};

export default UserReducer;
