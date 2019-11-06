import React from 'react';
import { Provider } from "react-redux";
import configureStore from './redux/store';
import './App.scss';

const store = configureStore();

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        BarefootNomad frontEnd
      </div>
    </Provider>
  );
};

export default App;
