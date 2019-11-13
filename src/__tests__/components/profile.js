/* eslint-disable import/no-named-as-default */
import React, { cloneElement } from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import ProfileComponent, { ProfileComponent as ProfilePage} from '../../components/ProfilePage';

const mockedStore = configureStore([thunk]);

let wrapper;
let wrapperMount;

describe('Profile Ccmponent unit tests', () => {
    beforeEach(() => {
        const store = mockedStore({
            profile: {
                status: '',
                data: {
                    passportName: '',
                    passportNumber: '',
                    firstName: '',
                    lastName: '',
                    birthDate: '',
                    department: '',
                    phoneNumber: '',
                    language: '',
                    currency: '',
                    gender: '',
                    location: '',
                    image: ''
                },
                error: ''
            }
        });
        wrapperMount = mount(<ProfileComponent store={store} getProfile={jest.fn()} history={{ push:jest.fn() }} updateProfile={jest.fn()} updatePicture={jest.fn()} />);
        wrapper = shallow(<ProfilePage getProfile={jest.fn()} history={{ push:jest.fn() }} profile={{ data: '' }} updateProfile={jest.fn()} updatePicture={jest.fn()} />);
    });

    it('render profile component', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('trigger server error', () => {
        const props = { profile: { error: 'Server error' } };
        wrapper.setProps(props);
        expect(wrapper.instance().props).toHaveProperty('profile', props.profile);
    });

    it('simulate token expiry', () => {
        const props = { profile: { error: 'Invalid or expired token used' } };
        wrapper.setProps(props);
        expect(wrapper.instance().props).toHaveProperty('profile', props.profile);
    });

    it('simulate successfull fetch', () => {
        const props = { profile: { status: 'fetch_success', data: {} } };
        wrapper.setProps(props);
        expect(wrapper.instance().props).toHaveProperty('profile', props.profile);
    });

    it('simulate successfull update', () => {
        const props = { profile: { status: 'update_success', data: {} } };
        wrapper.setProps(props);
        expect(wrapper.instance().props).toHaveProperty('profile', props.profile);
    });

    it('simulate unsuccessfull fetch', () => {
        const props = { profile: { status: 'fetch_error', error: '' } };
        wrapper.setProps(props);
        expect(wrapper.instance().props).toHaveProperty('profile', props.profile);
    });

    it('simulate unsuccessfull update', () => {
        const props = { profile: { status: 'update_error', error: '' } };
        wrapper.setProps(props);
        expect(wrapper.instance().props).toHaveProperty('profile', props.profile);
    });

    it('start updating', () => {
        const state = { updating: true };
        wrapper.setState(state);
        expect(wrapper.instance().state).toHaveProperty('updating', state.updating);
    });

    it('simulate uploading event', () => {
        const state = { updating: true, uploading: true };
        wrapper.setState(state);
        expect(wrapper.instance().state).toHaveProperty('updating', state.updating);
        expect(wrapper.instance().state).toHaveProperty('uploading', state.uploading);
    });

    it('start updating', () => {
        wrapperMount.find('#edit-profile').simulate('click');
        expect(wrapperMount.find('Profile').props()).toHaveProperty('updating', true);
    });

    it('update a text field', () => {
        wrapperMount.find('#edit-profile').simulate('click');
        wrapperMount.find('Input[name="firstName"]').simulate('change', { target: { name: 'firstName', value: 'New' }, persist: jest.fn() });
        expect(wrapperMount.find('Profile').props()).toHaveProperty('firstName', 'New');
    });

    it('update a text field', () => {
        wrapperMount.find('#edit-profile').simulate('click');
        wrapperMount.find('Input[name="firstName"]').simulate('change', { target: { name: 'firstName', value: '' }, persist: jest.fn() });
        expect(wrapperMount.find('Profile').props()).toHaveProperty('firstName', '');
    });

    it('should submit profile info', () => {
        wrapperMount.find('#edit-profile').simulate('click');
        wrapperMount.find('Input[name="firstName"]').simulate('change', { target: { name: 'firstName', value: 'New' }, persist: jest.fn() });
        wrapperMount.find('#update-profile-form').simulate('submit', { preventDefault: jest.fn() });
        expect(wrapperMount.find('Profile').props()).toHaveProperty('submitting', true);
    });

    it('should not submit profile info with errors', () => {
        wrapper.setProps({
            children: cloneElement(wrapper.props().children, {
                handleChange: ({ target: { name: 'firstName', value: 'N' }, persist: jest.fn() })
            }),
         });         
        expect(wrapperMount.find('Profile').props()).toHaveProperty('errors');
    });

    it('should submit profile info', () => {
        const data = {
            passportName: 'p',
            passportNumber: '',
            firstName: '',
            lastName: '',
            birthDate: '',
            department: '',
            phoneNumber: '',
            language: '',
            currency: '',
            gender: '',
            location: ''
        };
        wrapperMount.find('#edit-profile').simulate('click');
        wrapperMount.setProps({
            children: cloneElement(wrapper.props().children, { ...data }),
         });
        wrapperMount.find('#update-profile-form').simulate('submit', { preventDefault: jest.fn() });
        expect(wrapperMount.find('Profile').props()).toHaveProperty('updating', true);
    });

    it('should upload profile picture', () => {
        wrapperMount.find('#file').simulate('change', { target: { files: [{ type: 'image/png' }] } });
        expect(wrapperMount.find('Profile').props()).toHaveProperty('uploading', true);
    });

    it('should not upload profile picture with wrong type', () => {
        wrapperMount.find('#file').simulate('change', { target: { files: [{ type: 'application/pdf' }] } });
        expect(wrapperMount.find('Profile').props()).toHaveProperty('uploading', false);
    });

    it('should test submit with errors', () => {
        wrapper.setState({
            errors: {
                firstName: 'Too Short'
            }
        });
        wrapper.instance().handleSubmit({ target: { name: 'firstName', value: 'Ne' }, preventDefault: jest.fn() });
        expect(wrapper.instance().state).toHaveProperty('errors', { firstName: 'Too Short' });
    });

    it('render the component', () => {
        expect(wrapperMount).toHaveLength(1);
    });
});


