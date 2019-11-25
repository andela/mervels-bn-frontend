import React from 'react';
import { shallow } from 'enzyme';
import ReviewComponent from '../../components/OneReviewComponent';

const wrapper = shallow(<ReviewComponent review={{ User: '' }} />);
const wrapperWithProfile = shallow(<ReviewComponent review={{
    User: {
        ProfilePicture: {
            url: 'url'
        }
    }
}}/>);

describe('Test add Review Component', () => {
    it('should render component', done => {
        expect(wrapper).toHaveLength(1);
        expect(wrapperWithProfile).toHaveLength(1);
        done();
    });
});