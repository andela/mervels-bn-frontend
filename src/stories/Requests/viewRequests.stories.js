import React from 'react';
import { storiesOf } from '@storybook/react';
import {RequestViewTest} from '../../components/requestsPage';

const props = {
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
            },
            {
              "id": 2,
              "from": "KIGALI, RWANDA",
              "travelDate": [
                "2019-10-01"
              ],
              "returnDate": "2019-12-12",
              "reason": "Business Travel",
              "status": "Rejected",
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
            },
            {
              "id": 2,
              "from": "KIGALI, RWANDA",
              "travelDate": [
                "2019-10-01"
              ],
              "returnDate": "2019-12-12",
              "reason": "Business Travel",
              "status": "Pending",
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
            },
            {
              "id": 2,
              "from": "KIGALI, RWANDA",
              "travelDate": [
                "2019-10-01"
              ],
              "returnDate": "2019-12-12",
              "reason": "Business Travel",
              "status": "something",
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
      fetchRequests: () => null,
      history: { push: () => null },
      match:{
        path:'/approvals'
      }
    };

    const props2 = {
        requests: {
            error: null,
            filtered: {},
              requests: {
                message: "Your requests were retrieved successfully",
                status: 200,
                data: []
              },
          },
          fetchRequests: () => null,
          history: { push: () => null },
          match:{
            path:'/approvals'
          }
        };

storiesOf('Requests | requests', module)
    .add('With Request', () => (<RequestViewTest  fetchRequests={props.fetchRequests} requests={props.requests} match={props.match}/>))
    .add('without data', () => (<RequestViewTest fetchRequests={props2.fetchRequests} requests={props2.requests} match={props2.match}/>));

