import React from 'react';
import { shallow } from 'enzyme';
import SocialAuth from '../../../components/shared/socialAuth';

describe('LoginPAGE', () => {
    test('should render', () => {
      const wrapper = shallow(<SocialAuth />);
      expect(wrapper).toMatchSnapshot();
    });
});