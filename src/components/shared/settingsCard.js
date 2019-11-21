/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

const SettingsCard = (props) => {
    const { title, children, handleSubmit, classes} = props;
    return(
    <>
        <div className='roles-panel col-9 offset-3 m-bottom-3'>
            <h3 className="title">{title}</h3>
            <div className="grid">
                <form className={`col-9 offset-4 ${classes}`} onSubmit={handleSubmit}>
                    {children}
                </form>
            </div>
        </div>
    </>);
};

SettingsCard.prototype = {
    title: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    classes: PropTypes.string
};

export default SettingsCard;