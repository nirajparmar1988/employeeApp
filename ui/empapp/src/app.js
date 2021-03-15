import React, {Component} from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';  
import Employees from './components/employee';
import CreateEmployee from './components/createEmployee';

export default class App extends Component{
    render(){
      return (  
        <Router>      
          <div className="container">      
            <nav className="navbar navbar-expand-lg navheader">      
              <div className="collapse navbar-collapse" >      
                <ul className="navbar-nav mr-auto">      
                  <li className="nav-item">      
                    <Link to={'/EmployeeList'} className="nav-link">Employee List</Link>      
                  </li>      
                  <li className="nav-item">      
                    <Link to={'/Addemployee'} className="nav-link">Add Employee</Link>      
                  </li>      
                </ul>      
              </div>      
            </nav> <br />      
            <Switch>      
              <Route exact path='/' component={Employees} />      
              <Route exact path='/EmployeeList' component={Employees} />      
              <Route path='/Addemployee' component={CreateEmployee} />     
            </Switch>      
          </div>      
        </Router>    )
    } 
}