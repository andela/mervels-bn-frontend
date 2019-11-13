import React from 'react';
import { shallow } from 'enzyme';
import Input from '../../../components/shared/Input';

describe('Input component unit test', () => {
    it('render profile component', () => {
        const wrapper = shallow(<Input inputType='' name='' placeholder='' classes='' value='' onChange={jest.fn()} error='' />);
        expect(wrapper).toHaveLength(1);
    });
    it('render profile component with error', () => {
        const wrapper = shallow(<Input inputType='' name='' placeholder='' classes='' value='' onChange={jest.fn()} error='x' />);
        expect(wrapper).toHaveLength(1);
    });
});