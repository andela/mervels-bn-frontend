/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';


export const Accommodation = ({ id, name, location, likes, rooms, imageUrl, description  }) => {
    const largeUrl = imageUrl[0].replace("load/", "load/w_auto,h_200,c_scale/");
    return (
        <>
            <a className="red" href={`/accommodation/${id}`}>
                <div className="image" style={{background: `url(${largeUrl})`}}/>
                <div className="info">
                    <div className="top">
                        <p className="name">{name}</p>
                        <span className="location"><p>{location}</p></span>
                        <div className="rate">
                            <span className="fa fa-star checked" />
                            <span className="fa fa-star checked" />
                            <span className="fa fa-star checked" />
                            <span className="fa fa-star" />
                            <span className="fa fa-star" />
                        </div>
                    </div>
                    <div className="description" dangerouslySetInnerHTML={{ __html: `${description.substring(0, 180)}....` }} />
                    <div className="bottom">
                        <span className="like">
                            {likes} <i className="fa fa-thumbs-up" />
                        </span>
                        <span>
                            {rooms} rooms
                        </span>
                    </div>
                </div>
            </a>
        </>
    );
};

Accommodation.propTypes = {
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    likes: PropTypes.string.isRequired,
    rooms: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.array.isRequired,
    description: PropTypes.string.isRequired,
};

export default Accommodation;
