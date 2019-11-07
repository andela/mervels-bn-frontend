/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';

const Input = ({
  type,
  className,
  onChange,
  placeholder,
  value,
  name,
  required,
  error
}) => (
    <>
  <input
    name={name}
    type={type}
    value={value}
    className={className}
    onChange={onChange}
    placeholder={placeholder}
    {...required}
  />
  <br />
    <p className='input-error'>{error}</p>
  <br />
  </>
);

Input.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  // eslint-disable-next-line react/require-default-props
  required: PropTypes.object,
  error: PropTypes.string,
};

Input.defaultProps = {
  name: '',
  type: 'text',
  className: 'input',
  placeholder: '',
  value: '',
  error: '',
};

export default Input;