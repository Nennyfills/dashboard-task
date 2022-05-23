import PropTypes from 'prop-types';

const Loader = ({ cols, rows, notTable }) => {
  const shimmerRows = [];
  for (let count = 1; count <= rows; count += 1) {
    const shimmerCols = [];
    for (let countC = 1; countC <= cols; countC += 1) {
      shimmerCols.push(
        <td key={countC} data-testid="col">
          <div key={`shimmer-${countC}`} className="shimmer">
            <div className="shimmer-line" />
          </div>
        </td>
      );
    }
    shimmerRows.push(
      <tr key={count} data-testid="row">{shimmerCols && shimmerCols.map((col) => col)}</tr>
    );
  }
  if (notTable) {
    return (
      <div className="shimmer" data-testid="single-loader">
        <div className="shimmer-line" />
      </div>
    );
  }
  return shimmerRows && shimmerRows.map((shim) => shim);
};

Loader.propTypes = {
  rows: PropTypes.number,
  cols: PropTypes.number,
  notTable: PropTypes.bool,
};

Loader.defaultProps = {
  rows: 4,
  cols: 4,
  notTable: false,
};

export default Loader;
