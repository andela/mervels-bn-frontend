const initialState = {
  user: {
    data: {},
    errors: {}
  },
  notifications: {
    unread: 0,
    notifications: []
  },
  dashboard: {
    mostTravelled: {
      destinations: [],
      count: 0
    },
    tripStats: {
        total: 0,
        trips: []
    }
  }

};

export default initialState;
