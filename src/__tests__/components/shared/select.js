import React from 'react';
import { shallow } from 'enzyme';
import Select from '../../../components/shared/Select';

describe('Select component unit test', () => {
    it('render profile component', () => {
        const wrapper = shallow(<Select selected='' name='' options={['a', 'b']} classes='' value='' disabled='' onChange={jest.fn()} error='x' />);
        expect(wrapper).toHaveLength(1);
    });
});