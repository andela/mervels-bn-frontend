/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import Like, { LikeComponent } from '../../components/LikeComponent';

let wrapper;
let wrapperMounted;

const props = {
    likes: 10,
    liked: true
};

const mockedStore = configureStore([thunk]);

describe('Test Like Component', () => {
    beforeEach(() => {
        wrapper = shallow(<LikeComponent likeAction={jest.fn()} />);
        wrapperMounted = mount(<Like store={mockedStore()} {...props} />);
    });

    it('should render the component', done => {
        expect(wrapper).toHaveLength(1);
        expect(wrapperMounted).toHaveLength(1);
        done();
    });

    it('should manage like or unlike success', done => {
        wrapper.setProps({ like: { status: 'like_success' } });
        expect(wrapper.state()).toEqual({});
        done();
    });

    it('should manage like or unlike error', done => {
        wrapper.setProps({ like: { status: 'like_error' } });
        expect(wrapper.state().liked).toEqual(true);
        done();
    });

    it('should manage like or unlike error', done => {
        wrapper.setState({ liked: true });
        wrapper.setProps({ like: { status: 'like_error' } });
        expect(wrapper.state().liked).toEqual(false);
        done();
    });

    it('should not do anything if like status is unknown', done => {
        wrapper.setProps({ like: { status: 'x' } });
        expect(wrapper.state()).toEqual({});
        done();
    });

    it('should not do anything if like is not available in props', done => {
        wrapper.setProps({ x: 'x' });
        expect(wrapper.state()).toEqual({});
        done();
    });

    it('should click the like button', done => {
        wrapper.find('#like-button').props().onClick();
        done();
    });

    it('should click the unlike button', done => {
        wrapper.setState({ liked: true });
        wrapper.find('#like-button').props().onClick();
        done();
    });
});