/* eslint-disable default-case */
/* eslint-disable import/prefer-default-export */
import React from 'react';
import SingleRoom from '../components/viewRoom';

export const enhanceRooms = (values) => {
    let counter = 0;
    return values.map((room) => {
        let classes = [];
        switch (counter) {
            case 0:
                classes = ["thir", "third"];
                break;
            case 1:
                classes = ["fir", "first"];
                break;
            case 2:
                classes = ["sec", "second"];
                break;
        }
        if(counter < 2){
            counter += 1;
        } else {
            counter = 0;
        }
        return <SingleRoom 
        name={room.name}
        type={room.type}
        price={room.price}
        classes={classes}
        />;
    });
};