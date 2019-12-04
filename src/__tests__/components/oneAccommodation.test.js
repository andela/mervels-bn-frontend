/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow, mount } from 'enzyme';
import { OneAccommodation } from '../../components/oneAccommodation';


let wrapper;
const props = {
  getAccommodation: jest.fn(),
  accommodation: {
      accommodation: {
        Location: {
            city: 'city',
            country: 'country'
        },
        amenities: ['amenity1', 'amenity2'],
        maplocations:{
            lat: 1,
            lng: 2
        },
        Rooms: [
            {name: 'room1', type: 'type', price: 200},
            {name: 'room1', type: 'type', price: 200},
            {name: 'room1', type: 'type', price: 200},
            {name: 'room1', type: 'type', price: 200},
            {name: 'room1', type: 'type', price: 200}
        ],
        services: ['service1', 'service2'],
        description: 'description',
        imageUrl: [
            'load/first',
            'load/second'
        ]
      }
  },
  match: {
    params: {
        id: 1
    }
  },
  user: {
    id: 2,
    userRoles: 'Accommodation Supplier'
  }
};

const mountsetUp = () => {
return mount(<OneAccommodation {...props} />);
};


const shallowsetUp = () => {
  return shallow(<OneAccommodation {...props} />); 
};

describe.only('One Accommodation test', () => {
  test('should render component', () => {
    wrapper = mountsetUp();
    const container = wrapper.find('.location');
    expect(container).toHaveLength(1); 
  });
  test('should render with empty accommodations', () => {
    wrapper = mount(<OneAccommodation {...props} accommodation={{accommodation:{}}}/>);
    wrapper.find('.view-all').simulate('click');
    const button = wrapper.find('#create-start');
    expect(button).toHaveLength(1); 
  });
  test('should toggle showmodal', () => {
    wrapper = mountsetUp();
    wrapper.find('.view-all').simulate('click');
    expect(wrapper.instance().state.showModal).toBe(true);
  });
  test('should test toggle create', () => {
    wrapper = shallowsetUp();
    wrapper.setState({ isAllowed: true });
    wrapper.find('Button[ButtonId="create-start"]').simulate('click');
    expect(wrapper.state().isCreating).toBe(true);
  });
  test('should test submit function', () => {
    wrapper = shallowsetUp();
    wrapper.instance().submit();
    expect(wrapper.state().submitting).toBe(true);
  });
  test('should render when room is added', () => {
    wrapper = shallowsetUp();
    wrapper.setProps({ addRooms: { rooms : ['']} });
    expect(wrapper.state().roomsList).toEqual(['']);
  });
  test('should test add room error', () => {
    wrapper = shallowsetUp();
    wrapper.setState({ roomError: 'bar' });
    wrapper.setProps({ addRooms: { error : 'error'} });
    expect(wrapper.state().roomError).toEqual('error');
  });
  test('should test an empty addroom prop', () => {
    wrapper = shallowsetUp();
    wrapper.setProps({ addRooms: { } });
    expect(wrapper.state().roomError).toBe(null);
  });
  test('should not display create button', () => {
    wrapper = shallow(<OneAccommodation {...props} user={{id:4, userRoles: 'Not allowed'}}/>);
        wrapper.setState({ isAllowed: false });
    expect(wrapper.state().isAllowed).toBe(false);
  });
});

