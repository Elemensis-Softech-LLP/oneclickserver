import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router';
import { logoutUser } from '../../../User/UserActions';
import { connect } from 'react-redux';

const styles = theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  appBar: {
    position: 'fixed',
  },
  toolbarTitle: {
    flex: 1,
    textAlign: 'left',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(900 + theme.spacing.unit * 3 * 2)]: {
      width: 900,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  heroContent: {
    maxWidth: 600,
    margin: '0 auto',
    padding: `${theme.spacing.unit * 8}px 0 ${theme.spacing.unit * 6}px`,
  },
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up('sm')]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
  footer: {
    marginTop: theme.spacing.unit * 8,
    borderTop: `1px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit * 6}px 0`,
  },
});

class Header extends Component {

  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onLogoutClick(e) {
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { classes } = this.props;

    const authLinks = (
      <div>
        <Button>
          <Link to="/home">Home </Link>
        </Button>
        <Button>
          <Link to="/">Products</Link>
        </Button>
        <Button>
          <Link to="/">Plans</Link>
        </Button>
        <Button>
          <Link to="/">Coins</Link>
        </Button>
        <Button onClick={this.onLogoutClick}>Logout</Button>
      </div>
    );

    const guestLinks = (
      <div>
        <Button color="primary" variant="outlined">
          <Link to="/login">Login</Link>
        </Button>
        <Button color="primary" variant="outlined">
          <Link to="/signup">Signup</Link>
        </Button>
      </div>
    );

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="fixed" color="default" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
              <Link to="/">OneClickServer </Link>
            </Typography>
            {isAuthenticated ? authLinks : guestLinks}
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}


Header.propTypes = {
  logoutUser: PropTypes.func,
  auth: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(withStyles(styles)(Header));
