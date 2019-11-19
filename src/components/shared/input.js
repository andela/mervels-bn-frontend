/* eslint-disable react/require-default-props */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

const Input = ({inputType, name, placeholder, classes, value, onChange, error, disabled, required}) => {
    return(
        <>
            <input
                id={name}
                type={inputType}
                className={classes}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                autoComplete='on'
                disabled={disabled}
                {...required}
            /><br />
            <p className='form-error'>{error}</p>
            <br />
        </>
    );
};

Input.defaultProps = {
    inputType: 'text',
    classes: 'input',
    error: '',
    placeholder: '',
    disabled: ''
};

Input.propTypes = {
    inputType: PropTypes.string,
    // eslint-disable-next-line react/require-default-props
    value: PropTypes.string,
    classes: PropTypes.string,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    // eslint-disable-next-line react/require-default-props
  required: PropTypes.object
};

export default Input;