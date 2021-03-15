import React, {Component} from 'react';
import axios from 'axios';
import CreateEmployee from './createEmployee';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'; 

export default class Employees extends Component{
    constructor(props){
        super(props)
        this.state = {
            employees: [],
            isNewEmp: false,
            isEdit: false
        }
        axios.defaults.baseURL = 'http://127.0.0.1:8000';
    }
    
    componentDidMount(){
        axios.get('/api/employees/'
        )
            .then(response =>{
                this.setState({
                    employees: response.data
                })
            })
    }

    add(){
        this.setState({
            isNewEmp: !this.state.isNewEmp,
            employee: {}
        });
    }

    deleteEmployee(emp_id){
        axios.delete(`/api/employees/${emp_id}/`)
            .then(response =>{
                this.setState({
                    employees: response.data
                })
            })
    }

    editEmployee(emp_id){
        axios.get(`/api/employees/${emp_id}/`)
            .then(response =>{
                this.setState({
                    employee: response.data,
                    isEdit: true
                })
            })
    }

    render(){
        return (
            <div>
                { this.state.isEdit ? <CreateEmployee employee={this.state.employee}/>:
                <div>
                    Employee Lists
                <table>  
                <thead>  
                  <tr>  
                    <th>Name</th>
                    <th>Email</th>
                    <th>Designation</th>
                    <th>Department</th>  
                    <th>Age</th>  
                    <th>Gender</th>  
                    <th>Action</th>  
                  </tr>  
                </thead>  
                <tbody>  
                    {this.state.employees.map((item, idx)=>{
                        return <tr key={idx}>
                            <td>{item.name}</td>
                            <td>{item.email}</td>  
                            <td>{item.designation}</td>  
                            <td>{item.dept}</td>  
                            <td>{item.age}</td>  
                            <td>{item.gender}</td>  
                            <td>  
                                <div class="btn-group">  
                                    <button className="btn btn-warning" onClick={() => { this.editEmployee(item.id) }}>Edit</button>  
                                    <button className="btn btn-warning" onClick={() => { this.deleteEmployee(item.id) }}>Delete</button>  
                                </div>  
                            </td>  
                        </tr>  
                        })    
                    }
                </tbody>  
              </table>  
              </div>}
    
            </div>
                
        )
    }
}

