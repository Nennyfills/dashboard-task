import { Link, useLocation } from 'react-router-dom';

import { Chart, Block, Monitor, Report, Switch } from 'assets/svg';

const Sidebar = () => {
  const location = useLocation();

  const links = [
    { Icon: Chart, link: '/' },
    { Icon: Block, link: '/block' },
    { Icon: Monitor, link: '/monitor' },
    { Icon: Report, link: '/reports' },
    { Icon: Switch, link: '/switch' },
  ];

  const choice = location?.pathname?.split('/')[1];
  const makeChoice = `/${choice}`;
  return (
    <section className="sidebar" data-testid="sidebar">
      <section className="sidebar--body" data-testid="sidebar--body">
        {links.map(({ Icon, link }) => (
          <Link to={link} key={link} className={`${choice}`} data-testid="sidebar--link">
            <Icon className={`${makeChoice === link ? `active ${choice}` : ''}`} />
          </Link>
        ))}
      </section>
    </section>
  );
};

Sidebar.propTypes = {};

Sidebar.defaultProps = {};
export default Sidebar;
