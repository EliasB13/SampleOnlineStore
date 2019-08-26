import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Provider } from 'react-redux';
import { store } from './helpers/store.js';
//import registerServiceWorker from './registerServiceWorker';

require('dotenv').config();

const rootElement = document.getElementById('root');

ReactDOM.render(

  <Provider store = { store }>
      <App />
  </Provider>,
  rootElement);

//registerServiceWorker();
