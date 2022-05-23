import PropTypes from 'prop-types';

const Button = ({
  loading,
  onClick,
  className,
  disabled,
  variant,
  size,
  children,
}) => (
  <div className="btnContainer" data-testid="button">
    <button
      data-test="reuseable-button"
      onClick={onClick}
      type="submit"
      id="disabled"
      className={`${className ?? ''} ${variant ?? ''} ${size ?? ''}`}
      disabled={disabled}
    >
      {loading ? 'Processing' : children}
    </button>
  </div>
);

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  loading: PropTypes.bool,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  variant: PropTypes.string,
  size: PropTypes.string,
};

Button.defaultProps = {
  loading: false,
  size: 'xs',
  variant: 'primary',
  disabled: false,
  className: '',
  onClick: () => '',
};

export default Button;
