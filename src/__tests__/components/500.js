import React from 'react';
import { shallow } from 'enzyme';
import ServerErrorPage from '../../components/500Page';

describe('500 Page Ccmponent unit test', () => {
    it('render profile component', () => {
        const wrapper = shallow(<ServerErrorPage />);
        expect(wrapper).toHaveLength(1);
    });
});