/* eslint-disable global-require */
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './modules/App/App';
// import PrivateRoute from './components/private-route/PrivateRoute.js';

// require.ensure polyfill for node
if (typeof require.ensure !== 'function') {
  require.ensure = function requireModule(deps, callback) {
    callback(require);
  };
}

/* Workaround for async react routes to work with react-hot-reloader till
  https://github.com/reactjs/react-router/issues/2182 and
  https://github.com/gaearon/react-hot-loader/issues/288 is fixed.
 */
if (process.env.NODE_ENV !== 'production') {
  // Require async routes only in development for react-hot-reloader to work.
  require('./modules/User/pages/LoginPage/LoginPage');
  require('./modules/User/pages/SignupPage/SignupPage');
  require('./modules/Post/pages/PostListPage/PostListPage');
  require('./modules/Post/pages/PostDetailPage/PostDetailPage');
  require('./components/Home');
  require('./components/NotFound');
}

// react-router setup with code-splitting
// More info: http://blog.mxstbr.com/2016/01/react-apps-with-pages/
export default (
  <Route exact path="/" component={App}>
    <IndexRoute
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostListPage/PostListPage').default);
        });
      }}
    />
    <Route
      exact
      path="/home"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./components/Home').default);
        });
      }}
    />
    <Route
      exact
      path="/login"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/User/pages/LoginPage/LoginPage').default);
        });
      }}
    />

    <Route
      exact
      path="/signup"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/User/pages/SignupPage/SignupPage').default);
        });
      }}
    />
    <Route
      exact
      path="/post/:slug-:cuid"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./modules/Post/pages/PostDetailPage/PostDetailPage').default);
        });
      }}
    />
    <Route
      exact
      path="/not-found"
      getComponent={(nextState, cb) => {
        require.ensure([], require => {
          cb(null, require('./components/NotFound').default);
        });
      }}
    />

  </Route>
);


    // <Switch>
    //   <PrivateRoute exact path="/home" component={Dashboard} />
    // </Switch>
