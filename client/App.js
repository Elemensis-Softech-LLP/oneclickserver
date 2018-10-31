/**
 * Root Component
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import IntlWrapper from './modules/Intl/IntlWrapper';
import jwtDecode from 'jwt-decode';
import setAuthToken from './util/setAuthToken.js';
import { setCurrentUser, logoutUser, clearCurrentProfile } from './modules/User/UserActions.js';
import store from './store.js';

// Import Routes
import routes from './routes';

// Base stylesheet
require('./main.css');

if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);

  const decoded = jwtDecode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());

    window.location.href = '/login';
  }
}

export default function App(props) {
  return (
    <Provider store={props.store}>
      <IntlWrapper>
        <Router history={browserHistory}>
          {routes}
        </Router>
      </IntlWrapper>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};
