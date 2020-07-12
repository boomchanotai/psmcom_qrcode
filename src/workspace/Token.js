import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

import { Redirect } from 'react-router-dom';

import './Token.css';
import Navbar from './header';

class Token extends Component {

    constructor(props){
        super(props);
        this.state = {
            token_available : null,
            success_user : '',
            user_role : props.role
        }
    }

    componentDidMount(){
        
        if (this.state.user_role === "junior") {
            let currentComponent = this;

            const token = this.props.id;

            const tokenref = firebase.database().ref('qrcode/' + token)

            if (this.state.token_available !== true) {
                tokenref.once('value').then((snap) => {

                    if (snap.val() != null) {
    
                        let tokenData = snap.val();
                        let tokenExpire = tokenData.expire;
                        let tokenOwner = tokenData.owner;
                        console.log(tokenExpire + " " + new Date().getTime())
                        
                        if (tokenExpire <= new Date().getTime()) {
                            currentComponent.setState({
                                token_available: "expire"
                            })
                            // console.log("expire")
                        } else {
    
                            // check if scan phee kon nee laew
                            let ownqr_uid = tokenOwner;
                            let user_uid = this.props.uid;
                            let scanned_ref = firebase.database().ref('users/' + user_uid + '/scanned')
                            
                            scanned_ref.orderByChild('token').equalTo(token).on('value', function(snap){
                                if (snap.val() == null) {
                                    
                                    scanned_ref.orderByChild('scanned_uid').equalTo(ownqr_uid).on('value', (snap) => {
                                        if(snap.val() == null){
                                            scanned_ref.push({
                                                token : token,
                                                scanned_uid : ownqr_uid
                                            }, function(error){
                                                if (error) {
                                                    console.log("ERROR:" + error)
                                                } else {
    
                                                    // i use this callback because like do push finish and then do something below
                                                    scanned_ref.on('value', snap => {
                                                        if (snap.val() != null) {
                                                            firebase.database().ref('users/' + user_uid).update({
                                                                totalsign : Object.keys(snap.val()).length
                                                            })
                                                            currentComponent.setState({
                                                                token_available: true
                                                            })
                                                        }
                                                    })
                                                }
                                            })
                                            
                                            // console.log("pushed !")
                                        } else {
                                            currentComponent.setState({
                                                token_available: "scanned_user"
                                            })
    
                                            // console.log("แสกนพี่คนนี้แล้ว")
                                        }
                                    })
                                    
                                } else {
    
                                    // เช็คว่าใช้ token นี้ไปยัง (ใน 1 นาทีนั้น)
                                    currentComponent.setState({
                                        token_available: true
                                    })
    
                                    firebase.database().ref('users/' + ownqr_uid + '/nickname').on('value', (snap) => {
                                        currentComponent.setState({
                                            success_user : snap.val()
                                        })
                                    })
                                    // console.log("used token")
                                }
                                
                            })
                                
                            
                        }
    
                    } else {
                        currentComponent.setState({
                            token_available: "notfound"
                        })
                    }
                })
            }

            
        }

    }

    componentWillUnmount(){
        this.setState({
            token_available : null,
            success_user : '',
            user_role : ''
        })
    }

    render(){
        if (this.state.user_role === "senior") {
            return(
                <Redirect to="/" />
            );
            
        } else {
            if (this.state.token_available === null) {
                return(
                    <div></div>
                );
            } else if(this.state.token_available === true){
                return(
                    <div>
                        <Navbar />
                        <Success success_user={this.state.success_user} />
                    </div>
                );
            } else if(this.state.token_available === "notfound") {
                return(
                    <div>
                        <Navbar />
                        <Failed message="ไม่พบโค้ดนี้ในระบบ !" />
                    </div>
                );
            } else if(this.state.token_available === "expire") {
                return(
                    <div>
                        <Navbar />
                        <Failed message="โค้ดนี้หมดอายุแล้ว !" />
                    </div>
                );
            } else if(this.state.token_available === "scanned_user") {
                return(
                    <div>
                        <Navbar />
                        <Failed message="น้องเคยแสกนโค้ดของพี่คนนี้แล้ว !" />
                    </div>
                );
            }
        }
        
    }
}

const Success = (props) => {
    return(
        <div>
            <Navbar />
            <div className="success-container">
                <h3>การสแกนโค้ดสำเร็จ !</h3>
                <div>น้องได้ทำการสแกนโค้ดของพี่ {props.success_user} เรียบร้อยแล้ว!</div>
                <a href="/"><button className="btn-done">DONE</button></a>
            </div>
        </div>
    );
}

const Failed = (props) => {
    return(
        <div>
            <Navbar />
            <div className="success-container">
                <h3>ไม่สำเร็จ !</h3>
                <div>{props.message}</div>
                <a href="/"><button className="btn-failed">DONE</button></a>
            </div>
        </div>
    );
}

export default Token;