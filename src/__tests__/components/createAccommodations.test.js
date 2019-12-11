/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { CreateAccommodation } from '../../components/createAccommodation';

let wrapper;

const props = {
    submit: jest.fn(),
    createAccommodation: jest.fn(),
    locations: [{
        id: 1, 
        country: 'country', 
        city: 'city'
    },{
        id: 2, 
        country: 'country', 
        city: 'city'
    }]
};

const description = 'this should be more than 150 characters or else it will set an error and wont submit trust me it wontthis should be more than 150 characters or else it will set an error and wont submit trust me it wont';

const setUp = () => {
    return mount(<CreateAccommodation {...props} />);
};

describe.only('Create Accommodation', () => {
    test('should render component', () => {
      wrapper = setUp();
      const button = wrapper.find('Input[name="accName"]');
      expect(button).toHaveLength(1); 
    });
    test('should render component', () => {
      wrapper = setUp();
      wrapper.find('Button[ButtonId="add-service"]').props().onClick({ target: { id: 'add-service' } });
      expect(wrapper.instance().state.services).toEqual(['']);
    });
    test('should render component', () => {
      wrapper = setUp();
      wrapper.find('Button[ButtonId="add-amenity"]').props().onClick({ target: { id: 'add-amenity' } });
      expect(wrapper.instance().state.amenities).toEqual(['']);
    });
    test('should test handle change of amenity', () => {
      wrapper = shallow(<CreateAccommodation {...props} />);
      wrapper.find('Button[ButtonId="add-amenity"]').simulate('click');
      wrapper.find('Input[name="amenity"]').at(0).simulate('change', {target: {name: "amenity", value: "amenity"}});
      expect(wrapper.instance().state.amenities).toEqual(['amenity']);
    });
    test('should test handle change of services', () => {
      wrapper = shallow(<CreateAccommodation {...props} />);
      wrapper.find('Button[ButtonId="add-service"]').simulate('click');
      wrapper.find('Input[name="service"]').at(0).simulate('change', {target: {name: "service", value: "service"}});
      expect(wrapper.instance().state.services).toEqual(['service']);
    });
    test('should render component', () => {
      wrapper = setUp();
      wrapper.instance().getMapLocation({lat: 1, lng: 2});
      expect(wrapper.instance().state.maplocations).toEqual({lat: 1, lng: 2}); 
    });
    test('should test handle submit', () => {
        const fileContents = 'file contents';
        const file = new Blob([fileContents], {type : 'text/plain'});
        const mockSubmit = jest.fn();
        wrapper = mount(<CreateAccommodation createAccommodation={mockSubmit} locations={props.locations} submit={props.submit} />);
        wrapper.setState({ maplocations: { lat: 1,lng: 1 } });
        wrapper.find('Input[name="accName"]').simulate('change', {target: {name: "accName", value: "accName"}});
        wrapper.find('Select[name="location"]').props().onChange({ target: { name: 'location', value: 'location' } });
        wrapper.find('Input[name="serviceA"]').simulate('change', {target: {name: "serviceA", value: "serviceA"}});
        wrapper.find('TextArea[name="description"]').props().onChange({ target: { name: 'description', value: description } });
        wrapper.find('Input[name="amenityA"]').simulate('change', {target: {name: "amenityA", value: "amenityA"}});
        wrapper.find('input[name="images"]').simulate('change', {target: {name: "images", files: [file]}});
        wrapper.find('Button[ButtonId="submit-request"]').props().onClick({ target: { id: 'submit-request' } });
        expect(mockSubmit).toHaveBeenCalled();
    });
    test('should test handle submit', () => {
      const mockSubmit = jest.fn();
      wrapper = mount(<CreateAccommodation createAccommodation={mockSubmit} locations={props.locations} submit={props.submit}/>);
      wrapper.find('Input[name="accName"]').simulate('change', {target: {name: "accName", value: "accName"}});
      wrapper.find('Select[name="location"]').props().onChange({ target: { name: 'location', value: 'location' } });
      wrapper.find('Input[name="serviceA"]').simulate('change', {target: {name: "serviceA", value: "serviceA"}});
      wrapper.find('TextArea[name="description"]').props().onChange({ target: { name: 'description', value: 'description' } });
      wrapper.find('Input[name="amenityA"]').simulate('change', {target: {name: "amenityA", value: "amenityA"}});
      wrapper.find('Button[ButtonId="submit-request"]').props().onClick({ target: { id: 'submit-request' } });
      expect(wrapper.instance().state.requiredError).toBe('ALL * fields must be valid and are required');
    });
    it('should remove new amenity field', () => {
      wrapper = shallow(<CreateAccommodation {...props} />);
      wrapper.find('Button[ButtonId="add-amenity"]').simulate('click');
      wrapper.find('Button[ButtonId="remove-trip"]').props().onClick();
      expect(wrapper.instance().state.amenities.length).toEqual(0);
    });
    it('should remove new service field', () => {
      wrapper = shallow(<CreateAccommodation {...props} />);
      wrapper.find('Button[ButtonId="add-service"]').simulate('click');
      wrapper.find('Button[ButtonId="remove-trip"]').props().onClick();
      expect(wrapper.instance().state.services.length).toEqual(0);
    });
});
