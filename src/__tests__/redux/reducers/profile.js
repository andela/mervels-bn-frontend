import profileReducer from '../../../redux/reducers/profileReducer';
import { GET_PROFILE, GET_PROFILE_ERROR, UPDATE_PROFILE, UPDATE_PROFILE_ERROR } from '../../../redux/actions/actionTypes';

const initialState = {
    status: '',
    data: {
        passportName: '',
        passportNumber: '',
        firstName: '',
        lastName: '',
        birthDate: '',
        department: '',
        phoneNumber: '',
        language: '',
        currency: '',
        gender: '',
        location: '',
        image: ''
    },
    error: ''
};

const success = {
    data: {
        image: '',
        userProfile: ''
    }
};

const successWithImageAndDate = {
    data: {
        image: {
            url: 'xxxx'
        },
        userProfile: {
            birthDate: '01-01-2000'
        }
    }
};

describe('Profile Reducer', () => {
    it('should test successfull profile retrieval', () => {
        const response = profileReducer(initialState, {
            type: GET_PROFILE,
            ...success
        });
        expect(response.status).toEqual('fetch_success');
    });

    it('should test successfull profile retrieval with date and image', () => {
        const response = profileReducer(initialState, {
            type: GET_PROFILE,
            ...successWithImageAndDate
        });
        expect(response.status).toEqual('fetch_success');
    });

    it('should test unsuccessfull profile retrieval', () => {
        const response = profileReducer(initialState, {
            type: GET_PROFILE_ERROR,
            error: ''
        });
        expect(response.status).toEqual('fetch_error');
    });

    it('should test successfull profile update', () => {
        const response = profileReducer(initialState, {
            type: UPDATE_PROFILE,
            ...success
        });
        expect(response.status).toEqual('update_success');
    });

    it('should test successfull profile update with time and image', () => {
        const response = profileReducer(initialState, {
            type: UPDATE_PROFILE,
            ...successWithImageAndDate
        });
        expect(response.status).toEqual('update_success');
    });

    it('should test unsuccessfull profile retrieval', () => {
        const response = profileReducer(initialState, {
            type: UPDATE_PROFILE_ERROR,
            error: ''
        });
        expect(response.status).toEqual('update_error');
    });
});
