/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { Accommodations } from '../../components/accommodations';


let wrapper;
const props = {
    getAccommodations: jest.fn(),
    getLocations: jest.fn(), 
    addAccommodation: {
        accommodation:{
            id: 2
        }
    },
    accommodations: {
        accommodations: [
            {
                name: 'name',
                Likes : [ { id: 2 } ],
                rooms: 1,
                location: 'location',
                id: 2,
                imageUrl: ['load/'],
                description: 'Nice hotel close to town. For all business related tasks in Kigali Town'
            }
        ]
    },
    history: {
        push: jest.fn()
    },
    locations: [{
        id: 1, 
        country: 'country', 
        city: 'city'
    }],
    user: {
        id: 2,
        userRoles: 'Accommodation Supplier'
    }
};

const setUp = () => {
    return mount(<Accommodations {...props} />);
};
const shallowsetUp = () => {
    return shallow(<Accommodations {...props} />); 
};

describe.only('Accommodations', () => {
    test('should render component', () => {
      wrapper = setUp();
      const container = wrapper.find('.bg-img');
      expect(container).toHaveLength(1); 
    });
    test('should test toggle create', () => {
        wrapper = shallowsetUp();
        wrapper.setState({ isAllowed: true });
        wrapper.find('Button[ButtonId="create-start"]').simulate('click');
        expect(wrapper.state().isCreating).toBe(true);
    });
    test('should test add accommodation error', () => {
        wrapper = shallowsetUp();
        wrapper.setState({ accError: 'bar' });
        wrapper.setProps({ addAccommodation: { error : 'error'} });
        expect(wrapper.state().accError).toEqual('error');
    });
    test('should test add accommodation error', () => {
        wrapper = shallowsetUp();
        wrapper.setState({ accError: 'bar' });
        wrapper.setProps({ addAccommodation: null });
        expect(wrapper.state().accError).toEqual('bar');
    });
    test('should test an empty accommodation prop', () => {
        wrapper = shallowsetUp();
        wrapper.setProps({ addAccommodation: { } });
        expect(wrapper.state().isCreating).toBe(false);
    });
    test('should test paginate function', () => {
        wrapper = setUp();
        wrapper.instance().paginate(0);
        expect(wrapper.instance().state.currentPage).toBe(0);
    });
    test('should test submit function', () => {
        wrapper = shallowsetUp();
        wrapper.instance().submit();
        expect(wrapper.state().submitting).toBe(true);
    });
    test('should test request per page being null', () => {
        wrapper = shallowsetUp();
        wrapper.setState({ requestsPerPage: 0 });
        expect(wrapper.state().submitting).toBe(false);
    });
    test('should not render create button', () => {
        wrapper = shallow(<Accommodations {...props} user={{id:4, userRoles: 'Not allowed'}}/>);
        wrapper.setState({ isAllowed: false });
        expect(wrapper.state().isAllowed).toBe(false);
    });
});