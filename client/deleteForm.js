import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';


import {ADD_CONTACT, DELETE_CONTACT} from './actions.js'


class DeleteForm extends React.Component{
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
      e.preventDefault();
      let table = this.props.table;
      let contactName= this.nameInput.value;
      let result = [];
      table.forEach(function(element, i, arr) {
        if (contactName !== element.name) {
          result.push(element);
        }
      }, result);
      let aswerData;
      fetch('/contacts', {method: 'PUT', body: result})
      .then((response) => {
        if (response.status !== 200){
          console.log('Проблема соединения с сервером. Код ошибки: ' +  
          response.status);  
        return;  
        }
        response.json().then(function(data) {  
          aswerData = data; 
        })  
      })
      .catch(() => {
        console.log('Сервер недоступен. Перезвоните позже. Пип.Пип.Пип.');
      })
      //данные должны обновляться только в случае получения ответа от сервера
      //if (aswerData){
        console.log(contactName);
      this.props.deleteContact(contactName);
      //}
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

  const mapStateToProps = (state) => {
    console.log(state);
    return {
      table: state
    }
  }

  const mapDispatchToProps = function(dispatch, contactName) {
    return {
      deleteContact: (contactName) => {
        dispatch({type: 'DELETE_CONTACT', contactName});
      }
    }
  }
  
  
const DeleteFormContainer = connect(mapStateToProps, mapDispatchToProps)(DeleteForm);
  export default DeleteFormContainer;