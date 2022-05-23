import PropTypes from 'prop-types';

import { Logo, MenuIcon } from 'assets/svg';
import Loader from 'components/Loader';

const Navbar = ({ loading, firstName, lastName }) => (
  <nav className="navbar" data-testid="navbar">
    <div className="navbar__icon" data-testid="icons">
      <Logo className="navbar__icon--logo" />
      <MenuIcon className="navbar__icon--menu" />
    </div>
    <div className="navbar__avatar">
      <div className="navbar__avatar__holder">
        {loading ? (
          <div className="loading" />
        ) : (
          <div className="navbar__avatar--initials" data-testid="initials">
            <span className="h2">{firstName?.charAt(0)}</span>
            <span className="h2">{lastName?.charAt(0)}</span>
          </div>
        )}
      </div>
      {loading ? (
        <div className="navbar__avatar__loader">
          <div className="single-loader">
            <Loader />
          </div>
        </div>
      ) : (
        <div className="navbar__avatar__details" data-testid="details">
          <p className="bold family roboto">
            {firstName && lastName ? `${firstName} ${lastName}` : 'N/A'}
          </p>
        </div>
      )}
    </div>
  </nav>
);

Navbar.propTypes = {
  firstName: PropTypes.string,
  loading: PropTypes.bool,
  lastName: PropTypes.string,
};

Navbar.defaultProps = {
  firstName: null,
  lastName: null,
  loading: false,
};
export default Navbar;
