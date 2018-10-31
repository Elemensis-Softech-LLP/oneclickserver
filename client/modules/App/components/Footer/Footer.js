import React from 'react';
// import { FormattedMessage } from 'react-intl';

// Import Style
import styles from './Footer.css';

// Import Images
// import bg from '../../header-bk.png';

export function Footer() {
  return (
    <footer className="text-muted">
      <div className="container">
        <p>New to Bootstrap? <a href="../../">Visit the homepage</a> or read our <a href="../../getting-started/">getting started guide</a>.</p>
      </div>
    </footer>
  );
  // <span className="float-right">
  //   <a href="#">Back to top</a>
  // </span>
}

export default Footer;
