import React, {Component} from 'react';
import Select from 'react-select';
import axios from 'axios';

const options = [
    {value: 'manager', label:'Manager'},
    {value: 'developer', label: 'Developer'},
    {value: 'lead', label: 'Tech Lead'}
]
export default class CreateEmployee extends Component{
    constructor(props){
        super(props)
        this.onChange = this.onChange.bind(this);
        const emp = this.props.employee;
        this.state = {
           ...this.getInitial(emp || {})
        }
        axios.defaults.baseURL = 'http://127.0.0.1:8000';
    }

    getInitial(emp){
       return {id: emp.id,
        name: emp.name,
        email: emp.email,
        designation: emp.designation,
        mobileNo: emp.mobile_no,
        dept: emp.dept,
        age: emp.age,
        gender: emp.gender,
        todoList: emp.todo_items || [],
        todo:''
        }
    }

    handleChange(e, name){
        this.setState({[name]:e}); 
      }

    getEmp(data){
        return {
            name: this.state.name,
            email:this.state.email,
            designation: this.state.designation.value,
            mobileNo: this.state.mobileNo,
            dept: this.state.dept.value,
            age: this.state.age,
            gender: this.state.gender.value,
            todoList: this.state.todoList
        }
    }
    update(id){
        let emp = this.getEmp(this.state);
        axios.put(`/api/employees/${id}/`, emp)
        .then(response =>{
            this.setState({
                employees: response.data
            })
        })
    }

    addUpdateEmployee(){
        if (this.state.id)
            this.update(this.state.id)
        else
            this.addEmployee()
    }

    addEmployee(){
        let emp = this.getEmp(this.state);
        axios.post(`/api/employees/`, emp)
        .then(response =>{
            this.props.history.push('/EmployeeList')
        })
    }

    deleteTodo(value){
        let todoList = this.state.todoList.filter(item => item !=value);
        this.setState({todoList});
    }

    addTodo(){
        let value = this.state.todo,
         todoList = [...this.state.todoList];
        todoList.push(value);
        this.setState({todoList});
    }

    onChange(e){
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    render(){
        return (
            <div>
                New Employee
                <div>
                    <table>
                        <tr>
                            <td>
                                Name
                            </td>
                            <td>
                                <input name='name' type='textbox' onChange={this.onChange} value={this.state.name}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Email
                            </td>
                            <td>
                                <input name='email' type='textbox' onChange={this.onChange} value={this.state.email}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Designation
                            </td>
                            <td>
                            <Select
                                value={this.state.designation}
                                onChange={(e) => this.handleChange(e, "designation")}
                                options={options}
                            />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Mobile
                            </td>
                            <td>
                                <input name='mobile_no' type='textbox' onChange={this.onChange} value={this.state.mobileNo}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Department
                            </td>
                            <td>
                            <Select
                                value={this.state.dept}
                                name='dept'
                                onChange={(e) => this.handleChange(e, "dept")}
                                options={[
                                    {value: 'hr', label:'HR'},
                                    {value: 'IT', label: 'IT'},
                                    {value: 'admin', label: 'Admin'}
                                ]}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Age
                            </td>
                            <td>
                                <input name='age' type='textbox' onChange={this.onChange} value={this.state.age}></input>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Gender
                            </td>
                            <td>
                            <Select
                                value={this.state.gender}
                                name='gender'
                                onChange={(e) => this.handleChange(e, "gender")}
                                options={[
                                    {value: 'm', label:'Male'},
                                    {value: 'f', label: 'Female'},
                                ]}/>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Add Todo Item
                            </td>
                            <td>
                                <input name='todo' onChange={this.onChange} value={this.state.todo} type='textbox'></input>
                                <button className="btn btn-warning" onClick={() => { this.addTodo() }}>Add</button> 
                            </td>
                        </tr>
                        <tr>
                             <td>
                                 Todo list
                             </td>
                             </tr>
                             
                        {this.state.todoList.map((item)=>{
                             return <tr>
                             <td>
                                 <label>{item}</label>
                             </td>
                             <td>
                                 <button onClick={() => {this.deleteTodo(item)}}>Delete</button>
                             </td>
                         </tr>
                        })}
                       
                        <tr>
                        <button className="btn btn-warning" onClick={() => { this.addUpdateEmployee() }}>Add/Update Employee</button> 
                        </tr>
                    </table>
                </div>
            </div>
        )
    }
}
