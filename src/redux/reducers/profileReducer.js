/* eslint-disable no-debugger */
import moment from 'moment';
import { GET_PROFILE, GET_PROFILE_ERROR, UPDATE_PROFILE, UPDATE_PROFILE_ERROR } from '../actions/actionTypes';

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
        image: '',
        userId: '',
        role: ''
    },
    error: ''
};

export default  (state = initialState, action) => {
    switch(action.type) {
        case GET_PROFILE:
            return { ...state, status:'fetch_success', data: {
                image: action.data.image ? action.data.image.url : 'https://res.cloudinary.com/drayzii/image/upload/v1573554314/585e4bf3cb11b227491c339a_mq5uhp.png',
                passportName: action.data.userProfile.passportName,
                passportNumber: action.data.userProfile.passportNumber,
                firstName: action.data.firstName,
                lastName: action.data.lastName,
                birthDate: moment(action.data.userProfile.birthDate).format('YYYY-MM-DD'),
                department: action.data.userProfile.department,
                phoneNumber: action.data.userProfile.phoneNumber,
                language: action.data.userProfile.language,
                currency: action.data.userProfile.currency,
                gender: action.data.userProfile.gender,
                location: action.data.userProfile.location,
                userId: action.data.userProfile.userId,
                role: action.data.userRoles
            }};
        case GET_PROFILE_ERROR:
            return { ...state, status:'fetch_error', error: action.error };
        case UPDATE_PROFILE:
                return { ...state, status:'update_success', data: {
                    image: action.data.image ? action.data.image.url : 'https://res.cloudinary.com/drayzii/image/upload/v1573554314/585e4bf3cb11b227491c339a_mq5uhp.png',
                    passportName: action.data.userProfile.passportName,
                    passportNumber: action.data.userProfile.passportNumber,
                    firstName: action.data.firstName,
                    lastName: action.data.lastName,
                    birthDate: moment(action.data.userProfile.birthDate).format('YYYY-MM-DD'),
                    department: action.data.userProfile.department,
                    phoneNumber: action.data.userProfile.phoneNumber,
                    language: action.data.userProfile.language,
                    currency: action.data.userProfile.currency,
                    gender: action.data.userProfile.gender,
                    location: action.data.userProfile.location
                }};
            case UPDATE_PROFILE_ERROR:
                return { ...state, status:'update_error', error: action.error };
        default:
            return state;
    }
};