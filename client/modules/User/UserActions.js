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
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);

      const decoded = jwtDecode(token);

      dispatch(loginUser(decoded));
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

export function registerUserRequest(userData) {
  return (dispatch) => {
    return callApi('users/register', 'post', userData)
      .then(res => dispatch(registerUser(res.data)))
      .catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: err.response.data,
        })
      );
  };
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);

  dispatch(loginUser({}));
};
