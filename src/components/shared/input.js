/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';

function Input({inputType, name, placeholder, classes, value, onChange, error}) {
    return(
        <>
            <input
                type={inputType}
                className={classes}
                name={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                autoComplete='off'
            /><br />
            { error ? <p className='form-error'>{error}</p> : '' }
            <br />
        </>
    );
}

Input.defaultProps = {
    inputType: 'text',
    classes: 'input',
    error: '',
    placeholder: ''
};

Input.propTypes = {
    inputType: PropTypes.string,
    value: PropTypes.string.isRequired,
    classes: PropTypes.string,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    placeholder: PropTypes.string
};

export default Input;
// import React from 'react';
// import PropTypes from 'prop-types';

// const Input = ({
//   type,
//   className,
//   onChange,
//   placeholder,
//   value,
//   name,
// }) => (
//   <input
//     name={name}
//     type={type}
//     value={value}
//     className={className}
//     onChange={onChange}
//     placeholder={placeholder}
//   />
// );

// Input.propTypes = {
//   name: PropTypes.string,
//   type: PropTypes.string,
//   className: PropTypes.string,
//   onChange: PropTypes.func.isRequired,
//   placeholder: PropTypes.string,
//   value: PropTypes.string,
// };

// Input.defaultProps = {
//   name: '',
//   type: 'text',
//   className: 'input',
//   placeholder: '',
//   value: '',
// };

// export default Input;
