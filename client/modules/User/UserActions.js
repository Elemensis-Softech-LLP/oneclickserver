import jwtDecode from 'jwt-decode';
import callApi from '../../util/apiCaller';
import setAuthToken from '../../util/setAuthToken';

// Export Constants
export const GET_ERRORS = 'GET_ERRORS';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const CLEAR_CURRENT_PROFILE = 'CLEAR_CURRENT_PROFILE';

export function registerUser(payload) {
  return {
    type: GET_ERRORS,
    payload,
  };
}

export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};


export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE,
  };
};

export const loginUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};


export function loginUserRequest(userData) {
  return (dispatch) => {
    return callApi('users/login', 'post', userData)
    .then(res => {
      const { token } = res;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      console.log(decoded);
      dispatch(setCurrentUser(decoded));
    })
    .catch(err => {
      dispatch({
        type: GET_ERRORS,
        payload: err,
      });
    }
    );
  };
}

export function registerUserRequest(userData, history) {
  return (dispatch) => {
    return callApi('users/register', 'post', userData)
      .then(res => history.push('/login')) /* eslint no-unused-vars: 0 */
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err,
        })
      );
  };
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);

  dispatch(setCurrentUser({}));
};
