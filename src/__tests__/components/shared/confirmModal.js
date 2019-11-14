import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../../components/shared/confirmModal';

describe('Input component unit test', () => {
    it('render profile component', () => {
        const wrapper = shallow(<Modal closeModal={jest.fn()} confirm={jest.fn()} />);
        expect(wrapper).toHaveLength(1);
    });
});