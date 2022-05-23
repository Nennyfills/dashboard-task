import PropTypes from 'prop-types';

import Navbar from 'components/Navbar';
import Sidebar from 'components/Sidebar';
import Footer from 'components/Footer';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const { Attribute } = useSelector(({ Attribute }) => ({ Attribute }));

  return (
    <section className="layout" data-testid="layout">
      <header className="layout--navbar" data-testid="layout--navbar">
        <Navbar
          firstName={Attribute?.user?.firstName}
          lastName={Attribute?.user?.lastName}
        />
      </header>
      <aside className="layout--sidebar" data-testid="layout--sidebar">
        <Sidebar />
      </aside>

      <section className="layout--section" data-testid="layout--section">
        <div
          className="layout--section--content"
          data-testid="layout--section--content"
        >
          {children}
        </div>
      </section>

      <footer className="layout--footer" data-testid="layout--footer">
        <Footer />
      </footer>
    </section>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

Layout.defaultProps = {};
export default Layout;
