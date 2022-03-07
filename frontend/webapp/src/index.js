import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import {createStore,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducers from "./redux/reducers";
import thunk from "redux-thunk";

const store = createStore(reducers,applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>
  ,
  document.getElementById('root')
);



//self notes
//redux gives us global store that has reducers as pathways to accept data
//react-redux gives us Provider in order to distribute these values to childs and has multiple
//hooks in order to add data