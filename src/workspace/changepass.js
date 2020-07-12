import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

import Navbar from './header';
import './changepass.css';

import { withRouter } from "react-router-dom";

class ChangePassword extends Component{

    constructor(props){
        super(props);
        this.state = {
            new_password : '',
            confirm_password : ''
        }
    }

    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let user = firebase.auth().currentUser;
        let currentComponent = this;

        if (this.state.new_password === this.state.confirm_password) {
            var newPassword = this.state.new_password;
            user.updatePassword(newPassword).then(function() {
                let emailAddress = user.email;
                firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
                    firebase.database().ref('users/' + user.uid).update({
                        resetfirstpassword : true
                    })
                    currentComponent.props.history.push('/');
                })
                
            }).catch(function(error) {
                error = error.toString()
                error = error.replace("Error: ", "")
                document.querySelector('#warning').innerHTML = error;
                // console.log("ChangePassword : " + error)
            });
        } else {
            document.querySelector('#warning').innerHTML = "Password not match !";
            // console.log("Password not match !")
        }
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="every">
                    <div className="changepass-container">
                        <h3>CHANGE PASSWORD</h3>
                        <form method="POST" onSubmit={this.handleSubmit} className="form-container">
                            <div className="form-marginer">
                                <div>
                                    <label htmlFor="new_password">New Password</label>
                                    <input type="password" name="new_password" placeholder="New Pasword" onChange={this.handleInputChange} required/>
                                </div>
                                <div>
                                    <label htmlFor="confirm_password">Confirm Password</label>
                                    <input type="password" name="confirm_password" placeholder="Confirm Pasword" onChange={this.handleInputChange} required/>
                                </div>
                                <div className="warning" id="warning"></div>
                                <div className="haha">
                                    <button>DONE</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ChangePassword);