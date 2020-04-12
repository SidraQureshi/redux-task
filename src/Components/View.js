import React, {Component} from 'react'

import { editUserAction } from '../Actions/Users_Actions';
import { connect } from 'react-redux';
import MainPage from './MainPage'

class View extends Component{
constructor(props){
    super(props)
    this.state = {
        data: {}
    }
}

componentDidMount() {
   const sIndex = localStorage.getItem('selectedIndex');
   
   const sobj = this.props.userReducer.users.filter(u => u.id == Number(sIndex))[0] || {};
   this.setState({
       idx: sIndex,
       data: {
           id: Number(sobj.id),
           FirstName : sobj.FirstName,
           LastName : sobj.LastName,
           Email : sobj.Email,
           Phone : sobj.Phone,
           Address : sobj.Address,
           Picture : sobj.Picture,
           firstNameError : "",
           lastNameError : "",
           emailError : "",
           phoneError : "",
           addressError : ""
       }
   });
}


render(){
    return(
<div className = "container">
   <form className="center">
       
   <div className="FormRow">
            <label htmlFor = "firstName"  id ="oi"> USER DESCRIPTION :  </label>  
         </div>
         &nbsp;
      <div className="FormRow">
            <label htmlFor = "firstName"  id ="o">FirstName :  </label>
               <label id = "i1">{this.state.data.FirstName} </label>
         </div>
         &nbsp;
         <div className="FormRow">
            <label htmlFor = "lasttName"  id ="o">LastName : </label>
               <label id = "i1">{this.state.data.LastName} </label>
         </div>
         &nbsp;
         <div className="FormRow">
            <label htmlFor = "email"  id ="o">Email : </label>
               <label id = "i1">{this.state.data.Email} </label>
         </div>
         &nbsp; 
         <div className="FormRow">
            <label htmlFor = "phon"  id ="o">Phone : </label>
               <label id = "i1">{this.state.data.Phone} </label>
         </div>
         &nbsp;
         <div className="FormRow">
            <label htmlFor = "addree"  id ="o">Address : </label>
               <label id = "i1">{this.state.data.Address} </label>
         </div>
         &nbsp;
         <div className="FormRow">
            <label htmlFor = "picture"  id ="o">Picture : </label>
               <label id = "i1"><img src={this.state.data.Picture} width="100" height="100"/> </label>
         </div>
     </form>
</div>
    )
}
}


function stateToProps(store) {
   return store;
}

function dispatchToProps(dispatch) {
   return {
       updateUser: (data) => dispatch(editUserAction(data))
   }
}
export default connect(stateToProps, dispatchToProps) (View);