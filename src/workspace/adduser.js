import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

import Navbar from './header';
import './adduser.css';

import { Redirect } from 'react-router-dom';

class AddUser extends Component {

    // delete when upload to production

    constructor(props){
        super(props);
        this.state = {
            stuid : '',
            name : '',
            nickname : '',
            password : 'psmcom123456',
            role : 'junior',
            class : 'M.4 / MT',
            userrole : props.role
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let student_id = this.state.stuid
        let email = this.state.stuid + "@spsm.ac.th";
        let name = this.state.name;
        let nickname = this.state.nickname;
        let password = this.state.password;
        let role = this.state.role;
        let uclass = this.state.class;

        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            let user = firebase.auth().currentUser
            firebase.database().ref('users/' + user.uid).set({
                name: name,
                nickname: nickname,
                resetfirstpassword : false,
                role : role,
                class : uclass,
                student_id : student_id
            });
            if (role === "junior") {
                firebase.database().ref('users/' + user.uid).update({
                    totalsign : 0
                })
            }
            console.log("Registered !");
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorMessage = error.message;
            
            console.log(errorMessage);
        });
    }

    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
        
    }

    render(){
        if (this.state.userrole === "senior") {
            return(
                <div>
                    <Navbar />
                    <div className="adduser">
                        <form method="POST" onSubmit={this.handleSubmit}>
                            <h3>Add New User</h3>
                            <div>
                                <label htmlFor="stuid">Student ID : </label>
                                <input type="text" name="stuid" placeholder="Student ID" onChange={this.handleInputChange} autoComplete="new-password" required />
                            </div>
                            <div>
                                <label htmlFor="name">Name : </label>
                                <input type="text" name="name" placeholder="Name" onChange={this.handleInputChange} autoComplete="new-password" required />
                            </div>
                            <div>
                                <label htmlFor="nickname">Nickname : </label>
                                <input type="text" name="nickname" placeholder="Nickname" onChange={this.handleInputChange} autoComplete="new-password" required />
                            </div>
                            <div>
                                <label htmlFor="password">Password : </label>
                                <input type="password" name="password" placeholder="Password" onChange={this.handleInputChange} autoComplete="new-password" disabled required />
                            </div>
                            <div>
                                <label htmlFor="role">Role : </label>
                                <select name="role" onChange={this.handleInputChange} required>
                                    <option value="junior">Junior | รุ่นน้อง</option>
                                    <option value="senior">Senior | รุ่นพี่</option>
                                </select>
                            </div>
                            <div>
                                <label htmlFor="class">Class : </label>
                                <select name="class" onChange={this.handleInputChange} required>
                                    <option value="M.4 / MT">M.4 / MT</option>
                                    <option value="M.4 / IT">M.4 / IT</option>
                                    <option value="M.4 / DE">M.4 / DE</option>
                                    <option value="M.5 / MT">M.5 / MT</option>
                                    <option value="M.5 / IT">M.5 / IT</option>
                                    <option value="M.6 / IT">M.6 / IT</option>
                                    <option value="M.6 / MT">M.6 / MT</option>
                                </select>
                            </div>
                            <button>Submit</button>
                        </form>
                    </div>
                </div>
            );
        } else {
            return(
                <Redirect to="/" />
            );
        }
        
    }
}

export default AddUser;