// Import Actions
import { GET_ERRORS, CLEAR_ERRORS } from './ErrorActions';

// Initial State
const initialState = {};

const ErrorReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return action.payload;

    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
};


// Export Reducer
export default ErrorReducer;
