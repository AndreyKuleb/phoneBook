import React from 'react';
import ReactDOM from 'react-dom';

export default class AddForm extends React.Component{
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