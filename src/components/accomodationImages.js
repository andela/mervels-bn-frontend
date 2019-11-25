/* eslint-disable prefer-destructuring */
/* eslint-disable no-const-assign */
/* eslint-disable react/no-array-index-key */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export class AccommodationImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imUrl: ''
        };
    }

    handleChange = (value) => {
        this.setState({ imUrl: value });
    };

    smallCard = (value) => {
        return value;
    }

    render() {
        const { imageUrl } = this.props;
        const { imUrl } = this.state;
        let largeUrl;
        let gallery;
        if (imageUrl) {
            const firstUrl = (imUrl === '' ? imageUrl[0]: imUrl);
            largeUrl = firstUrl.replace("load/", "load/w_auto,h_400,c_scale/");
            gallery = imageUrl.map((image, index) => {
                const smallUrl = image.replace("load/", "load/w_90,h_80,c_scale/");
                return <div 
                key={`${image[0]}-${index}`}
                className="one_card imagecard"
                style={{background: `url(${smallUrl})`}} 
                onClick={()=>this.handleChange(image)}
                role ="presentation"
                />;
            });
        }
        
        return (
            <>
            <div className="im" style={{background: `url(${largeUrl})`}} />
            <div className="other-images scroll_container">
                {gallery}
            </div>
            </>
        );
    }
};

AccommodationImages.propTypes = {
    imageUrl: PropTypes.array.isRequired, 
};
export default AccommodationImages;

