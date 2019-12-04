/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { mount } from 'enzyme';
import { AddRoom } from '../../components/addRoom';


let wrapper;
const props = {
    createRooms: jest.fn(),
    submit: jest.fn(),
    submitting: false,
    id: 2
};

const mountsetUp = () => {
return mount(<AddRoom {...props} />);
};

describe.only('One Accommodation test', () => {
  test('should render component', () => {
    wrapper = mountsetUp();
    const button = wrapper.find('Input[name="roomname"]');
    expect(button).toHaveLength(1); 
  });
  test('should test handle change', () => {
    wrapper = mountsetUp();
    wrapper.find('Input[name="roomname"]').props().onChange({ target: { name: 'roomname', value: 'roomname' } });
    expect(wrapper.state().roomname).toEqual('roomname');
  });
  test('should test handle submit', () => {
    wrapper = mountsetUp();
    wrapper.find('Input[name="roomname"]').props().onChange({ target: { name: 'roomname', value: 'roomname' } });
    wrapper.find('Input[name="roomtype"]').props().onChange({ target: { name: 'roomtype', value: 'roomtype' } });
    wrapper.find('Input[name="roomprice"]').props().onChange({ target: { name: 'roomprice', value: 'roomprice' } });
    wrapper.find('Button[ButtonId="submit-rooms"]').simulate('click');
    expect(wrapper.state().roomname).toEqual('roomname');
  });
  test('should test adding new room', () => {
    wrapper = mountsetUp();
    wrapper.find('Button[ButtonId="add-room"]').simulate('click');
    expect(wrapper.state().rooms.length).toEqual(1);
  });
  test('should test removing new room', () => {
    wrapper = mountsetUp();
    wrapper.find('Button[ButtonId="add-room"]').simulate('click');
    wrapper.find('Button[ButtonId="remove-room"]').simulate('click');
    expect(wrapper.state().rooms.length).toEqual(0);
  });
  test('should test handle change for new room', () => {
    wrapper = mountsetUp();
    wrapper.find('Button[ButtonId="add-room"]').simulate('click');
    wrapper.find('Button[ButtonId="add-room"]').simulate('click');
    wrapper.find('Input[name="name"]').at(0).props().onChange({ target: { name: 'name', value: 'name' } });
    expect(wrapper.state().rooms[0].name).toEqual('name');
  });
  test('should test handle submit with empty new fields', () => {
    wrapper = mountsetUp();
    wrapper.find('Input[name="roomname"]').props().onChange({ target: { name: 'roomname', value: 'roomname' } });
    wrapper.find('Input[name="roomtype"]').props().onChange({ target: { name: 'roomtype', value: 'roomtype' } });
    wrapper.find('Input[name="roomprice"]').props().onChange({ target: { name: 'roomprice', value: 'roomprice' } });
    wrapper.find('Button[ButtonId="add-room"]').simulate('click');
    wrapper.find('Input[name="type"]').at(0).props().onChange({ target: { name: 'type', value: 'type' } });
    wrapper.find('Input[name="price"]').at(0).props().onChange({ target: { name: 'price', value: 10 } });
    wrapper.find('Button[ButtonId="submit-rooms"]').simulate('click');
    expect(wrapper.state().requiredError).toEqual('ALL * fields are required');
  });
  test('should test handle submit with empty first fields', () => {
    wrapper = mountsetUp();
    wrapper.find('Input[name="roomname"]').props().onChange({ target: { name: 'roomname', value: 'roomname' } });
    wrapper.find('Input[name="roomtype"]').props().onChange({ target: { name: 'roomtype', value: 'roomtype' } });
    wrapper.find('Button[ButtonId="add-room"]').simulate('click');
    wrapper.find('Input[name="name"]').at(0).props().onChange({ target: { name: 'name', value: 'name' } });
    wrapper.find('Input[name="type"]').at(0).props().onChange({ target: { name: 'type', value: 'type' } });
    wrapper.find('Input[name="price"]').at(0).props().onChange({ target: { name: 'price', value: 10 } });
    wrapper.find('Button[ButtonId="submit-rooms"]').simulate('click');
    expect(wrapper.state().requiredError).toEqual('ALL * fields are required');
  });
});

