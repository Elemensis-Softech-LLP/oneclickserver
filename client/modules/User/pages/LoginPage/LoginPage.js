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

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount', this.props.auth); /* eslint no-console: 0 */
    if (this.props.auth.isAuthenticated) {
      this.context.router.push('/home');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.context.router.push('/home');
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors.data,
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

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
        <Login auth={this.onSubmit} change={this.onChange} errors={this.state} />
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

LoginPage.contextTypes = {
  router: PropTypes.object,
};

export default connect(mapStateToProps, { loginUserRequest })(LoginPage);
