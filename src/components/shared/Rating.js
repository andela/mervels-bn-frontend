/* eslint-disable react/prop-types */
import React from 'react';

const Ratings = ({stars}) =>(
    <div>
        {stars.map(star =>(
            <i className="fas fa-star gold" key={star} />
        ))}
    </div>
);


export default Ratings;