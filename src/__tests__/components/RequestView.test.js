import { mount , configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { RequestViewTest, mapStateToProps } from '../../components/requestsPage';

configure({ adapter: new Adapter() });

let wrapper;

describe('RequestView Component', () => {
    const props = {
      requests:{
           error:null,
           requests:{
               message: "Your requests were retrieved successfully",
               status: 200,
               data:[]
           }
     },
      fetchRequests: jest.fn,
      history: { push: jest.fn() },
    };

    beforeEach(() => {

      wrapper = mount(
        <RequestViewTest fetchRequests={jest.fn()} requests={props.requests} />,
      );
    });

    it('should render RequestView component with no requests', () => {
      expect(wrapper).toHaveLength(1);
    });
    it('should render RequestView component', () => {
      const newProps = {
        requests: {
          error: null,
            requests: {
              message: "Your requests were retrieved successfully",
              status: 200,
              data: [{
                "id": 2,
                "from": "KIGALI, RWANDA",
                "travelDate": [
                  "2019-10-01"
                ],
                "returnDate": "2019-12-12",
                "reason": "Business Travel",
                "status": "Approved",
                "user": 3,
                "passportName": "Robben Bahati",
                "passportNumber": "121HU3H3U32",
                "gender": "MALE",
                "role": "Requester",
                "createdAt": "2019-11-11T05:13:44.754Z",
                "updatedAt": "2019-11-11T05:13:44.754Z",
                "accommodations": [{
                  "id": 2,
                  "name": "MARIOT",
                  "status": "Unavailable",
                  "imageUrl": null,
                  "amenities": null,
                  "locationId": 1,
                  "description": null,
                  "services": null,
                  "createdAt": "2019-11-11T05:13:44.822Z",
                  "updatedAt": "2019-11-11T05:13:44.822Z",
                  "AccommodationRequests": {
                    "requestId": 2,
                    "accommodationId": 2,
                    "createdAt": "2019-11-11T05:13:44.845Z",
                    "updatedAt": "2019-11-11T05:13:44.845Z"
                  },
                  "Location": {
                    "id": 1,
                    "country": "RWANDA",
                    "city": "KIGALI",
                    "createdAt": "2019-11-11T05:13:44.791Z",
                    "updatedAt": "2019-11-11T05:13:44.791Z"
                  }
                }]
              }]
            },
        },
    };
    wrapper.setProps({ ...props, ...newProps});
      expect(wrapper).toHaveLength(1);
    });
    it('should render RequestView error component', () => {
        // const obj = props.requests;
        const newProps = {
            requests:{
                error:{
                    error: "Authentication Error",
                    message: "Invalid or expired token used",
                    status: 401
                },
                requests:{}
          },
        };
        wrapper.setProps({ ...props, ...newProps});
        expect(wrapper.find(`h3.text-center`).length).toEqual(1);
      });
      it('should render RequestView error component', () => {
        const newProps = {
            requests:{
                error:{
                    error: "Authentication Error",
                    message: "Invalid or expired token used",
                    status: 401
                },
                requests:{}
          },
        };
        wrapper.setProps({ ...props, ...newProps});
        expect(wrapper.find(`h3.text-center`).length).toEqual(1);
      });
      it('should render RequestView Network error', () => {
        const newProps = {
            requests:{
                error:{
                    message: "Network Error",
                    status: 500
                },
                requests:{}
          },
        };
        wrapper.setProps({ ...props, ...newProps});
        expect(wrapper.find(`h3.text-center`).length).toEqual(1);
      });
      it('should test the mapStateToProps', () => {
        const initialState = {
        "requests": {},
        error: null
    };

        // Just call the method directly passing in sample data
        // to make sure it does what it's supposed to
        expect(mapStateToProps(initialState).requests).toEqual({});
    });
});