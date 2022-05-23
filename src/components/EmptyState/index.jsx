import PropTypes from 'prop-types';

import { NoReportIcon } from 'assets/svg';

const EmptyState = ({ title, desc }) => (
  <div className="empty-state" data-testid="empty-state">
    <div className="empty-state--detail">
      <h2>{title || 'No reports'}</h2>
      <p className="bold">
        {desc ||
              `Currently you have no data for the reports to be generated.
          Once you start generating traffic through the Balance application 
          the reports will be shown.`}
      </p>
    </div>
    <NoReportIcon />
  </div>
);

EmptyState.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
};

EmptyState.defaultProps = {
  title: '',
  desc: '',
};
export default EmptyState;
