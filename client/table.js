import React from 'react';
import ReactDOM from 'react-dom';
//import {store} from './app.js';
import {ADD_CONTACT, DELETE_CONTACT} from './actions.js'

import contactsApp from './reducers.js';
import {zagolovok}  from './info.js';
import {connect} from 'react-redux';

class Table extends React.Component{
    constructor(props){
      super(props);
      //.store.dispatch(contactsApp(store.getState(), {type: 'ADD_CONTACT', contact: this.props.zagolovok}));
      //store.dispatch(contactsApp(store.getState(), {type: 'ADD_CONTACT', contact: "vasya"}));
      // this.state = {
      //   table: this.props.table,
      //   zagolovok: this.props.zagolovok
      // }
    }
    componentDidMount(){
      let result;
      fetch('/contacts', {method: 'GET'})
      .then((response) => {
        if (response.status !== 200){
          console.log('Проблема соединения с сервером. Код ошибки: ' +  
          response.status);  
        return;  
        }
        response.json().then(function(data) {  
          result = data; 
        })  
      })
      .catch(() => {
        console.log('Сервер недоступен. Перезвоните позже. Пип.Пип.Пип.');
      })
      //данные, полученные от сервера, должны заменить заглушку
      if (result){
        //this.setState({table: result});
        this.props.updateTable(result);
      }
    }
    render() {
      //let zagolovok = this.state.zagolovok;
      //let data = this.state.table;

      let data = this.props.table;
      //let zagolovok = data[0];
      //console.log(zagolovok);
      //data = data.splice(0,1);

      let tableZagolovok = zagolovok.map((item, index) => {
        return (
            <td key={index}>{zagolovok[index]}</td>
        )
      })
      let tableData = data.map((item, index) => {
        return (
          <tr key={index}>
            <td>{data[index].name}</td>
            <td>{data[index].city}</td>
            <td>{data[index].telephone}</td>
          </tr>
        )
      })
      //let tableData = <tr><td></td></tr>;
      return (
        <table className="allborder">
           <tbody>
          <tr>
            {tableZagolovok}
          </tr>
          {tableData}
          </tbody>
        </table>
      )
    }
  }

  const mapStateToProps = (state) => {
    console.log(state);
    return {
      table: state
    }
  }


  
const TableContainer = connect(mapStateToProps)(Table);
  export default TableContainer;