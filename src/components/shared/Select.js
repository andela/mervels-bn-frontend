/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import PropTypes from 'prop-types';

const Select = ({name, ids, selected, classes, options, onChange, error, disabled}) => {
    const message = options.length > 1 ? 'Select One...': 'None Available';
    const data = options.map((element, index) => (<option value={ ids.length > 0 && index > 0 ? ids[index]: element } selected={selected === element}>{element || message}</option>));
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
    disabled: '',
    ids: ''
};

Select.propTypes = {
    selected: PropTypes.string.isRequired,
    options: PropTypes.arrayOf.isRequired,
    ids: PropTypes.array,
    classes: PropTypes.string,
    name: PropTypes.string.isRequired,
    disabled: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string.isRequired,
};

export default Select;