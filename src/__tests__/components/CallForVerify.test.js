/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {shallow} from '../../config/enzyme.config';
import CallForVerify from '../../components/CallForVerify';

describe("<CallForVerify component/>", () => {
    it('should render without crashing', () => {
        const wrapper = shallow(<CallForVerify/>);
        const container = wrapper.find('.c4v');
        const barefootLogo = wrapper.find('.barefoot-logo');
        expect(container).toHaveLength(1);
        expect(barefootLogo).toHaveLength(1);
    });
    it("should not render this page if logged in", ()=>{
        const props = {history: {push: jest.fn()}};
        localStorage.setItem('bareFootToken', 'generictoken');
        const wrapper = shallow(<CallForVerify {...props}/>);
        const {push} = wrapper.instance().props.history;
        expect(push).toHaveBeenCalledWith('/dashboard');
    });
});