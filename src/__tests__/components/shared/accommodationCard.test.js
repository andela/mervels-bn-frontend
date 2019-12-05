/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {shallow} from '../../../config/enzyme.config';
import AccommodationCard from '../../../components/shared/accommodationCard';

const props = {id: 1, name: 'SHERATON', handleImageClick: jest.fn()};
describe('<accommodationCard /> component', () => {
    it('should render without crashing', () => {
      const wrapper = shallow(<AccommodationCard {...props}/>);
      wrapper.simulate('click');
      expect(wrapper).toHaveLength(1);
    });
});