import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import Signup from '../../components/Signup/Signup';

// Import Actions
import { loginUserRequest } from '../../UserActions';
// import { toggleAddPost } from '../../../App/AppActions';

// Import Selectors
// import { getShowAddPost } from '../../../App/AppReducer';
// import { getPosts } from '../../LoginReducer';

class SignupPage extends Component {
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
        <Signup />
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

SignupPage.propTypes = {
  // posts: PropTypes.arrayOf(PropTypes.shape({
  //   name: PropTypes.string.isRequired,
  //   title: PropTypes.string.isRequired,
  //   content: PropTypes.string.isRequired,
  // })).isRequired,
  // showAddPost: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};

SignupPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps)(SignupPage);
