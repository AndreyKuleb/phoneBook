import React from 'react';
import ReactDOM from 'react-dom';

import { store } from './app.js';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
} from './actions.js'


export default class AddForm extends React.Component{
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
      e.preventDefault();
      //let oldData = [...this.props.table];
      let newData = {
        name: this.nameInput.value,
        telephone: this.telInput.value,
        city: this.cityInput.value
      }
      //oldData.push(newData);

      let result;
      fetch('/contacts', {method: 'PUT', body: oldData})
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
      //данные должны обновляться только в случае получения ответа от сервера
      //store
      //console.log(store.getState);
      //if (result){
        store.dispatch({type: 'ADD_CONTACT',
        newData});
        //this.props.updateTable(oldData);
      //}
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