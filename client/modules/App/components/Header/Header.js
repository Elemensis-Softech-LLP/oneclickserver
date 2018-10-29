import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router';
// import { FormattedMessage } from 'react-intl';
// import {
//   Collapse,
//   Navbar,
//   NavbarToggler,
//   NavbarBrand,
//   Nav,
//   NavItem,
//   NavLink,
//   UncontrolledDropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem
// } from 'reactstrap';
// Import Style
import styles from './Header.css';

export class Header extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (

      <div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
        <h5 className="my-0 mr-md-auto font-weight-normal">OneClickServer</h5>
        <nav className="my-2 my-md-0 mr-md-3">
          <a className="p-2 text-dark" href="/">Home</a>
          <a className="p-2 text-dark" href="#">Products</a>
          <a className="p-2 text-dark" href="#">Plans</a>
          <a className="p-2 text-dark" href="#">Coins</a>
          <a className="p-2 text-dark" href="/login">Login</a>
          <a className="p-2 text-dark" href="#">Logout</a>
          <a className="p-2 text-dark" href="#">Sign up</a>
        </nav>
      </div>
    );
  }

}

Header.contextTypes = {
  router: PropTypes.object
};

Header.propTypes = {
  // toggleAddPost: PropTypes.func.isRequired,
  // switchLanguage: PropTypes.func.isRequired,
  // intl: PropTypes.object.isRequired
};

export default Header;
