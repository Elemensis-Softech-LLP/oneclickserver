import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import Login from '../../components/Login/Login';

// Import Actions
import { loginUserRequest } from '../../UserActions';
// import { toggleAddPost } from '../../../App/AppActions';

// Import Selectors
// import { getShowAddPost } from '../../../App/AppReducer';
// import { getPosts } from '../../LoginReducer';

class LoginPage extends Component {
  componentDidMount() {
    // this.props.dispatch(fetchPosts());
  }

  // handleDeletePost = post => {
  //   if (confirm('Do you want to delete this post')) { // eslint-disable-line
  //     this.props.dispatch(deletePostRequest(post));
  //   }
  // };

  handleAddPost = (name, title, content) => {
    // this.props.dispatch(toggleAddPost());
    this.props.dispatch(loginUserRequest({ name, title, content }));
  };

  render() {
    return (
      <div>
        <Login />
      </div>
    );
  }
}

// Actions required to provide data for this component to render in sever side.
// LoginPage.need = [() => { return fetchPosts(); }];

// Retrieve data from store as props
function mapStateToProps(state) {
  return {
    // showAddPost: getShowAddPost(state),
    // posts: getPosts(state),
  };
}

LoginPage.propTypes = {
  // posts: PropTypes.arrayOf(PropTypes.shape({
  //   name: PropTypes.string.isRequired,
  //   title: PropTypes.string.isRequired,
  //   content: PropTypes.string.isRequired,
  // })).isRequired,
  // showAddPost: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

LoginPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(LoginPage);
