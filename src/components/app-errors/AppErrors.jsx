import React from 'react';
import PropTypes from 'prop-types';

import './AppErrors.css';

const AppErrors = props => (
  <p className="AppErrors">{props.errors}</p>
);

AppErrors.propTypes = {
  errors: PropTypes.string.isRequired,
};

AppErrors.defaultProps = {
  errors: '',
};

export default AppErrors;
