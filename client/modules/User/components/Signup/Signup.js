import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Alert, Button, Form, FormGroup, FormText, Label, Input } from 'reactstrap';

// Import Style
import styles from '../Login/Login.css';
import logo from './anon.png';


// Import Components

function Signup(props) {
  const { errors } = props.errors;
  return (
    <Form className={styles['form-signin']} onSubmit={props.auth}>
      <img className="mb-4" src={logo} alt="" width="72" height="72" />
      <h1 className="h3 mb-3 font-weight-normal">Registration</h1>
      {
        errors.email && <Alert color="danger">{errors.email}</Alert>
      }
      {
        errors.name && <Alert color="danger">{errors.name}</Alert>
      }
      {
        errors.password && <Alert color="danger">{errors.password}</Alert>
      }
      {
        errors.password2 && !errors.password && <Alert color="danger">{errors.password2}</Alert>
      }
      <FormGroup className="text-left">
        <Label for="exampleEmail">Name</Label>
        <Input type="text" name="name" id="exampleName" onChange={props.change} placeholder="Name" />
      </FormGroup>
      <FormGroup className="text-left">
        <Label for="exampleEmail">Email</Label>
        <Input type="email" name="email" id="exampleEmail" onChange={props.change} placeholder="Email Address" />
      </FormGroup>
      <FormGroup className="text-left">
        <Label for="examplePassword">Password</Label>
        <Input type="password" name="password" onChange={props.change} id="examplePassword" placeholder="Password" />
      </FormGroup>
      <FormGroup className="text-left">
        <Label for="examplePassword2">Confrim Password</Label>
        <Input type="password" name="password2" onChange={props.change} id="examplePassword2" placeholder="Password" />
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

Signup.propTypes = {
  errors: PropTypes.object,
  auth: PropTypes.func,
  data: PropTypes.object,
  change: PropTypes.func,
};

export default Signup;
