import React from 'react';
import './App.css';
import Add from './Components/Add';
import View from './Components/View';
import Edit from './Components/Edit';
import MainPage from './Components/MainPage';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
// store imports
import { Provider } from 'react-redux';
import { appStore } from './store.js';


function App() {
  return (
    <Provider store={appStore}>
   <Router>
      <div className = "container"><form className = "center3"><Link id = "home" to = "/">HOME</Link></form></div>
     <Switch>
     <Route path = "/" exact component = {MainPage}></Route>
     <Route path = "/Add" component = {Add}></Route>
     <Route path = "/View" component = {View}></Route>
     <Route path = "/Edit" component = {Edit}></Route>
     </Switch>
   </Router>
   </Provider>
  )
}

export default App;
