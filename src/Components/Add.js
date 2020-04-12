import React, {Component} from 'react';
// redux import
import { connect } from 'react-redux';
import {
    addUserAction
} from '../Actions/Users_Actions';


class Add extends Component{
constructor(props){
    super(props)
     this.state ={
         firstName : "",
         lastName : "",
         email : "",
         phone : "",
         address : "",
         picture : "",
         firstNameError : "",
         lastNameError : "",
         emailError : "",
         phoneError : "",
         addressError : ""
     }
}

firstNameHandler = (event) => {
    if(!event.target.value || event.target.value.length < 5 || !/^[a-zA-Z]+$/.test(event.target.value))
    {
        this.setState({
            firstNameError : "Invalid FirstName"
        })
    }
   else{ this.setState({
        firstNameError : ""
    })
} 
  if(event.target.value)
    { this.setState({
    firstName : event.target.value
})
    }
}
 lastNameHandler = (event) => {
    if(!event.target.value || event.target.value.length < 5)
    {
        this.setState({
            lastNameError : "Invalid LastName"
        })
    }
   else{ this.setState({
        lastNameError : ""
    })
} 
  if(event.target.value)
    { this.setState({
    lastName : event.target.value
})
    }
 }

 

 emailHandler = (event) => {
    if(!event.target.value || !event.target.value.includes("@"))
    {
        this.setState({
            emailError : "Invalid Email"
        })
    }
   else{ this.setState({
        emailError : ""
    })
} 
  if(event.target.value)
    { this.setState({
    email : event.target.value
})
    }
 }

 phoneHandler = (event) => {
     var res = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{5}$/.test(event.target.value);
     if(!res)
     {
         this.setState({
             phoneError : "Invalid Phone Number"
         })
     }
     else{this.setState({
         phoneError : ""
     })
    }
    if(res = true){
    this.setState({
        phone : event.target.value
    })
}
 }

addressHandler = (event) => {
    if(!event.target.value || event.target.value.length < 5)
    {
        this.setState({
            addressError : "Invalid Address"
        })
    }
   else{ this.setState({
        addressError : ""
    })
} 
  if(event.target.value)
    { this.setState({
    address : event.target.value
})
    }
 }

 imageUpload = (e) => {
    const file = e.target.files[0];
    this.getBase64(file).then(base64 => {
        
        // localStorage["fileBase64"] = base64; 
        document.getElementById('imms').src = base64;
        this.setState({
            picture : base64
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

   

 showHandler = (event) => {
     event.preventDefault();
     if (this.state.firstName != "" 
        && this.state.lastName !=""
        && this.state.email !="" 
        && this.state.address != "") {
     
        const Persons = {
            FirstName: this.state.firstName,
            LastName: this.state.lastName,
            Email: this.state.email,
            Phone: this.state.phone,
            Address: this.state.address,
            Picture: this.state.picture
        };
    
        this.props.saveUser(Persons);
    
    /* let x = localStorage.getItem("People");
    if(x){
        x = JSON.parse(x) //now making again people object
        Persons.Id = x.length;
        x.push(Persons) // again pushing person object in people
        x = JSON.stringify(x)
        localStorage.setItem("People", x)
        
        //setting people array in local storage in stringify form
    }
    else{
        const People = [] //creating array
        Persons.Id = 0;
        People.push(Persons)//pushing person object in to  people array
        localStorage.setItem("People", JSON.stringify(People)) // setting people array in local storage and stringify the object
    } */
    } else {
      alert( "fill the fields first")
    }
}
 

render(){
    return(
            <div className = "container">
               <form className = "center" onSubmit = {this.showHandler}>
                     <div className="FormRow">
                         <label htmlFor = "firstName" >FirstName</label>
                         <input id = "firstName" onChange = {this.firstNameHandler} ></input>
                           <label id = "bb">{this.state.firstNameError} </label>
                     </div> 
                     <div className="FormRow">
                         <label htmlFor = "lastName" >LastName</label>
                         <input id = "lastName"onChange = {this.lastNameHandler} ></input>
                         <label id = "bb">{this.state.lastNameError} </label>
                     </div>
                     <div className="FormRow">
                         <label htmlFor = "email" >Email</label>
                         <input id = "email" onChange = {this.emailHandler}></input>
                         <label id = "bb">{this.state.emailError} </label>
                     </div>     
                     <div className="FormRow">
                         <label htmlFor = "phone" >PhoneNumber</label>
                         <input id = "phone"onChange = {this.phoneHandler} ></input>
                         <label id = "bb">{this.state.phoneError} </label>
                     </div>   
                     <div className="FormRow">
                         <label htmlFor = "address" >Address</label>
                         <textarea id = "address" onChange = {this.addressHandler} ></textarea>
                         <label id = "bb">{this.state.addressError} </label>
                     </div>  
                     <div className="FormRow">
                         <label htmlFor = "picture" >Add Photo</label>
                         <input type="file"  id="imageFile" name='imageFile' onChange={this.imageUpload} />
                         <img id="imms" src="" width={100} height={100}  />
                     </div>  
                     <div className = "FormRow">
                         <button id = "btn2">Submit</button>
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
        saveUser: (data) => dispatch(addUserAction(data))
    }
}
export default connect(stateToProps, dispatchToProps) (Add);