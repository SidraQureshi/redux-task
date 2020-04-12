import React, {Component} from 'react'
import MainPage from './MainPage'
import { editUserAction } from '../Actions/Users_Actions';
import { connect } from 'react-redux';

class Edit extends Component{
constructor(props){
    super(props)
    this.state = {
        data: {},
        idx: 0
    }
}
imageUpload = (e) => {
    const file = e.target.files[0];
    this.getBase64(file).then(base64 => {
        
        // localStorage["fileBase64"] = base64; 
        document.getElementById('imms').src = base64;
        let o = this.state.data
        o.Picture = base64
        this.setState({
            data : o
        })
    });
}

 getBase64 = (file) => {
    return new Promise((resolve,reject) => {
       const reader = new FileReader();
       reader.onload = () => {
           console.log(reader, reader.result.split('base64,')[1].length * 2)
           return resolve(reader.result) };
       reader.onerror = error => reject(error);
       reader.readAsDataURL(file);
    })
}

componentDidMount() {
    const sIndex = localStorage.getItem('selectedIndex');

    const sobj = this.props.userReducer.users.filter(u => u.id == Number(sIndex))[0] || {};
    this.setState({
        idx: sIndex,
        // fetching selected record from redux store and setting it to the componenet state
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

f = (events) => {
    let x = this.state.data;
    x.FirstName = events.target.value;

  this.setState({
      data : x
  })
  
}

l = (events) => {
    let y = this.state.data
    y.LastName = events.target.value;
    this.setState({
        data : y
    })
}

e = (events) => {
    let z = this.state.data
    z.Email = events.target.value;
    this.setState({
        data : z
    })
}

p = (events) => {
    let m = this.state.data
    m.Phone = events.target.value;
    this.setState({
        data : m
    })
}

a = (events) => {
    let n = this.state.data
    n.Address = events.target.value;
    this.setState({
        data : n
    })
}

saveHandler = (event) => {
    this.props.updateUser(this.state.data);
}

render(){
    return(
<div className = "container">
       <form className = "center">
       <div className="FormRow">
            <label htmlFor = "firstName"  id ="oi"> USER DESCRIPTION :  </label>  
         </div>
         &nbsp;
      <div className="FormRow">
            <label htmlFor = "firstName"  id ="o">FirstName :  </label>
               <input value = {this.state.data.FirstName} onChange={this.f}></input>
         </div>
         &nbsp;
         <div className="FormRow">
            <label htmlFor = "lasttName"  id ="o">LastName : </label>
            <input value = {this.state.data.LastName} onChange={this.l}></input>
         </div>
         &nbsp;
         <div className="FormRow">
            <label htmlFor = "email"  id ="o">Email : </label>
            <input value = {this.state.data.Email} onChange={this.e}></input>
         </div>
         &nbsp; 
         <div className="FormRow">
            <label htmlFor = "phon"  id ="o">Phone : </label>
            <input value = {this.state.data.Phone} onChange={this.p}></input>
         </div>
         &nbsp;
         <div className="FormRow">
            <label htmlFor = "addree"  id ="o">Address : </label>
            <input value = {this.state.data.Address} onChange={this.a}></input>
         </div>
         &nbsp;
         <div className="FormRow">
         <label htmlFor = "picture"  id ="o">Picture : </label>
                         <input type="file"  id="imageFile" name='imageFile' onChange={this.imageUpload} />
                         <img id="imms" src={this.state.data.Picture} width={100} height={100}  />
                     </div>  
                     <div className = "FormRow">
                         <button id = "btn2" onClick={this.saveHandler}>Save</button>
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
export default connect(stateToProps, dispatchToProps) (Edit);