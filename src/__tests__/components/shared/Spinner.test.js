import React from 'react';
import {shallow} from '../../../config/enzyme.config';
import {Spinner} from '../../../components/shared/Spinner';

describe('<Spinner /> component', () => {
    it('should render without crashing', () => {
      const wrapper = shallow(<Spinner className="prop-class"/>);
      const spinner = wrapper.find('.spinner-default');
      expect(spinner.props().className).toEqual('spinner-default prop-class');
      expect(wrapper).toHaveLength(1);
    });
});