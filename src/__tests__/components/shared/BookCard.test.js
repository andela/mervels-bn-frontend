/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {shallow, mount} from '../../../config/enzyme.config';
import BookCard from '../../../components/shared/BookCard';

const props = {destination: 'KIGALI',
    travelDate: '2019-12-25',
    returnDate: '2020-01-25',
    checkinDate: '2019-12-26',
    checkoutDate: '2020-01-20',
    parent: '0',
    handleChange: jest.fn(),
    accommodations: [{
        locationId: 1,
        name: 'SHERATON'
    },{
        locationId: 2,
        name: 'SERENA'
    }],
    locationId: 1,
    handleFocus: jest.fn(),
    rooms: [{id: 1, accommodationId: 1, name: 'MASSAIMARA'}, {id: 2, accommodationId: 2, name: 'NGORONGORO'}],
    trips: [{accommodationId: 1, accommodation: 'SERENA', room: 1}]};
describe('<Book Card /> component', () => {
    it('should render without crashing', () => {
      const wrapper = shallow(<BookCard {...props}/>);
      expect(wrapper).toHaveLength(1);
    });
});

describe('<book card component', () => {
    it('should test mouse move', () => {
        const trips = [{accommodationId: 1, accommodation: null, room: 2, availableRooms: [{name: 'NGORONGORO'}, {name: 'NGORONGORO'}]}];
        props.trips= trips;
        const wrapper = mount(<BookCard {...props }/>);
        wrapper.simulate('mouseover');
        const {handleFocus} = wrapper.props();
        expect(handleFocus).toHaveBeenCalledTimes(1);
      });
});

describe('<book card component', () => {
    it('should render with available rooms', () => {
        const trips = [{accommodationId: 1, accommodation: null, room: 1, availableRooms: [{name: 'MASSAIMARA'}, {name: 'NGORONGORO'}]}];
        props.trips= trips;
        const wrapper = mount(<BookCard {...props }/>);
        wrapper.simulate('mouseOver');
        expect(wrapper).toHaveLength(1);
      });

      it('should render spinners before data comes', () => {
        props.accommodations= [];
        const wrapper = shallow(<BookCard {...props }/>);
        const spinner = wrapper.find('.spinner-center');
        expect(spinner).toHaveLength(1);
      });
});

