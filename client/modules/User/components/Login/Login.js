import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Button, Form, FormGroup, FormText, Label, Input } from 'reactstrap';

// Import Style
import styles from './Login.css';
// import logo from './bootstrap-solid.svg';
import logo from './anon.png';

class Login extends Component {
  render() {
    return (
      <Form className={styles['form-signin']}>
        <img className="mb-4" src={logo} alt="" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <FormGroup className="text-left">
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
        </FormGroup>
        <FormGroup className="text-left">
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
        </FormGroup>

        <Link to="/" color="link" className="float-right mb-2 alert-link text-right">
          Forgot Password?
        </Link>

        <Button color="btn btn-lg btn-block btn btn-lg btn-block btn-primary" className="mb-2" size="lg" block>Sign in</Button>{' '}

        <FormText color="muted">
            Don't have an account?
          <Link to="/signup" className="alert-link ml-1">
              Signup
          </Link>
        </FormText>

      </Form>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

Login.propTypes = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
