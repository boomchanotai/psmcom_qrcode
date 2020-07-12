import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

import './changepass.css';

import { withRouter, Link } from "react-router-dom";

class ForgetPassword extends Component{

    constructor(props){
        super(props);
        this.state = {
            email : ''
        }

        this.backtohome = this.backtohome.bind(this)
    }

    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let currentComponent = this;

        var auth = firebase.auth();
        var emailAddress = this.state.email;

        auth.sendPasswordResetEmail(emailAddress).then(function() {
            document.querySelector('#warning').style.color = "#ffffff";
            document.querySelector('#warning').innerHTML = "Email Sent !";
            setTimeout(() => {
                currentComponent.props.history.push('/');
            }, 2000);
        }).catch(function(error) {
            error = error.toString()
            error = error.replace("Error: ", "")
            document.querySelector('#warning').innerHTML = error;
        });
    }

    backtohome = (event) => {
        this.props.history.push('/');
    }

    render(){
        return(
            <div>
                <div className="forgetpassword">
                    <div className="changepass-container">
                        <h3>Forget Password ?</h3>
                        <form method="POST" onSubmit={this.handleSubmit} className="form-container">
                            <div className="form-marginer">
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input type="email" name="email" placeholder="Email" onChange={this.handleInputChange} required/>
                                </div>
                                <div className="warning" id="warning"></div>
                                <div className="haha">
                                    <button type="submit">DONE</button>
                                    <div class="forget"><Link to="/">Back to Login</Link></div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ForgetPassword);