import React from 'react';
import ReactDOM from 'react-dom';

import {zagolovok}  from './info.js';
import {baseData}  from './info.js';
import Table from './table.js'
import AddForm from './addForm.js'
import DeleteForm from './deleteForm.js'
import InfoForm from './infoForm.js'

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
  updateTable(tableData) {

    this.setState({table: tableData})
}

    render() {
      return (
        <div className="app">
          <h1>Телефонная книга</h1>
          <Table table = {this.state.table} zagolovok = {this.state.zagolovok} updateTable={this.updateTable.bind(this)}/>
          <AddForm table={this.state.table} updateTable={this.updateTable.bind(this)} />
          <DeleteForm table={this.state.table} updateTable={this.updateTable.bind(this)} />
          <InfoForm table={this.state.table} zagolovok = {this.state.zagolovok} contactInfo=''/>
        </div>
      )
    }
  }

  window.onload  = () => {
  ReactDOM.render(
    //начальные данные берутся из файла info.js
    <App table = {baseData} zagolovok = {zagolovok}/>,
    document.getElementById('root')
  );
}