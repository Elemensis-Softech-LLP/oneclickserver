import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import Login from '../../components/Login/Login';

// Import Actions
import { loginUserRequest } from '../../UserActions';

class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
    };

    // this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount', this.props.auth);
    if (this.props.auth.isAuthenticated) {
      // this.props.history.push('/');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      // this.props.history.push('/');
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  // onChange(e) {
  //   this.setState({ [e.target.name]: e.target.value });
  // }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUserRequest(userData);
  }

  render() {
    return (
      <div>
        <Login auth={this.onSubmit} errors={this.props.errors} />
      </div>
    );
  }
}

LoginPage.propTypes = {
  loginUserRequest: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    auth: state.auth,
    errors: state.errors,
  };
}

export default connect(mapStateToProps, { loginUserRequest })(LoginPage);
