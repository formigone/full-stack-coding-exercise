import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';

import store from './data';

import App from './containers/App';

const Container = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default Container;
module.exports = Container;
