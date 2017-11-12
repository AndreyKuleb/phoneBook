import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
//import TableOfContacts from "./tableOfContacts.js";
//import Sender from "./sender.js";

let zagolovok = ["Имя", "Адрес", "Телефон"];
let baseData =  [
  {
      name: "Vasya",
      telephone: "89161234567",
      city: "Moscow",
      fullAdress: "Moscow, Volgogrdadsiy prospect 46"
  },
  {
      name: "Kolya",
      telephone: "89091234567",
      city: "Saint-Petesburg",
      fullAdress: "Saint-Petesburg, Vavilova street 32"
  },
  {
      name: "Tanya",
      telephone: "89267654321",
      city: "Volgograd",
      fullAdress: "Volgograd, Lenin street 16"
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

  class Table extends React.Component{
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

  class AddForm extends React.Component{
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
      e.preventDefault();
      let oldData = [...this.props.table];
      console.log(oldData);
      let newData = {
        name: this.nameInput.value,
        telephone: this.telInput.value,
        city: this.cityInput.value
      }
      oldData.push(newData);
      this.props.updateTable(oldData);
    }
    render() {
      return (
        <div>
        <form id="addForm" className="allborder" onSubmit={this.handleSubmit}>
                    <p>Добавить контакт</p>
                    <table>
                    <tbody>
                        <tr>
                            <td>Имя</td>
                            <td>
                              <input name="name" type="text" ref={(input) => this.nameInput = input}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>Телефон</td>
                            <td>
                                <input name="telephone" type="text" ref={(input) => this.telInput = input}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>Адрес</td>
                            <td>
                                <input name="city" type="text" ref={(input) => this.cityInput = input}></input>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <input type='submit' value="Добавить" id="addBut" ref='myTestInput'></input>
        </form>
        </div>
      )
    }
  }

  class DeleteForm extends React.Component{
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
      e.preventDefault();
      let table = this.props.table;
      //console.log(this.props.table);
      let value = this.nameInput.value;
      // let result = table.map((item, i, arr) => {
      //   if (value !== item.name) {
      //       return item;
      //   }
      // }, this)
      let result = [];
      table.forEach(function(element, i, arr) {
        if (value !== element.name) {
          result.push(element);
        }
      }, result);
      this.props.updateTable(result);
      console.log(result);
    }
    render() {
      return (
        <div>
         <form id="deleteForm" className="allborder" onSubmit={this.handleSubmit}>
         <p>Удалить контакт</p>
         <table>
         <tbody>
             <tr>
                 <td>Имя</td>
                 <td>
                     <input name="name" type="text"  ref={(input) => this.nameInput = input}></input>
                 </td>
             </tr>
         </tbody>
         </table>
         <input type='submit' value="Удалить" id="deleteBut"></input>
         </form>
        </div>
      )
    }
  }

  class InfoForm extends React.Component{
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {
        contactInfo: this.props.contactInfo,
        showInfo: undefined
      }
    }

    handleSubmit(e){
      e.preventDefault();
      this.state.showInfo = 1;
      let table = this.props.table;
      let value = this.nameInput.value;
      let result = [];
      table.forEach(function(element, i, arr) {
        if (value === element.name) {
          result.push(element);
        }
      }, result);
      console.log(result[0]);
      this.setState({
        contactInfo:  result[0]
      });
    }
    render() {
      return (
        <div>
         <form id="infoForm" className="allborder" onSubmit={this.handleSubmit}>
         <p>Показать полную информацию о контакте</p>
         <table>
         <tbody>
             <tr>
                 <td>Имя</td>
                 <td>
                     <input name="name" type="text"  ref={(input) => this.nameInput = input}></input>
                 </td>
             </tr>
         </tbody>
         </table>
         <input type='submit' value="Показать" id="infoBut"></input>
         {
           this.state.showInfo > 0 && 
              <p>{this.props.zagolovok[0]} : {this.state.contactInfo.name}
              <br></br>
              {this.props.zagolovok[1]}: {this.state.contactInfo.telephone}
              <br></br>
              {this.props.zagolovok[2]}: {this.state.contactInfo.fullAdress}      
         </p>
         }
         </form>
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