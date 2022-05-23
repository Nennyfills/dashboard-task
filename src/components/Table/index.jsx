import PropTypes from 'prop-types';

import Loader from 'components/Loader';

const Table = ({ schema, data, cols, loading, rows }) => (
  <div className="table-container" data-testid="table-container">
    <table className="table" data-testid="table">
      <thead>
        <tr>
          {schema?.map(({ title }) => (<th key={title}>{title}</th>))}
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <Loader cols={cols} rows={rows} />
        ) : (
          data?.map((item, rowKey) => (
            <tr key={rowKey}>
              {schema?.map((col, key) => (
                <td data-label={col?.title} key={key}>
                  {col.render(item)}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
);

Table.propTypes = {
  schema: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  loading: PropTypes.bool,
  cols: PropTypes.number,
  rows: PropTypes.number,
};

Table.defaultProps = {
  loading: false,
  cols: 4,
  rows: 4,
};
export default Table;
