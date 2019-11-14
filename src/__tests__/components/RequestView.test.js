/* eslint-disable react/jsx-props-no-spreading */
import { mount , configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { RequestViewTest, mapStateToProps } from '../../components/requestsPage';

configure({ adapter: new Adapter() });
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
let wrapper;

describe('RequestView Component', () => {
    const props = {
      requests:{
           error:null,
           requests:{
               message: "Your requests were retrieved successfully",
               status: 200,
               data:[]
           },
           filtered: {}
     },
      fetchRequests: jest.fn(),
      history: { push: jest.fn() },
      match:{
        path:'/approvals'
      }
    };

    beforeEach(() => {
      wrapper = mount(
        <RequestViewTest fetchRequests={jest.fn()} requests={props.requests} match={props.match} />,
      );
    });

    it('should render RequestView component with no requests', () => {
      expect(wrapper).toHaveLength(1);
    });
    it('should render RequestView component', () => {
      const newProps = {
        requests: {
          error: null,
          filtered: {},
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
    it('should render RequestView component', () => {
      const newProps = {
        requests: {
          error: null,
          requests: {},
            filtered: {
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
    it('should render RequestView component', () => {
      const newProps = {
        requests: {
          error: null,
            filtered: {},
            requests: {
              message: "Your requests were retrieved successfully",
              status: 200,
              data: [{
                "id": 2,
                "from": "KIGALI, RWANDA",
                "travelDate": [
                  "2019-10-01", "2019-10-02"
                ],
                "returnDate": null,
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
                },
                {
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
    it('should render RequestView Network error', () => {
        const newProps = {
            requests:{
                error:{
                    message: "Network Error",
                    status: 500
                },
                requests:{},
                filtered: {}
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

describe('Testting handle Requests function requests Page', () => {
  const props = {
    requests:{
         error:null,
         requests:{
             message: "Your requests were retrieved successfully",
             status: 200,
             data:[]
         },
         filtered: {}
   },
    fetchRequests: jest.fn,
    match: {
      path: '/requests'
    },
    history: { push: jest.fn() },
  };
  test('should call the getpending function', () => {
    const mockGetPending = jest.fn();
    wrapper = mount(<RequestViewTest fetchRequests={jest.fn()} getPending={mockGetPending} match={props.match}  requests={props.requests} />);
    wrapper.instance().handleRequests('PENDING');
    expect(mockGetPending.mock.calls.length).toBe(1);
  });
  test('should call the fetchrequests function', () => {
    const mockFetchRequest = jest.fn();
    wrapper = mount(<RequestViewTest fetchRequests={mockFetchRequest} match={props.match} requests={props.requests} />);
    wrapper.instance().handleRequests('ALL');
    expect(mockFetchRequest.mock.calls.length).toBe(2);
  });
  test('should call the getpast function', () => {
    const mockGetPast = jest.fn();
    wrapper = mount(<RequestViewTest fetchRequests={jest.fn()} getPast={mockGetPast} match={props.match}  requests={props.requests} />);
    wrapper.instance().handleRequests('PAST');
    expect(mockGetPast.mock.calls.length).toBe(1);
  });
});
describe('RequestPage intergration test', () => {
  let store;
  const prop = {
    history: {
      push: jest.fn(),
    },
    handleChange: jest.fn(),
    handleRequests: jest.fn(),
    handleSearch: jest.fn(),
    searchRequests: jest.fn(),
    fetchRequests: jest.fn(),
    getPending: jest.fn(),
    getPast: jest.fn(),
    requests: {
      "requests": {},
      filtered: {},
      title: "",
      error: null
    }
  };
  beforeEach(() => {
    store = mockStore({
      "requests": {},
      filtered: {},
      title: "",
      error: null
  });
  });
  test('should test handle change', () => {
    wrapper = mount(<RequestViewTest store={store} {...prop} />);
    const Pevent = {target: {name: "query", value: 2}};
    wrapper.find('input[name="query"]').simulate('change', Pevent);
    expect(wrapper.instance().state).toEqual({ parameter: null, query: 2, currentPage: 1, requestsPerPage: 2, isCreating: false });
  });
  test('should test handle search', () => {
    const mockLoginfn = jest.fn();
    wrapper = mount(<RequestViewTest store={store} {...prop} searchRequests={mockLoginfn} />);
    const Pevent = {target: {name: "query", value: 2}};
    wrapper.find('input[name="query"]').simulate('change', Pevent);
    wrapper.find('#search').simulate('click');
    expect(mockLoginfn.mock.calls.length).toBe(0);
  });
  test('should test handle search', () => {
    const mockLoginfn = jest.fn();
    wrapper = mount(<RequestViewTest store={store} {...prop} searchRequests={mockLoginfn} />);
    const Pevent = {target: {name: "query", value: 2}};
    const Eevent = {target: {name: "parameter", value: "id"}};
    wrapper.find('input[name="query"]').simulate('change', Pevent);
    wrapper.find('#catsel').simulate('change', Eevent);
    wrapper.find('#search').simulate('click');
    expect(mockLoginfn.mock.calls.length).toBe(1);
  });
});

let wrapperShallow;

describe('Request Page Component', () => {
  const props = {
    requests:{
         error:null,
         filtered: {},
         requests:{
             message: "Your requests were retrieved successfully",
             status: 200,
             data:[{
               id: 1
             }]
         }
   },
    fetchRequests: jest.fn(),
    history: { push: jest.fn() },
  };

  beforeEach(() => {
    wrapperShallow = shallow(
      <RequestViewTest fetchRequests={jest.fn()} match={{ path: '' }} history={props.history} requests={props.requests} isCreating={false} />
    );
  });
  it('should start creating a request', () => {
    wrapperShallow.find('Button[ButtonId="create-start"]').props().onClick();
    expect(wrapperShallow.instance().state).toHaveProperty('isCreating');
  });

  it('should trigger viewing a single request', () => {
    wrapperShallow.find('TableComponent').props().viewRequest({ target: { id: 1 } });
    expect(wrapperShallow.instance().state).toHaveProperty('isCreating');
  });
});