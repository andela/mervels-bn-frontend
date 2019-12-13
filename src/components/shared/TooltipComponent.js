/* eslint-disable react/prop-types */
import React from 'react';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TooltipComponent({ passportName }) {
    return (
        <div className="tooltip"><FontAwesomeIcon icon={faUserCircle} size="2x" />
            <span className="tooltiptext">{passportName}</span>
        </div>
    );
}

export default TooltipComponent;
