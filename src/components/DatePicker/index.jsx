import { faRemove } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const DatePicker = ({ onChange, placeholder, id, value, action }) => (
  <div className="date-picker" data-testid="date-picker">
    <div className="date-picker--group">
      <input
        data-testid={`input ${id}`}
        type="date"
        placeholder={placeholder}
        max={new Date().toLocaleDateString('en-ca')}
        id={id}
        value={value}
        onChange={onChange}
        required
      />
      {value && <FontAwesomeIcon icon={faRemove} onClick={action} />}
    </div>
  </div>
);

DatePicker.propTypes = {
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  action: PropTypes.func,
};

DatePicker.defaultProps = {
  placeholder: 'From date',
  onChange: () => '',
  id: '',
  value: '',
  action: () => '',
};

export default DatePicker;
