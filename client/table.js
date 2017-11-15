import React from 'react';
import ReactDOM from 'react-dom';

import {ADD_CONTACT, DELETE_CONTACT} from './actions.js'
import contactsApp from './reducers.js';
import {zagolovok}  from './info.js';
import {connect} from 'react-redux';

class Table extends React.Component{
    constructor(props){
      super(props);
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
        //this.props.updateTable(result);
      }
    }
    render() {

      let data = this.props.table;

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