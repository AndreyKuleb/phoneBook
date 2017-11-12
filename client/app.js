import React from 'react';
import ReactDOM from 'react-dom';
//import PropTypes from 'prop-types';
//import TableOfContacts from "./tableOfContacts.js";
//import Sender from "./sender.js";

import {zagolovok}  from './info.js';
import {baseData}  from './info.js';
import Table from './table.js'
import AddForm from './addForm.js'
import DeleteForm from './deleteForm.js'
import InfoForm from './infoForm.js'

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      table: this.props.table,
      zagolovok: this.props.zagolovok
    }
  }
  
  updateTable(tableData) {
    this.setState({table: tableData})
}

    render() {
      console.log('render')
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
    <App table = {baseData} zagolovok = {zagolovok}/>,
    document.getElementById('root')
  );
}