import {ADD_SUPPLIER_SUCCESS, ADD_SUPPLIER_ERROR} from '../actions/actionTypes';

const addSupplierReducer = (state={data: null, error: null}, action) => {
    switch(action.type) {
        case ADD_SUPPLIER_SUCCESS:
            return {...state, error: null, data: action.details};
        case ADD_SUPPLIER_ERROR:
            return {...state, data: null, error: action.error};
        default:
            return state;
    }
};

export default addSupplierReducer;