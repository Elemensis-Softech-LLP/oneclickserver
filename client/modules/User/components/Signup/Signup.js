import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { Button, Form, FormGroup, FormText, Label, Input } from 'reactstrap';
// Import Style
import styles from '../Login/Login.css';
// import logo from './bootstrap-solid.svg';
import logo from './anon.png';

class Signup extends Component {
  render() {
    return (
      <Form className={styles['form-signin']}>
        <img className="mb-4" src={logo} alt="" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <FormGroup className="text-left">
          <Label for="exampleEmail">Email</Label>
          <Input type="email" name="email" id="exampleEmail" placeholder="Email" />
        </FormGroup>
        <FormGroup className="text-left">
          <Label for="examplePassword">Password</Label>
          <Input type="password" name="password" id="examplePassword" placeholder="password" />
        </FormGroup>
        <FormGroup className="text-left">
          <Label for="cExamplePassword">Confirm Password</Label>
          <Input type="password" name="cpassword" id="cExamplePassword" placeholder="confirm password" />
        </FormGroup>

        <Button color="btn btn-lg btn-block btn btn-lg btn-block btn-primary" className="mb-2" size="lg" block>Signup</Button>{' '}

        <FormText color="muted">
            Already registered ?
          <Link to="/login" className="alert-link ml-1">
              Login
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

Signup.propTypes = {
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);
