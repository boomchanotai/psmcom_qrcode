import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import QrReader from 'react-qr-reader';

import Navbar from './header';
import './home.css';

import { withRouter, Redirect } from "react-router-dom";

class Scanner extends Component{

    constructor(props){
        super(props);
        this.state = {
            result: 'No Result'
        }

        this.handleScan = this.handleScan.bind(this);
    }

    handleScan = data => {
        if (data) {
          this.setState({
            result: data
          })
          // document.querySelector('#scanner-result').innerHTML = this.state.result;
          if (this.state.result.includes(window.location.hostname)) {
              // window.location.href = this.state.result;

              let link = this.state.result.replace(":3000", "").replace("http://", "").replace("https://", "").replace(window.location.hostname, "")
              
              this.props.history.push(link);
          } else {
                window.location.href = this.state.result;
          }
        }
    }

    handleError = err => {
        console.error(err)
    }

    render(){
        if (this.props.role === "junior") {
            return(
                <div>
                    <Navbar />
                    <div className="scanner-container">
                        <QrReader
                            delay={10}
                            onError={this.handleError}
                            onScan={this.handleScan}
                            className="scanner-scan"
                        />
                        <Link to="/"><button id="scanner-result">Back To Home</button></Link>
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

export default withRouter(Scanner);