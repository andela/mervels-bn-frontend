import addSupplierReducer from '../../../redux/reducers/addSupplierReducer';
import {ADD_SUPPLIER_SUCCESS, ADD_SUPPLIER_ERROR} from '../../../redux/actions/actionTypes';

describe("SUPPLIER REDUCER", () => {
    const initialState = {data: null, error: null};
    it('should test successfull adding of supplier', () => {
        const response = addSupplierReducer(initialState, {
            type: ADD_SUPPLIER_SUCCESS,
            details: {status: 201, message: 'supplier added successfully'}
        });

        expect(response).toEqual({
            data: {status: 201, message: 'supplier added successfully'},
            error: null
        });
    });
    
    it('should test unsuccessful addition of upplier', () => {
        const response = addSupplierReducer(initialState, {
            type: ADD_SUPPLIER_ERROR,
            error: {state: 500, message: 'some generic error'}
        });
        expect(response).toEqual({
            data: null, 
            error: {state: 500, message: 'some generic error'}
        });
    }); 

    
});  