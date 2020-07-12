import React, { Component } from 'react';
import Logo from '../img/psmcom-1000.png'
import './login.css';
import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

import { Link } from 'react-router-dom';

class LoginPage extends Component{

    constructor(){
        super();
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let email = this.state.email;
        let password = this.state.password;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.reload()
            console.log("Logged In!");
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorMessage = error.message;
            
            console.log(errorMessage);
            document.querySelector('#warning').innerHTML = errorMessage;
        });
    }

    handleInputChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render(){
        return(
            <div className="loginpage">
                <div className="container">
                    <div className="logo">
                        <img src={Logo} alt="psmcom" />
                    </div>       
                    <form method="POST" onSubmit={this.handleSubmit}>
                        <div className="form-contain">
                            <div>
                                <label htmlFor="email">Email</label>
                                <input type="email" name="email" placeholder="Email" onChange={this.handleInputChange} required />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input type="password" name="password" placeholder="Password" onChange={this.handleInputChange} required />
                            </div>
                            <div class="forget">Forget Password, <Link to="/forgetpassword">Click me</Link></div>
                            <div className="warning" id="warning"></div>
                        </div>
                        <button type="submit">LOGIN</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default LoginPage;