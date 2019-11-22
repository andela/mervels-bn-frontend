/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
import React from 'react';

const TravelReason = (props) => {

    const {classes, reason} = props;
    const element = document.createElement('div');
    element.innerHTML = reason;
    return(
        <div className={`travel-reacon-container ${classes}`}>
            <div className="title-reason">
                Travel Reason:
            </div>
            <div className="trv-reason">
            <div className = "main-reason" dangerouslySetInnerHTML={{__html: reason}} />
            </div>
        </div>
    );

};

export default TravelReason;