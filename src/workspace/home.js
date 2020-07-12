import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

import QRCode from "react-qr-code";
import { Link } from 'react-router-dom';

import Navbar from './header';
import './home.css';

import { Consumer } from '../App';

class Home extends Component {

    render(){
        // if 62 login if 63 login
        if(this.props.role === "senior"){
            return(
                <Consumer>
                    {({ islogged, user }) => (
                        <Home62 uid={user.uid} />
                    )}
                </Consumer>
            );
        } else if(this.props.role === "junior"){
            return(
                <Consumer>
                    {({ islogged, user }) => (
                        <Home63 uid={user.uid} />
                    )}
                </Consumer>
            );
        }
    }
}

class Home62 extends Component {

    constructor() {
        super();
        this.state = { 
            time: 0, 
            seconds: 59, 
            qr_key : ''
        };
        this.timer = 0;
        this.startTimer = this.startTimer.bind(this);
        this.countDown = this.countDown.bind(this);
        this.gen = false;
        this.timeinterval = '';
    }

    componentDidMount() {
        document.querySelector('#gencode').style.display = "none";
    }

    startTimer() {
        if (this.timer === 0 && this.state.seconds > 0) {
            let expiretime = 1; // in minute
            this.timer = setInterval(this.countDown, 1000);
            document.querySelector('.generate').innerHTML = this.state.seconds;
            
            firebase.database().ref('qrcode').push({
                owner: this.props.uid,
                expire: new Date(new Date().getTime() + expiretime*60000).getTime()
            }).then((snap) => {
                const key = snap.key
                this.setState({
                    qr_key : key
                })
                document.querySelector('#gencode').style.display = "inherit";
            })
            // var splittime = new Date(new Date().getTime() + expiretime*60000).toString();
            // document.querySelector('.generate').innerHTML = "Expire : " + splittime.split(" ")[4]
        }
    }

    componentWillUnmount(){
        clearInterval(this.timer);
        clearInterval(this.generator);
    }

    countDown() {

        // Remove one second, set state so a re-render happens.
        // let seconds = this.state.seconds - 1;
        firebase.database().ref('qrcode/' + this.state.qr_key + '/expire').on('value', snap => {
            let remain = snap.val() - new Date().getTime()
            var seconds = Math.floor((remain % (1000 * 60)) / 1000);
            document.querySelector('.generate').innerHTML = seconds;
            this.setState({
                seconds: remain,
                time : seconds
            });
            
            // Check if we're at zero.
            if (remain <= 0) { 
                clearInterval(this.timer);
                clearInterval(this.generator);
                this.setState({
                    gen : false
                })
                // firebase.database().ref('qrcode/' + this.state.qr_key).remove()
                document.querySelector('.generate').innerHTML = "GENERATE";
                window.location.reload();
            }
        }) 
    }

    generator = () => {
        if (this.gen === false) {
            this.startTimer();
            this.setState({
                gen : true
            })
        }
    }
    
    render(){
        return(
            <div>
                <Navbar />
                <div className="gen-contain">
                    <h3>SCAN HERE</h3>
                    <div className="qrimg">
                        <div className="qrcode" id="gencode"><QRCode value={window.location.href + "token/" + this.state.qr_key} size={200} /></div>
                    </div>
                    <div className="generate" onClick={this.generator}>GENERATE</div>
                </div>
            </div>
        );
    }
}

class Home63 extends Component {

    constructor(){
        super();
        this.state = {
            countsign : 0
        }
    }

    componentDidMount(){
        firebase.database().ref('users/' + this.props.uid + '/scanned').on('value', snap => {
            if (snap.val() != null) {
                this.setState({
                    countsign : Object.keys(snap.val()).length
                })
            }
        })
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="home63-container">
                    <div className="scanbtn-box">
                        <Link to="/scanner"><div className="scan-button">
                            <div className="circle">
                                <svg viewBox="0 0 84 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="75.506" y="0.858833" width="8.29412" height="28.2" rx="4.14706" fill="white"/>
                                    <rect x="83.8" y="0.858833" width="8.29412" height="28.2" rx="4.14706" transform="rotate(90 83.8 0.858833)" fill="white"/>
                                    <rect x="9.15295" y="80.4824" width="8.29412" height="28.2" rx="4.14706" transform="rotate(-180 9.15295 80.4824)" fill="white"/>
                                    <rect x="0.858643" y="80.4824" width="8.29412" height="28.2" rx="4.14706" transform="rotate(-90 0.858643 80.4824)" fill="white"/>
                                    <rect x="83.7999" y="72.1883" width="8.29412" height="28.2" rx="4.14706" transform="rotate(90 83.7999 72.1883)" fill="white"/>
                                    <rect x="83.7999" y="80.4824" width="8.29412" height="28.2" rx="4.14706" transform="rotate(-180 83.7999 80.4824)" fill="white"/>
                                    <rect x="0.858643" y="9.15294" width="8.29412" height="28.2" rx="4.14706" transform="rotate(-90 0.858643 9.15294)" fill="white"/>
                                    <rect x="0.858643" y="0.858826" width="8.29412" height="28.2" rx="4.14706" fill="white"/>
                                </svg>
                            </div>
                            <div className="text">Scan</div>
                        </div></Link>
                    </div>
                    <div className="count-sign-box">
                        <div>Scan Score :</div>
                        <button className="count-sign">{this.state.countsign}</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;