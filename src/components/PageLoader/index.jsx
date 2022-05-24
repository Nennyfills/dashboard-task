const Loader = () => (
  <div className="page-loader" data-testid="page-loader">
    <div className="flex" data-testid="page-loader-flex">
      <div>
        <div className="loader small-width">
          <div className="shine" />
        </div>
        <div className="loader width">
          <div className="shine" />
        </div>
      </div>
      <div className="flex override" data-testid="page-loader-override">
        <div className="loader tiny-width">
          <div className="shine" />
        </div>
        <div className="loader tiny-width">
          <div className="shine" />
        </div>
        <div className="loader tiny-width">
          <div className="shine" />
        </div>
        <div className="loader tiny-width">
          <div className="shine" />
        </div>
      </div>
    </div>
    <div>
      <div className="loader" data-testid="page-loader-bottom">
        <div className="shine height" />
      </div>
    </div>
  </div>
);

Loader.propTypes = {};

Loader.defaultProps = {};
export default Loader;
