/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import { mount } from 'enzyme';
import React from 'react';
import { RatingCompomentTest, mapStateToProps } from '../../../components/shared/ratingCompoment';

let wrapper;

describe('RequestView Component', () => {
    let props = {
        accommodationId: 2,
        getUpdate: jest.fn(),
        rateAccommodation: jest.fn(),
        rate: {
            rate: {},
            error: ""
        },
    };

    beforeEach(() => {
      wrapper = mount(
        <RatingCompomentTest {...props} />,
      );
    });
    beforeEach(() => {
      jest.restoreAllMocks();
    });

    it('should render Comments component', () => {
      expect(wrapper).toHaveLength(1);
    });

    it('should render Comments component with user ratings', () => {
        props = {
            ...props,
            userRating: {
                averageRating: 2,
                userRating: 2
            }
        };
        wrapper = mount(
            <RatingCompomentTest {...props} />,
          );
          wrapper.setProps({  userRating: {
            averageRating: 3,
            userRating: 2
        } });
      expect(wrapper).toHaveLength(1);
    });

    it('should  test an rating', () => {
        const rating = wrapper.find('RatingSymbol[index=1]');
        rating.simulate('click');
        const {rateAccommodation, accommodationId} = wrapper.instance().props;
        expect(rateAccommodation).toHaveBeenCalledWith({rating: 1}, accommodationId);
    });

    it('should test the mapStateToProps for rating', () => {
        const initialState = {
            rateAccommodationReducer:{},
        };
        expect(mapStateToProps(initialState).rate).toEqual({});
    });
});
