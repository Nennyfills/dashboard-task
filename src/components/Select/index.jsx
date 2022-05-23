/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';

const Select = ({ options, placeholder, onChange, id, active }) => (
  <div className="select-container" data-testid="select-container">
    <select
      onChange={onChange}
      // defaultValue={active?.label}
      id={id}
      data-testid={`select ${id}`}
    >
      {/* <option disabled>{placeholder}</option> */}
      <option value={active?.value}>{active?.label}</option>
      {options?.map((option) => (
        <option selected={option?.select} key={option?.value} value={option?.value}>
          {option?.label}
        </option>
      ))}
    </select>
  </div>
);

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  id: PropTypes.string,
  active: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

Select.defaultProps = {
  placeholder: 'Projects',
  onChange: () => '',
  id: '1',
  // active: { value: 'project', label: 'All project' },
};

export default Select;
