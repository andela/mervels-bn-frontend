/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import { AccommodationImages } from '../../components/accomodationImages';

let wrapper;
const props = {
  imageUrl: ["load/", "load/", "load/"]
};

const setUp = () => {
    return mount(<AccommodationImages {...props} />);
};

describe('AccommodationImages', () => {
    test('should update big image', () => {
    wrapper = setUp();
    wrapper.find('.imagecard').at(0).simulate('click');
    expect(wrapper.instance().state.imUrl).toBe("load/");
    });
    test('should update big image', () => {
        wrapper = setUp();
        const value = wrapper.instance().smallCard('red');
        expect(value).toBe('red');
    });
    
});
