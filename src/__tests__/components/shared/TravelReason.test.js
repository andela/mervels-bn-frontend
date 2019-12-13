import React from 'react';
import {shallow} from '../../../config/enzyme.config';
import TravelDetails from '../../../components/shared/TravelReason';

const reason = "this is a generic reason which must be longer than thirty characters";
describe('<TravelDetails /> component', () => {
    it('should render without crashing', () => {
      const wrapper = shallow(<TravelDetails reason={reason} classes="class1"/>);
      const reasonText = wrapper.find('.travel-reacon-container');
      expect(reasonText.props().className).toEqual('travel-reacon-container class1');
      expect(wrapper).toHaveLength(1);
    });
});