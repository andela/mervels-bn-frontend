/* eslint-disable no-console */
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import { networkError, serverError, handleError } from "../../../redux/actions/errorActions";

const middlewares = [thunk];

const mockStore = configureMockStore(middlewares);

describe("Error Handler Actions", () => {
  it("Should call the action server Error", () => {
    const error = {
      data: "value"
    };
    expect(serverError(error)).toStrictEqual({
      type: "SERVER_ERROR",
      errors: "value"
    });
  });


  it("Should call the action network Error", () => {
    const error = "Error Occured";
    expect(networkError(error)).toStrictEqual({
      type: "NETWORK_ERROR",
      errors: "Error Occured"
    });
  });

  it('should return NETWORK_ERROR when calling handleError', () => {
    const store = mockStore({
      status: '',
    message: ''
    });

    const payload = {
        errors: {
            message: 'Server Error'
        }
      };
      const expectedAction = {
        errors:  {
               errors:  {
         message: "Server Error",
          },
          },
          type: "NETWORK_ERROR",

    };

      store.dispatch(handleError(payload));
        expect(store.getActions()).toEqual([expectedAction]);
    });
  });

