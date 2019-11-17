import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
// import { browserHistory } from 'react-router';
import configureStore from '../redux/store';

const store = configureStore();

// eslint-disable-next-line react/prop-types
const  Provider = ({ story }) => {
  return (
    <ReduxProvider store={store}>
      {story}
    </ReduxProvider>
  );
};
export default Provider;