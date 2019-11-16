import { mount , configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { ApprovalsPageTest, mapStateToProps } from '../../components/approvalsPage';

configure({ adapter: new Adapter() });

let wrapper;

describe('ApprovalsPage Component', () => {
    const props = {
      approvals:{
           error:null,
           approvals:{
               message: "Your requests were retrieved successfully",
               status: 200,
               data:[]
           }
     },
     fetchRequestApprovals: jest.fn,
      history: { push: jest.fn() },
      match:{
        path:'/approvals'
      }
    };

    beforeEach(() => {
      wrapper = mount(
        <ApprovalsPageTest
        fetchRequestApprovals={props.fetchRequestApprovals}
        approvals={props.approvals}
        match={props.match}
        />,
      );
    });

    it('should render ApprovalsPage component with no approvals', () => {
      expect(wrapper).toHaveLength(1);
    });
    it('should render ApprovalsPage component', () => {
      const newProps = {
        requests: {
          error: null,
            requests: {
              message: "Requests retrieved ",
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
    it('should render ApprovalsPage error component', () => {
        // const obj = props.requests;
        const newProps = {
            approvals:{
                error:{
                    error: "Authentication Error",
                    message: "Invalid or expired token used",
                    status: 401
                },
                approvals:{}
          },
        };
        wrapper.setProps({ ...props, ...newProps});
        expect(wrapper.find(`h3.text-center`).length).toEqual(1);
      });
      it('should render ApprovalsPage Network error', () => {
        const newProps = {
            approvals:{
                error:{
                    message: "Network Error",
                    status: 500
                },
                approvals:{}
          },
        };
        wrapper.setProps({ ...props, ...newProps});
        expect(wrapper.find(`h3.text-center`).length).toEqual(1);
      });
      it('should render ApprovalsPage privilage error', () => {
        const newProps = {
            approvals:{
                error:{
                    message: "Network Error",
                    status: 403
                },
                approvals:{}
          },
        };
        wrapper.setProps({ ...props, ...newProps});
        expect(wrapper.find(`h3.text-center`).length).toEqual(1);
      });
      it('should test the mapStateToProps', () => {
        const initialState = {
        "approvals": {},
        error: null
    };

        expect(mapStateToProps(initialState).approvals).toEqual({});
    });
});
