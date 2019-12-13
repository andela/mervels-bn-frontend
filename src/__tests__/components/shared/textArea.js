import React from 'react';
import { shallow } from 'enzyme';
import TextArea from '../../../components/shared/TextArea';

describe('Input component unit test', () => {
    it('render profile component', () => {
        const wrapper = shallow(<TextArea name='' onChange={jest.fn()} />);
        expect(wrapper).toHaveLength(1);
    });
    it('render profile component', () => {
        const wrapper = shallow(<TextArea name='' onChange={jest.fn()} />);
        wrapper.setProps({ markup: '<p>OK</p>' });
        expect(wrapper.state().value.toString('html')).toEqual('<p>OK</p>');
    });
    it('render profile component', () => {
        const wrapper = shallow(<TextArea name='' onChange={jest.fn()} />);
        wrapper.find('e').props().onChange('value');
        expect(wrapper.state().value).toEqual('value');
    });
});