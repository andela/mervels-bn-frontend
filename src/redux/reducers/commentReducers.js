/* eslint-disable no-case-declarations */
import {
    GET_COMMENTS,
    GET_COMMENTS_FAILED,
    POST_COMMENTS,
    POST_COMMENTS_FAILED,
    DELETE_COMMENTS,
    // DELETE_COMMENTS_FAILED
} from '../actions/actionTypes';

const initialState = {
    comments: {},
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_COMMENTS:
            return { ...state, comments: action.payload };

        case GET_COMMENTS_FAILED:
                return { ...state, error: action.error };

        case POST_COMMENTS:
            state.comments.data.push(action.payload.data);
            const { comments } = state;
            return { ...state, comments,};

        case POST_COMMENTS_FAILED:
            return { ...state, error: action.error };

        case DELETE_COMMENTS:
            const { comments: sm } = state;
            const checkNum = (element) => element.id === action.payload.id;
            const index = sm.data.findIndex(checkNum);
            if (index > -1) {
                sm.data.splice(index, 1);
            }
            return { ...state, comments:sm};
        default:
            return state;
    }
};
