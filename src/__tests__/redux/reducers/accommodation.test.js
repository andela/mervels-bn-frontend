import { 
    GET_ACCOMMODATIONS_SUCCESS,
    GET_ACCOMMODATIONS_FAILURE,
    GET_ACCOMMODATION_SUCCESS,
    GET_ACCOMMODATION_FAILURE,
    ADD_ACCOMMODATION_SUCCESS,
    ADD_ACCOMMODATION_FAILURE,
    ADD_ROOMS_SUCCESS,
    ADD_ROOMS_FAILURE
} from '../../../redux/actions/actionTypes';
import accommodationReducer from '../../../redux/reducers/accommodationReducer';
import accommodationsReducer from '../../../redux/reducers/accommodations';
import addAccommodation from '../../../redux/reducers/addAccommodation';
import addRoom from '../../../redux/reducers/addRooms';

describe('Accommodation Reducers', () => {
    const initialState ={
        accommodation: {},
        error: ''
    };
    it('return initial state', () => {
        const newState = accommodationReducer(initialState, {
            type: 'default',
        });
        expect(newState).toEqual(initialState);
    });
  it('should update the state when calling GET_ACCOMMODATION_SUCCESS', () => {
    const payload = {
      status: 200,
      message: 'message',
      data: 'data',
    };
    const newState = accommodationReducer(initialState, {
      type: GET_ACCOMMODATION_SUCCESS,
      payload,
    });
    expect(newState.accommodation).toEqual(payload.data);
  });
  it('should update the state when calling GET_ACCOMMODATION_FAILURE', () => {
    const payload = 'error';
    const newState = accommodationReducer(initialState, {
      type: GET_ACCOMMODATION_FAILURE,
      payload,
    });
    expect(newState.error).toBe(payload);
  });
});

describe('Accommodations Reducers', () => {
    const initialState ={
        accommodations: {},
        error: ''
    };
    it('return initial state', () => {
        const newState = accommodationsReducer(initialState, {
            type: 'default',
        });
        expect(newState).toEqual(initialState);
    });
  it('should update the state when calling GET_ACCOMMODATIONS_SUCCESS', () => {
    const payload = {
      status: 200,
      user: {
          role: 'requester'
      },
      accommodations: 'accommodations',
    };
    const newState = accommodationsReducer(initialState, {
      type: GET_ACCOMMODATIONS_SUCCESS,
      payload,
    });
    expect(newState.accommodations).toEqual(payload.accommodations);
  });
  it('should update the state when calling GET_ACCOMMODATIONS_SUCCESS withe role supplier', () => {
    const payload = {
      status: 200,
      user: {
          role: 'supplier',
          id: 2
      },
      accommodations: [
          {
            owner: 2,
          },
          {
            owner: 1,
          }
      ],
    };
    const newState = accommodationsReducer(initialState, {
      type: GET_ACCOMMODATIONS_SUCCESS,
      payload,
    });
    expect(newState.accommodations).toEqual([{owner: 2}]);
  });
  it('should update the state when calling GET_ACCOMMODATIONS_FAILURE', () => {
    const payload = 'error';
    const newState = accommodationsReducer(initialState, {
      type: GET_ACCOMMODATIONS_FAILURE,
      payload,
    });
    expect(newState.error).toBe(payload);
  });
});

describe('Add Accommodation Reducers', () => {
    const initialState = {
        accommodation: null,
        error: ''
    };
  it('should update the state when calling GET_ACCOMMODATION_SUCCESS', () => {
    const payload = {
      status: 200,
      message: 'message',
      data: 'data',
    };
    const newState = addAccommodation(initialState, {
      type: ADD_ACCOMMODATION_SUCCESS,
      payload,
    });
    expect(newState.accommodation).toEqual(payload.data);
  });
  it('return initial state', () => {
    const newState = addAccommodation(initialState, {
        type: 'default',
    });
    expect(newState).toEqual(initialState);
  });
  it('should update the state when calling GET_ACCOMMODATION_FAILURE', () => {
    const payload = 'error';
    const newState = addAccommodation(initialState, {
      type: ADD_ACCOMMODATION_FAILURE,
      payload,
    });
    expect(newState.error).toBe(payload);
  });
});

describe('Add Rooms Reducers', () => {
    const initialState = {
        rooms: null,
        error: ''
    };
  it('should update the state when calling GET_ACCOMMODATION_SUCCESS', () => {
    const payload = {
      status: 200,
      message: 'message',
      data: 'data',
    };
    const newState = addRoom(initialState, {
      type: ADD_ROOMS_SUCCESS,
      payload,
    });
    expect(newState.rooms).toEqual(payload.data);
  });
  it('return initial state', () => {
    const newState = addRoom(initialState, {
        type: 'default',
    });
    expect(newState).toEqual(initialState);
  });
  it('should update the state when calling GET_ACCOMMODATION_FAILURE', () => {
    const payload = 'error';
    const newState = addRoom(initialState, {
      type: ADD_ROOMS_FAILURE,
      payload,
    });
    expect(newState.error).toBe(payload);
  });
});