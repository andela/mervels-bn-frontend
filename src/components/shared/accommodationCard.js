/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';

const accommodationCard = (props) => {
    const {id, name, url, handleImageClick} = props;
    return(<div className="acc-card col-3" onClick={()=>handleImageClick(id, name)}>
        <img src={url || 'https://res.cloudinary.com/drayzii/image/upload/v1573796111/no-image-found-360x260_xvpnuj.png'} alt="Accommodation"/>
<p><a href={`/accommodation/${id}`}>{name}</a></p> 
    </div>);
};
accommodationCard.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    handleImageClick: PropTypes.func.isRequired,
};

export default accommodationCard;
