import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import {ADD_CONTACT, DELETE_CONTACT} from './actions.js'


class AddForm extends React.Component{
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        nameInput: "",
        telInput: "",
        cityInput: ""
      }
    }

    handleChange(e){
      switch(e.target.name){
        case "name":
          this.setState({
            nameInput: e.target.value,
          })
          break;
        case "telephone":
          this.setState({
            telInput: e.target.value,
          })
          break;
        case "city":
          this.setState({
            cityInput: e.target.value,
          })
          break;
      }
      
    }

    handleSubmit(e){
      e.preventDefault();
      let oldData = [...this.props.table];
      let newData = {
        name: this.state.nameInput,
        telephone: this.state.telInput,
        city: this.state.cityInput
      }
      oldData.push(newData);

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

      this.props.addContact(newData);

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
                              <input name="name" type="text" value={this.state.nameInput} onChange={this.handleChange}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>Телефон</td>
                            <td>
                                <input name="telephone" type="text" value={this.state.telInput} onChange={this.handleChange}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>Адрес</td>
                            <td>
                                <input name="city" type="text" value={this.state.cityInput} onChange={this.handleChange}></input>
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

  const mapStateToProps = (state) => {
    return {
      table: state
    }
  }

  const mapDispatchToProps = function(dispatch, contact) {
    return {
      addContact: (contact) => {
        dispatch({type: 'ADD_CONTACT', contact});
      }
    }
  }
  
  
const AddFormContainer = connect(mapStateToProps, mapDispatchToProps)(AddForm);
  export default AddFormContainer;