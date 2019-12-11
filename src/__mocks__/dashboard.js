/* eslint-disable import/prefer-default-export */
export const mostTravelled = {
    "id": 2,
    "name": "MARIOT",
    "status": "Unavailable",
    "imageUrl": ["imageUrl"],
    "amenities": null,
    "locationId": 1,
    "description": "Cool Place to Stay",
    "services": null,
    "createdAt": "2019-11-26T12:43:35.763Z",
    "updatedAt": "2019-11-26T12:43:35.763Z",
    "Rooms": [],
    "Likes": [],
    "Location": {
        "city": "city",
        "country": "country"
    },
    "Ratings": [
        {
            "id": 1,
            "userId": 3,
            "accommodationId": 2,
            "rating": 4,
            "createdAt": "2019-12-04T08:24:30.404Z",
            "updatedAt": "2019-12-10T07:43:22.237Z"
        },
        {
            "id": 2,
            "userId": 5,
            "accommodationId": 2,
            "rating": 4,
            "createdAt": "2019-12-04T11:37:57.560Z",
            "updatedAt": "2019-12-04T11:37:57.560Z"
        }
    ],
    "Feedbacks": [],
    "requests": [
        {
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
            "createdAt": "2019-11-26T12:43:35.692Z",
            "updatedAt": "2019-11-26T12:43:35.692Z",
            "AccommodationRequests": {
                "requestId": 2,
                "accommodationId": 2,
                "createdAt": "2019-11-26T12:43:35.794Z",
                "updatedAt": "2019-11-26T12:43:35.794Z"
            }
        },
        {
            "id": 3,
            "from": "ACCRA, GHANA",
            "travelDate": [
                "2019-08-01"
            ],
            "returnDate": "2019-12-12",
            "reason": "Important meeting in lagos",
            "status": "Approved",
            "user": 5,
            "passportName": "Robben Bahati",
            "passportNumber": "121HU3H3U32",
            "gender": "MALE",
            "role": "Requester",
            "createdAt": "2019-11-26T12:43:35.692Z",
            "updatedAt": "2019-11-26T12:43:35.692Z",
            "AccommodationRequests": {
                "requestId": 3,
                "accommodationId": 2,
                "createdAt": "2019-11-26T12:43:35.794Z",
                "updatedAt": "2019-11-26T12:43:35.794Z"
            }
        },
        {
            "id": 4,
            "from": "MANILLA, PHILIPINES",
            "travelDate": [
                "2019-07-01"
            ],
            "returnDate": "2019-07-12",
            "reason": "Business Travel",
            "status": "Rejected",
            "user": 5,
            "passportName": "Robben Bahati",
            "passportNumber": "121HU3H3U32",
            "gender": "MALE",
            "role": "Requester",
            "createdAt": "2019-11-26T12:43:35.692Z",
            "updatedAt": "2019-11-26T12:43:35.692Z",
            "AccommodationRequests": {
                "requestId": 4,
                "accommodationId": 2,
                "createdAt": "2019-11-26T12:43:35.794Z",
                "updatedAt": "2019-11-26T12:43:35.794Z"
            }
        }
    ]
};

export const trips = [
  {
    id: 2,
    from: "KIGALI, RWANDA",
    travelDate: ["2019-10-01"],
    returnDate: "2019-12-12",
    reason: "Business Travel",
    status: "Approved",
    user: 3,
    passportName: "Robben Bahati",
    passportNumber: "121HU3H3U32",
    gender: "MALE",
    role: "Requester",
    createdAt: "2019-11-26T12:43:35.692Z",
    updatedAt: "2019-11-26T12:43:35.692Z",
    accommodations: [
      {
        id: 2,
        name: "MARIOT",
        status: "Unavailable",
        imageUrl: null,
        amenities: null,
        locationId: 1,
        description: null,
        services: null,
        createdAt: "2019-11-26T12:43:35.763Z",
        updatedAt: "2019-11-26T12:43:35.763Z",
        AccommodationRequests: {
          requestId: 2,
          accommodationId: 2,
          createdAt: "2019-11-26T12:43:35.794Z",
          updatedAt: "2019-11-26T12:43:35.794Z"
        },
        Location: {
          id: 1,
          country: "RWANDA",
          city: "KIGALI",
          createdAt: "2019-11-26T12:43:35.725Z",
          updatedAt: "2019-11-26T12:43:35.725Z"
        }
      }
    ]
  },
  {
    "id": 5,
    "from": "NAKURU, KENYA",
    "travelDate": [
        "2019-04-01",
        "2019-05-21"
    ],
    "returnDate": "2019-07-12",
    "reason": "Still figuring this out",
    "status": "Rejected",
    "user": 3,
    "passportName": "Robben Bahati",
    "passportNumber": "121HU3H3U32",
    "gender": "MALE",
    "role": "Requester",
    "createdAt": "2019-11-26T12:43:35.692Z",
    "updatedAt": "2019-11-26T12:43:35.692Z",
    "accommodations": []
}
];
