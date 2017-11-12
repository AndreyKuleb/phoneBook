import React from 'react';
import ReactDOM from 'react-dom';

export default class DeleteForm extends React.Component{
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e){
      e.preventDefault();
      let table = this.props.table;
      let value = this.nameInput.value;
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