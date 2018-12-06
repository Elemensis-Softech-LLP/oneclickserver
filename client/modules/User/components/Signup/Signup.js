import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Messages from '../../../../components/Messages';

import logo from './anon.png';

const styles = theme => ({
  layout: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  margin: {
    margin: theme.spacing.unit,
  },
});

function Signup(props) {
  const { classes } = props;
  const { errors } = props.errors;
  return (

    // <Form className={styles['form-signin']} onSubmit={props.auth}>
    //   <img className="mb-4" src={logo} alt="" width="72" height="72" />
    //   <h1 className="h3 mb-3 font-weight-normal">Registration</h1>
    //   {
    //     errors.email && <Alert color="danger">{errors.email}</Alert>
    //   }
    //   {
    //     errors.name && <Alert color="danger">{errors.name}</Alert>
    //   }
    //   {
    //     errors.password && <Alert color="danger">{errors.password}</Alert>
    //   }
    //   {
    //     errors.password2 && !errors.password && <Alert color="danger">{errors.password2}</Alert>
    //   }
    //   <FormGroup className="text-left">
    //     <Label for="exampleEmail">Name</Label>
    //     <Input type="text" name="name" id="exampleName" onChange={props.change} placeholder="Name" />
    //   </FormGroup>
    //   <FormGroup className="text-left">
    //     <Label for="exampleEmail">Email</Label>
    //     <Input type="email" name="email" id="exampleEmail" onChange={props.change} placeholder="Email Address" />
    //   </FormGroup>
    //   <FormGroup className="text-left">
    //     <Label for="examplePassword">Password</Label>
    //     <Input type="password" name="password" onChange={props.change} id="examplePassword" placeholder="Password" />
    //   </FormGroup>
    //   <FormGroup className="text-left">
    //     <Label for="examplePassword2">Confrim Password</Label>
    //     <Input type="password" name="password2" onChange={props.change} id="examplePassword2" placeholder="Password" />
    //   </FormGroup>
    //
    //   <Button color="btn btn-lg btn-block btn btn-lg btn-block btn-primary" className="mb-2" size="lg" block>Signup</Button>{' '}
    //
    //   <FormText color="muted">
    //       Already registered ?
    //     <Link to="/Signup" className="alert-link ml-1">
    //         Signup
    //     </Link>
    //   </FormText>
    //
    // </Form>

    <React.Fragment>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockIcon />
            // <img className="mb-4" src={logo} alt="" width="72" height="72" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          {
           errors && <span>
           {
             errors.email && <Messages
               variant="error"
               className={classes.margin}
               message={errors.email}
             />
           }
           {
             errors.name && <Messages
               variant="error"
               className={classes.margin}
               message={errors.name}
             />
           }
           {
             errors.password && <Messages
               variant="error"
               className={classes.margin}
               message={errors.password}
             />
           }
           {
             errors.password2 && !errors.password && <Messages
               variant="error"
               className={classes.margin}
               message={errors.password2}
             />
           }
           </span>
         }

          <form className={classes.form} onSubmit={props.auth}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input id="name" name="name" autoComplete="name" autoFocus onChange={props.change} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" onChange={props.change} />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={props.change}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password2">Confirm Password</InputLabel>
              <Input
                name="password2"
                type="password"
                id="password2"
                autoComplete="current-password"
                onChange={props.change}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Signup
            </Button>{' '}

          </form>
        </Paper>
      </main>
    </React.Fragment>
  );
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  errors: PropTypes.object,
  auth: PropTypes.func,
  data: PropTypes.object,
  change: PropTypes.func,
};


export default withStyles(styles)(Signup);
