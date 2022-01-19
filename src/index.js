import React from 'react';
import ReactDOM from 'react-dom';

// SASS STYLES ( imported from sass directory )
import './sass/rootStyles/index.scss';

//* COMPONENTS ( rendered app component (main component) in DOM )
import App from './App';

//* STATE MANAGER (USE REDUX TOOLKIT) / THIS IS STORE FOR MANAGEMENT DATA
import store from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>
  ,
  document.getElementById('root')
);
