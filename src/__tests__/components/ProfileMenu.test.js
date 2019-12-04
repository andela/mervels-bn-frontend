/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { shallow } from '../../config/enzyme.config';
import ProfileMenu from '../../components/ProfileMenu';

const wrapper = shallow(<ProfileMenu history={{ push: jest.fn() }} handlePane={jest.fn()} />);

describe('Test Profile Menu Pane', ()=>{
    it('Should display Profile Menu Pane', done =>{
        expect(wrapper).toHaveLength(1);
        done();
    });
    it('Should log out', (done) => {
        window.localStorage.removeItem = () => jest.fn();
        wrapper.find('#log-out').props().onClick();
        done();
    });
    it('Should go to profile', (done) => {
        wrapper.find('#go-to-profile').props().onClick();
        done();
    });
});

