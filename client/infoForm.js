import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {zagolovok}  from './info.js';

import {ADD_CONTACT, DELETE_CONTACT} from './actions.js'

class InfoForm extends React.Component{
    constructor(props) {
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.state = {
        showInfo: undefined,
        nameInput: ""
      }
    }

    handleChange(e){
      this.setState({
        nameInput: e.target.value,
      })  
    }

    handleSubmit(e){
      e.preventDefault();
      let table = this.props.table;
      let value = this.state.nameInput;
      let result = [];
      table.forEach(function(element, i, arr) {
        if (value === element.name) {
          result.push(element);
        }
      }, result);

      if (!result.length){
        //result.push({});
        this.setState({
          showInfo: 0
        });
      }
      else {
      this.setState({
        showInfo: 1,
        contactInfo:  result[0]
      });
    }
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
                     <input name="name" type="text" value={this.state.nameInput} onChange={this.handleChange}></input>
                 </td>
             </tr>
         </tbody>
         </table>
         <input type='submit' value="Показать" id="infoBut"></input>
         {
           this.state.showInfo > 0 && 
              <p>{zagolovok[0]} : {this.state.contactInfo.name}
              <br></br>
              {zagolovok[1]}: {this.state.contactInfo.fullAdress} 
              <br></br>
              {zagolovok[2]}:  {this.state.contactInfo.telephone}    
         </p>
         }
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

  
  
const InfoFormContainer = connect(mapStateToProps)(InfoForm);
  export default InfoFormContainer;