/**
 * Root Component
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import IntlWrapper from './modules/Intl/IntlWrapper';
import jwtDecode from 'jwt-decode';
import setAuthToken from './util/setAuthToken.js';
import { setCurrentUser, logoutUser, clearCurrentProfile } from './modules/User/UserActions.js';
import store from './store.js';

// Import Routes
import routes from './routes';

// Base stylesheet
require('./main.css');

const muiTheme = createMuiTheme({
  palette: {
    primary: blue,
  },
  typography: {
    useNextVariants: true,
  },
});

// import injectTapEventPlugin from 'react-tap-event-plugin';
// // Needed for onTouchTap
// // http://stackoverflow.com/a/34015469/988941
// injectTapEventPlugin();

export default class App extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log('componentDidMount', this.props); /* eslint no-console: 0 */
    if (localStorage.jwtToken) {
      setAuthToken(localStorage.jwtToken);

      const decoded = jwtDecode(localStorage.jwtToken);
      this.props.store.dispatch(setCurrentUser(decoded));

      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        this.props.store.dispatch(logoutUser());
        this.props.store.dispatch(clearCurrentProfile());

        window.location.href = '/login';
      }
    }
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <IntlWrapper>
          <MuiThemeProvider theme={muiTheme}>
            <Router history={browserHistory}>
              {routes}
            </Router>
          </MuiThemeProvider>
        </IntlWrapper>
      </Provider>
    );
  }
}

App.propTypes = {
  store: PropTypes.object.isRequired,
};
