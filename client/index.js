import React from 'react';
import ReactDOM from 'react-dom';
import Instargram from './src/pages/index.js';
import {Provider} from 'react-redux';
import store from './src/store/index.js';
ReactDOM.render(
  <Provider store={store}>
    <Instargram />
  </Provider>,
  document.getElementById('root')
)
