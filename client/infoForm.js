import React from 'react';
import ReactDOM from 'react-dom';

export default class InfoForm extends React.Component{
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
      this.setState({
        showInfo: 1
      });
      let table = this.props.table;
      let value = this.nameInput.value;
      let result = [];
      table.forEach(function(element, i, arr) {
        if (value === element.name) {
          result.push(element);
        }
      }, result);
      //console.log(result[0]);
      if (!result.length){result.push({})};
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
              {this.props.zagolovok[1]}: {this.state.contactInfo.fullAdress} 
              <br></br>
              {this.props.zagolovok[2]}:  {this.state.contactInfo.telephone}    
         </p>
         }
         </form>
        </div>
      )
    }
  }