/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React from 'react';

// eslint-disable-next-line consistent-return
export const handleDisplay = (values) => {
    const items = [];
    for (let i = 0; i < values.length; i += 1) {
        items.push(<li key={`${values[i]}-${i}`}>{values[i]}</li>);
        if (i === 1) {
          break;
        }
    }
    return items;
};

export const ViewServices = ({ amenities, services }) => {
    return (
        <>
            <div className="amenities">
                <h4>Amenities</h4>
                <ol>
                {handleDisplay(amenities)}
                </ol>
            </div>
            <div className="services">
                <h4>Services</h4>
                <ol>
                {handleDisplay(services)}
                </ol>
            </div>
        </>
    );
};

export default ViewServices;
