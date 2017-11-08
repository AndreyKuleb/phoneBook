import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
//import TableOfContacts from "./tableOfContacts.js";
import Sender from "./sender.js";

let zagolovok = ["Имя", "Телефон", "Адрес"];
let baseData =  [
  {
      name: "Vasya",
      telephone: "89161234567",
      city: "Moscow"
  },
  {
      name: "Kolya",
      telephone: "89091234567",
      city: "Saint-Petesburg"
  },
  {
      name: "Tanya",
      telephone: "89267654321",
      city: "Volgograd"
  }
]
// ReactDOM.render(
//     <App>
//       <Table />
//       <AddForm />
//       <DeleteForm />
//     </App>,
//     document.getElementById('root')
//   );
//console.log(React);
class App extends React.Component{
    render() {
      return (
        <div className="app">
          <h1>Телефонная книга</h1>
          <Table  zagolovok = {zagolovok} table = {baseData}/>
          <AddForm />
          <DeleteForm />
        </div>
      )
    }
  }

  class Table extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        table: this.props.table
      }
    }
    componentDidMount(){
      let sender = new Sender;
      let data = sender.getData('GET', '/contacts');
      if(data){
        this.setState({table: data})
      }
    }
    render() {
      let zagolovok = this.props.zagolovok;
      let data = this.state.table;

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
  class AddForm extends React.Component{
    render() {
      return (
        <div className="app">
          Формы добаления пока нет!

        </div>
      )
    }
  }
  class DeleteForm extends React.Component{
    render() {
      return (
        <div className="app">
          Формы удаления пока нет!
        </div>
      )
    }
  }

  window.onload  = () => {
  ReactDOM.render(
    <App/>,
    document.getElementById('root')
  );
}