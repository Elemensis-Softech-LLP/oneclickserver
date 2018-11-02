import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import Signup from '../../components/Signup/Signup';

// Import Actions
import { registerUserRequest } from '../../UserActions';

class SignupPage extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    console.log('componentDidMount', this.props.auth); /* eslint no-console: 0 */
    if (this.props.auth.isAuthenticated) {
      this.context.history.push('/home');
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors.data });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUserRequest(newUser, this.context.history);
  }

  render() {
    return (
      <div>
        <Signup auth={this.onSubmit} change={this.onChange} errors={this.state} />
      </div>
    );
  }
}

SignupPage.propTypes = {
  registerUserRequest: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};


function mapStateToProps(state) {
  return {
    auth: state.auth,
    errors: state.errors,
  };
}

export default connect(mapStateToProps, { registerUserRequest })(SignupPage);
