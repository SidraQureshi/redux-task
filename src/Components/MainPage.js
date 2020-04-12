import React, {Component} from 'react'
import Style from './Style.css'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import Add from './Add'
import { deleteUserAction } from '../Actions/Users_Actions';

class MainPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchTerm : "",
            idList: []
        }
    }

    searchHandler = (event) => {
        this.setState({
            searchTerm : event.target.value
        });
    }

setIndex(ind) {
    localStorage.setItem("selectedIndex", ind);
}

deleteIndex (id) {
    this.props.removeUser({ id });
}

selectRecord(id) {
    let x = this.state.idList;
    if (x.indexOf(id) === -1) {
        x.push(id);
        this.setState({
            idList: x
        })
    } else {
        x.splice(x.indexOf(id), 1);
        this.setState({
            idList: x
        });
    }
}

deleteMultiple() {
    this.state.idList.forEach(selid => {
        this.deleteIndex(selid);
    });

    this.props.userReducer.users.forEach((v, ind) => {
        document.getElementById('chk' + ind).checked = false;
    })
}

render() {
    return(
        <div className = "container center1">
            <div className="row">
               <form>
                   <span>
                        <Link to = "/Add">
                            <button id = "btn1">ADD USER</button>
                        </Link>
                    </span>
                </form>
                <button id = "btn1" onClick={() => this.deleteMultiple()}>DELETE</button>
            </div>
            <div className="row">
                <div className = "col-md-12">
                    <div className = "form-group">
                        <input type="text" id = "tt" name="search" onChange = {this.searchHandler} onKeyDown = {this.enterHandler} placeholder="Search.."/>
                    </div>
                        <table className = "table table-hover" style = {{"overflow" : "scroll" }}>
                            <thead>
                                <tr scope = "col">
                                    <th></th>
                                    <th id = "o">FirstName</th>
                                    <th id = "o" >LastName</th>
                                    <th id = "o">Email</th>
                                    <th id = "o">Phone</th>
                                    <th id = "o">Address</th>
                                    <th id = "o">Picture</th>
                                    <th id = "o" colSpan="3">Operations</th>
                                </tr>
                            </thead> 
                            <tbody>
                            {
                                (this.props.userReducer ? (this.props.userReducer.users || []) : []).filter((v, vind) =>
                                    {
                                    
                                    return (!this.state.searchTerm ||
                                    v.FirstName.toLowerCase().includes(this.state.searchTerm) || 
                                    v.LastName.toLowerCase().includes(this.state.searchTerm) ||
                                    v.Email.toLowerCase().includes(this.state.searchTerm) ||
                                    v.Phone.toLowerCase().includes(this.state.searchTerm) ||
                                    v.Address.toLowerCase().includes(this.state.searchTerm));
                                    })
                                    .map((element, index) => (
                                    <tr key={'row'+index}>
                                        <td>
                                         <input type="checkbox" id={"chk" + index} class = "cb" defaultChecked={false} onClick={() => this.selectRecord(element.id)}/>
                                        </td>
                                        <td id="i">{element.FirstName}</td>
                                        <td id="i">{element.LastName}</td>
                                        <td id="i">{element.Email}</td>
                                        <td id="i">{element.Phone}</td>
                                        <td id="i"><div className="tarea">{element.Address}</div></td>
                                        <td>{element.Picture== ""?"":<img src= {element.Picture} width="50" height="50" />}</td>
                                        <td><Link to="/View"><button className="view" onClick={()=> this.setIndex(element.id)}>View</button></Link></td>
                                        <td><Link to="/Edit"><button className="edit" onClick={()=> this.setIndex(element.id)}>Edit</button></Link></td>
                                        <td><button className="delete" onClick={() => this.deleteIndex(element.id)}>Delete</button></td>
                                    </tr>
                                ))
                            }                                       
                            </tbody> 
                        </table>
                    </div>
            </div>
    </div>
)}
}

function stateToProps(store) {
    return store;
}

function dispatchToProps(dispatch) {
    return {
        removeUser: (data) => dispatch(deleteUserAction(data))
    }
}

export default connect(stateToProps, dispatchToProps) (MainPage);