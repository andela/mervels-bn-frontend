/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import PropTypes from 'prop-types';

const Select = ({name, selected, classes, options, onChange, error, disabled}) => {
    const data = options.map((element) => (<option value={element} selected={selected === element}>{element}</option>));
    return(
        <>
            <select
                className={classes}
                name={name}
                onChange={onChange}
                disabled={disabled}
            >
                {data}
            </select>
            { error ? <p className='form-error'>{error}</p> : '' }
            <br />
        </>
    );
};

Select.defaultProps = {
    classes: 'input',
};

Select.propTypes = {
    selected: PropTypes.string.isRequired,
    options: PropTypes.arrayOf.isRequired,
    classes: PropTypes.string,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
};

export default Select;