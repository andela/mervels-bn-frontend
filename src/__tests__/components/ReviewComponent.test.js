/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import Review, { ReviewComponent } from '../../components/ReviewComponent';

const mockedStore = configureStore([thunk]);

let wrapper;
let wrapperMounted;

const props = {
    feedbackAction: jest.fn(),
    accommodation: 1,
    feedback: {},
    reviewError: ''
};

describe('Test add review component', () => {
    beforeEach(() => {
        wrapper = shallow(<ReviewComponent { ...props } />);
        wrapperMounted = mount(<Review store={mockedStore()} { ...props } />);
    });

    it('should render the component', done => {
        expect(wrapper).toHaveLength(1);
        expect(wrapperMounted).toHaveLength(1);
        done();
    });

    it('should render the component with reviewError', done => {
        wrapper.setProps({ reviewError: 'x' });
        expect(wrapper).toHaveLength(1);
        done();
    });

    it('should simulate text area value change', done => {
        wrapper.find('TextArea').props().onChange({
            target: {
                name: 'review',
                value: 'x'
            }
        });
        expect(wrapper.state().review).toEqual('x');
        done();
    });

    it('should simulate review submission', done => {
        wrapper.find('Button[ButtonId="add-review"]').props().onClick();
        expect(wrapper.state().isSubmitting).toEqual(true);
        done();
    });
});