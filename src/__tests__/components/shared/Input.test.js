import React from 'react';
import {shallow} from '../../../config/enzyme.config';
import Input from '../../../components/shared/input';

describe('Input component', () => {
    it('renders input component without crashing', () => {
        const wrapper = shallow(<Input type='text' name='email' placeholder='Email' classes='' value='' onChange={jest.fn()} error='' />);
        expect(wrapper).toHaveLength(1);
    });
});