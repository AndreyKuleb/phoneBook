import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import {zagolovok}  from './info.js';
import {baseData}  from './info.js';
import TableContainer from './table.js';
import AddFormContainer from './addForm.js';
import DeleteForm from './deleteForm.js';
import InfoForm from './infoForm.js';

import contactsApp from './reducers.js'




//console.log(store.getState())

//Главный класс приложения
class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      table: this.props.table,
      zagolovok: this.props.zagolovok
    }
  }
  
  //функция, обновляющая данные таблицы
//   updateTable(tableData) {
//     this.setState({table: tableData})
// }

    render() {
      return (
        <div className="app">
          <h1>Телефонная книга</h1>
          <TableContainer />
          <AddFormContainer />
          <DeleteForm />
          <InfoForm />
        </div>
      )
    }
  }

  window.onload  = () => {
  let store = createStore(contactsApp, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  ReactDOM.render(
    //начальные данные берутся из файла info.js
    <Provider store={store}>
      <App table = {baseData} zagolovok = {zagolovok} />
    </Provider>,
    document.getElementById('root')
  );
}