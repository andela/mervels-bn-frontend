/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line import/prefer-default-export
export function Spinner(props){
    return(<div className={`spinner-default ${props.className}`}/>);
};

Spinner.propTypes = {
    // eslint-disable-next-line react/require-default-props
    className: PropTypes.string,
  };
