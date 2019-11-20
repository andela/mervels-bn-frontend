/* eslint-disable import/no-named-as-default */
import React from 'react';
import { shallow } from 'enzyme';
import CreateOrEditRequest from '../../components/CreateOrEditRequest';

let wrapper;

describe('Create a Trip Request', () => {
    beforeEach(() => {
        wrapper = shallow(<CreateOrEditRequest history={{ push: jest.fn() }} toggleUpdating={jest.fn()} />);
    });

    it('render profile component', () => {
        expect(wrapper).toHaveLength(1);
    });

    it('should start a one-way trip update', () => {
        wrapper.find('Button[ButtonId="oneWayTrip"]').props().onClick({ target: { id: 'oneWayTrip' } });
        expect(wrapper.instance().state.oneWayTrip).toEqual(true);
    });

    it('should start a return trip update', () => {
        wrapper.find('Button[ButtonId="returnTrip"]').props().onClick({ target: { id: 'returnTrip' } });
        expect(wrapper.instance().state.returnTrip).toEqual(true);
    });

    it('should start a multi-city trip update', () => {
        wrapper.find('Button[ButtonId="multiCityTrip"]').props().onClick({ target: { id: 'multiCityTrip' } });
        expect(wrapper.instance().state.multiCityTrip).toEqual(true);
    });
});

describe('Update a Trip Request', () => {
    beforeEach(() => {
        wrapper = shallow(<CreateOrEditRequest updating history={{ push: jest.fn() }} toggleUpdating={jest.fn()} request={{ data: {}, type: 'x' }} />);
    });

    it('render profile component', () => {
        expect(wrapper).toHaveLength(1);
    });
});
