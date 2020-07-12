import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import './data.css';

import Navbar from './header';

import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

import ReactExport from "react-export-excel";
const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

class ExcelDownload extends Component{

    constructor(props){
      super(props);
      this.state = {
        data : [],
        de : [],
        mt : [],
        it : [],
        date : null
      }
    }
  
    componentDidMount(){
      if (this.props.role === "senior") {
        firebase.database().ref("users").orderByChild("role").equalTo("junior").once("value").then(snap => {
          
          let data = snap.val();
          data = Object.values(data);
  
          data = data.sort((a,b) => {
            return b.totalsign - a.totalsign
          })
  
          this.setState({
            data : data
          })
  
          let mtdata = [];
          let itdata = [];
          let dedata = [];
  
          data.forEach(junior => {
            if (junior.class === "M.4 / MT") {
              mtdata.push(junior)
            } else if (junior.class === "M.4 / IT") {
              itdata.push(junior)
            } else if (junior.class === "M.4 / DE") {
              dedata.push(junior)
            }
          });
  
          mtdata = mtdata.sort((a,b) => {
            return a.student_id - b.student_id
          })
          itdata = itdata.sort((a,b) => {
            return a.student_id - b.student_id
          })
          dedata = dedata.sort((a,b) => {
            return a.student_id - b.student_id
          })
  
          this.setState({
            mt : mtdata,
            it : itdata,
            de : dedata,
            date : new Date()
          })
          
        })
      }
    }
  
    render(){
      if (this.props.role === "senior") {
        return(
            <div className="excel">
                <Navbar />
                <ExcelFile filename={"DATA-Scanned-PSMCOM63-" + this.state.date} element={<button>Download Data</button>}>
                    <ExcelSheet data={this.state.data} name="All 2563 QRCode Scanned">
                        <ExcelColumn label="ID" value="student_id"/>
                        <ExcelColumn label="Name" value="name"/>
                        <ExcelColumn label="Nickname" value="nickname"/>
                        <ExcelColumn label="TotalScanned" value="totalsign"/>
                    </ExcelSheet>
                    <ExcelSheet data={this.state.mt} name="MT 2563 QRCode Scanned">
                        <ExcelColumn label="ID" value="student_id"/>
                        <ExcelColumn label="Name" value="name"/>
                        <ExcelColumn label="Nickname" value="nickname"/>
                        <ExcelColumn label="TotalScanned" value="totalsign"/>
                    </ExcelSheet>
                    <ExcelSheet data={this.state.it} name="IT 2563 QRCode Scanned">
                        <ExcelColumn label="ID" value="student_id"/>
                        <ExcelColumn label="Name" value="name"/>
                        <ExcelColumn label="Nickname" value="nickname"/>
                        <ExcelColumn label="TotalScanned" value="totalsign"/>
                    </ExcelSheet>
                    <ExcelSheet data={this.state.de} name="DE 2563 QRCode Scanned">
                        <ExcelColumn label="ID" value="student_id"/>
                        <ExcelColumn label="Name" value="name"/>
                        <ExcelColumn label="Nickname" value="nickname"/>
                        <ExcelColumn label="TotalScanned" value="totalsign"/>
                    </ExcelSheet>
                </ExcelFile>
            </div>
        );
      } else {
        return(
          <Redirect to="/" />
        );
      }
      
    }
}

export default ExcelDownload;