import PropTypes from 'prop-types';

const DatePicker = ({ onChange, placeholder, id }) => (
  <div className="date-picker" data-testid="date-picker">
    <input
      data-testid={`input ${id}`}
      type="date"
      placeholder={placeholder}
      max={new Date().toLocaleDateString('en-ca')}
      id={id}
      onChange={onChange}
      required
    />
  </div>
);

DatePicker.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  id: PropTypes.string,
};

DatePicker.defaultProps = {
  placeholder: 'From date',
  onChange: () => '',
  id: '',
};

export default DatePicker;
