import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import {zagolovok, baseData}  from './info.js';
import TableContainer from './table.js';
import AddFormContainer from './addForm.js';
import DeleteFormContainer from './deleteForm.js';
import InfoFormContainer from './infoForm.js';
import contactsApp from './reducers.js'


//Главный класс приложения
class App extends React.Component{
  constructor(props){
    super(props);
  }
  
    render() {
      return (
        <div className="app">
          <h1>Телефонная книга</h1>
          <TableContainer />
          <AddFormContainer />
          <DeleteFormContainer />
          <InfoFormContainer />
        </div>
      )
    }
  }

  window.onload  = () => {
  let store = createStore(contactsApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  ReactDOM.render(
    //начальные данные берутся из файла info.js
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}