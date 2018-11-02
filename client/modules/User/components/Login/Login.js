import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Alert, Button, Form, FormGroup, FormText, Label, Input } from 'reactstrap';

// Import Style
import styles from './Login.css';
import logo from './anon.png';


// Import Components

function Login(props) {
  const { errors } = props.errors;
  return (
    <Form className={styles['form-signin']} onSubmit={props.auth}>
      <img className="mb-4" src={logo} alt="" width="72" height="72" />
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      {
        errors && <span>
        {
          errors.email && <Alert color="danger">{errors.email}</Alert>
        }
        {
          errors.password && <Alert color="danger">{errors.password}</Alert>
        }
        </span>
      }
      <FormGroup className="text-left">
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" onChange={props.change} placeholder="Email Address" />
      </FormGroup>
      <FormGroup className="text-left">
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" onChange={props.change} id="examplePassword" placeholder="Password" />
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

Login.propTypes = {
  errors: PropTypes.object,
  auth: PropTypes.func,
  data: PropTypes.object,
  change: PropTypes.func,
};

export default Login;
