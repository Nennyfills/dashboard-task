import Loader from 'components/Loader';
import currencyFormat from 'helpers';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Accordion = ({ children, titleData, loading }) => {
  useEffect(() => {
    const input = document.getElementsByClassName('accordion')[0];
    if (input) input.checked = true;
  }, []);

  return (
    <div className="accordion-row" data-testid="accordion-row">
      <div className="accordion-row__col" data-testid="accordion-row__col">
        <div className="accordion-row__tabs" data-testid="accordion-row__tabs">
          {children?.map((val, index) => (
            <div
              key={`${titleData[index]?.name}-${index}`}
              className="accordion-row__tab"
              data-testid="accordion-row__tabs"
            >
              <input type="checkbox" className="accordion" id={`check-${index}`} />
              {loading ? <Loader notTable /> : (
                <label
                  className="accordion-row__tab--label semibold"
                  htmlFor={`check-${index}`}
                  date-label="amount"
                  data-testid="accordion-row__tab--label"
                >
                  <p className="bold">{titleData[index]?.name}</p>
                  {titleData[index]?.total && (
                  <p className="bold">
                    <span>Total: </span>
                    {currencyFormat(titleData[index]?.total)}
                  </p>
                  )}
                </label>
              )}
              <div className="content">
                <div className="content--inner">{val}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Accordion.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node, PropTypes.bool]),
  titleData: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.shape({
      name: PropTypes.string,
      total: PropTypes.string,
    }),
  ]),
  loading: PropTypes.bool
};

Accordion.defaultProps = {
  loading: false,
  children: null,
  titleData: []
};
export default Accordion;
