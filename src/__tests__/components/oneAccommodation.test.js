/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import configureMockStore from "redux-mock-store";
import Accommodation, { OneAccommodation } from '../../components/oneAccommodation';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

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
        ],
        Feedbacks: [{
          User: {
            ProfilePicture: null
          }
        }, {
          User: {
            ProfilePicture: { url: 'url' }
          }
        }]
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
return mount(
  <Provider store={mockStore({ accommodation: props.accommodation })}>
    <Accommodation {...props} />
  </Provider>
);
};


const shallowsetUp = () => {
  return shallow(<OneAccommodation {...props} />); 
};

const reviewSuccessSetup = (query) => {
  return shallow(<OneAccommodation {...props} location={{search: query}} />);
};

const initialState = {
  isAllowed: true,
  isCreating: false,
  liked: false,
  reviewError: false,
  roomError: null,
  roomsList: "",
  showModal: false,
  submitting: false,
};

describe('One Accommodation test', () => {

  test('should render', () => {
    wrapper = mountsetUp();
    const container = wrapper.find('.location');
    expect(container).toHaveLength(1); 
  });
  test('should render component', () => {
    wrapper = mountsetUp();
    const container = wrapper.find('.location');
    expect(container).toHaveLength(1); 
  });
  test('should render with empty accommodations', () => {
    wrapper = mount(
      <Provider store={mockStore()}>
        <OneAccommodation {...props} accommodation={{accommodation:{}}}/>
      </Provider>
    );
    wrapper.find('.view-all').simulate('click');
    const button = wrapper.find('#create-start');
    expect(button).toHaveLength(1); 
  });
  test('should toggle showmodal', () => {
    wrapper = mountsetUp();
    wrapper.find('.view-all').simulate('click');
    expect(wrapper.find('Modal')).toHaveLength(1);
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
  test('should check if user is authentiacted', () => {
    wrapper = shallowsetUp();
    wrapper.setProps({ user: '' });
  });
  test('should not display create button', () => {
    wrapper = shallow(<OneAccommodation {...props} user={{id:4, userRoles: 'Not allowed'}}/>);
        wrapper.setState({ isAllowed: false });
    expect(wrapper.state().isAllowed).toBe(false);
  });
});

describe('Test on Like and review', () => {
  it('should receive success props on like', done => {
    wrapper = shallowsetUp();
    wrapper.setProps({ like: { status: 'like_success' } });
    expect(wrapper.state()).toEqual(initialState);
    done();
  });
  it('should receive error props on like', done => {
    wrapper = shallowsetUp();
    wrapper.setProps({ like: { status: 'like_error' } });
    expect(wrapper.state()).toEqual(initialState);
    done();
  });
  it('should receive error props on like', done => {
    wrapper = shallowsetUp();
    wrapper.setState({ liked: true });
    wrapper.setProps({ like: { status: 'like_error' } });
    expect(wrapper.state()).toEqual({ ...initialState, liked: true });
    done();
  });
  it('should receive unknown props on like', done => {
    wrapper = shallowsetUp();
    wrapper.setProps({ like: { status: 'x' } });
    expect(wrapper.state()).toEqual(initialState);
    done();
  });
  it('should receive success props on feedback', done => {
    wrapper = shallowsetUp();
    wrapper.setProps({ feedback: { status: 'feedback_success' } });
    done();
  });
  it('should receive error props on feedback', done => {
    wrapper = shallowsetUp();
    wrapper.setProps({ feedback: { status: 'feedback_error' } });
    done();
  });
  it('should receive unknown props on feedback', done => {
    wrapper = shallowsetUp();
    wrapper.setProps({ feedback: { status: 'x' } });
    done();
  });
  it('should render on review success', done => {
    wrapper = reviewSuccessSetup('?review=success');
    expect(wrapper).toHaveLength(1);
    done();
  });
  it('should render on review success - unknown', done => {
    wrapper = reviewSuccessSetup('?review=x');
    expect(wrapper).toHaveLength(1);
    done();
  });
});