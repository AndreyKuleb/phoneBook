import React from 'react';
import ReactDOM from 'react-dom';

export default class Table extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        table: this.props.table,
        zagolovok: this.props.zagolovok
      }
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
      console.log(result);
      if (result){
        this.setState({table: result});
      }
    }
    render() {
      let zagolovok = this.props.zagolovok;
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