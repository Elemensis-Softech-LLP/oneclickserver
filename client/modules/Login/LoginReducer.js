// Import Actions
import { LOGIN_USER } from './LoginActions';

// Initial State
const initialState = { data: [] };

const LoginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER :
      return {
        data: [action.post, ...state.data],
      };

    default:
      return state;
  }
};

export default LoginReducer;
