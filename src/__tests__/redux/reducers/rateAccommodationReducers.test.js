import rateAccommodationReducer from '../../../redux/reducers/rateAccommodationReducer';

describe('rateAccommodation Reducer', () => {
  it('should test the rate accommodation reducer', () => {
    const initialState = {
        rate: {},
        error: ''
    };
    const data = {};
    const response = {
        rate: {},
        error: ''
    };
    const action ={
      type: 'RATE_ACCOMMODATION_SUCCESS',
      payload: data,
    };
    expect(rateAccommodationReducer(initialState, action)).toEqual(response);
  });
  it('should test failed rate accommodation reducer', () => {
    const initialState = {
        rate: {},
        error: ''
    };
    const error = {
        response:{
            data:{
                status:422,
                message:"rating must be number between 1 and 5",
                error: "Validation Error"
            }
        }
    };
    const response = {
      rate: {},
      error: 'rating must be number between 1 and 5'
     };

    expect(rateAccommodationReducer(initialState, {
      type: 'RATE_ACCOMMODATION_FAILED',
      payload: (error.response) ? error.response.data.message : 'Server error',
    })).toEqual(response);
  });
});