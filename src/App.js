import React, { Component, createContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './App.css';
import './Condition.css'
import './workspace/navbar.css';
import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

import Leaderboard from './workspace/leaderboard';
import Listcheck from './workspace/listnamecheck';
import AddUser from './workspace/adduser';
import Home from './workspace/home';
import Scanner from './workspace/scanner';
import LoginPage from './workspace/login';
import Token from './workspace/Token';
import ChangePassword from './workspace/changepass';
import ForgetPassword from './workspace/forgetpassword';
import ExcelDownload from './workspace/data';

var firebaseConfig = {
  apiKey: "AIzaSyDQhZ6sL3_zaMTfwNj1VmPEHyQxNCO0SSI",
  authDomain: "psmcom-2c1b9.firebaseapp.com",
  databaseURL: "https://psmcom-2c1b9.firebaseio.com",
  projectId: "psmcom-2c1b9",
  storageBucket: "psmcom-2c1b9.appspot.com",
  messagingSenderId: "115645224197",
  appId: "1:115645224197:web:efa457f7add45e1d71d36c",
  measurementId: "G-3NQ71CN3VZ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const { Provider, Consumer } = createContext({
  /*we can firebase onauthchange in every component or want to use context? ANS: Use context*/
  islogged : null,
  user : {
    uid : '',
    nname : '',
    fname : '',
    role : ''
  }
});

const NotFoundPage = () => {
  return(
    <div style={{height: "100vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column"}}>
      <h1 style={{color: "#ffffff"}}>Not Found Page</h1>
      <h3 style={{color: "#f1f1f1"}}>Back to <Link to="/" style={{color: "#008BFF", textDecoration: "none"}}>Home</Link> Page</h3>
    </div>
  );
}

const Loading = () => {
  return(
      <div className="loading-container">
          <div className="loadingio-spinner-ripple-7c8gt19jdgp">
            <div className="ldio-q8f9hwz2ze">
              <div></div>
              <div></div>
            </div>
          </div>
      </div>
  );
}

class Logout extends Component {
  componentDidMount(){
      firebase.auth().signOut().then(function() {
          console.log("Logged Out!")
        }).catch(function(error) {
          console.log(error)
        });   
  }

  render() {
      return(
          <Redirect to="/" />
      );
  }
}

class App extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      islogged : null,
      user : {
        uid : '',
        nname : '',
        fname : '',
        resetfirstpassword : null,
        role : '',
        use: false,
        show: false
      }
    }
  }

  componentDidMount(){
    let currentComponent = this;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        firebase.database().ref('users').child(`${user.uid}`).on('value', function(snap){
          let info = snap.val();
          
          if (info.role === "junior") {
            firebase.database().ref('users').orderByChild('role').equalTo('junior').on('value', snaps => {
              firebase.database().ref('users').orderByChild('totalsign').on('value', snap=>{
                let data = Object.values(snaps.val())
                // let scores = [];
  
                data.sort((a,b) => {
                    return b.totalsign - a.totalsign;
                })
  
                for (let index = 0; index < data.length; index++) {
                    data[index].rank = index +1
                }
  
                // sort เสร็จ
  
                const result = data.filter((user) => {
                    return user.name === info.name
                })
  
                currentComponent.setState({
                  islogged : true,
                  user : {
                    uid : user.uid,
                    nname : info.nickname,
                    fname : info.name,
                    resetfirstpassword : info.resetfirstpassword,
                    role : info.role,
                    class  : info.class,
                    totalsign : info.totalsign,
                    rank : result[0].rank
                  }
                })
              }) 
            })
          } else {
            currentComponent.setState({
              islogged : true,
              user : {
                uid : user.uid,
                nname : info.nickname,
                fname : info.name,
                resetfirstpassword : info.resetfirstpassword,
                role : info.role,
                class  : info.class
              }
            })
          }
          

        })
      } else {
        currentComponent.setState({
          islogged : false
        })
      }
    });

  }

  render(){
    if (this.state.islogged === null) {
      return(
        <Loading />
      );
    } else if(this.state.islogged === true) {
      if (this.state.user.resetfirstpassword === false) {
        return(
          <Provider value={this.state}>
            <Router>
              <Switch>
                <Route exact path="/logout" component={Logout} />
                <Route component={ChangePassword} />
              </Switch>
            </Router>
          </Provider>
        );
      } else {
        return(
          <Provider value={this.state}>
              <Router>
                <Route render={({location})=>(
                  <TransitionGroup>
                    <CSSTransition key={location.key} timeout={{enter: 500, exit: 0}} classNames="show-router" >
                      <Switch location={location}>
                        <Route exact path="/" component={({match})=>{return(<div><Home role={this.state.user.role} /></div>);}} />
                        <Route path="/token/:id" component={(props, {match})=>{return(<div><Token id={props.match.params.id} uid={this.state.user.uid} role={this.state.user.role} /></div>);}} />
                        <Route path="/scanner" component={({match})=>{return(<div><Scanner role={this.state.user.role} /></div>);}} />
                        <Route path="/changepassword" component={({match})=>{return(<div><ChangePassword /></div>);}} />
                        <Route path="/adduser" component={({match})=>{return(<div><AddUser role={this.state.user.role} /></div>);}} />
                        <Route path="/leaderboard" component={({match})=>{return(<div><Leaderboard role={this.state.user.role} /></div>);}} />
                        <Route path="/checklist" component={({match})=>{return(<div><Listcheck uid={this.state.user.uid} class={this.state.user.class} nickname={this.state.user.nname} role={this.state.user.role} /></div>);}} />
                        <Route path="/data" component={({match})=>{return(<div><ExcelDownload role={this.state.user.role} /></div>);}} />
                        <Route path="/logout" component={(Logout)}/>
                        <Route component={({match})=>{return(<div><NotFoundPage /></div>);}} />
                      </Switch>
                    </CSSTransition>
                  </TransitionGroup>
                )}/>
              </Router>
          </Provider>
        );
      }
    } else {
      return(
          <Router>
            <Switch>
              <Route exact path="/forgetpassword" component={ForgetPassword} />
              <Route component={LoginPage} />
            </Switch>
          </Router>
      );
    }
  }
}

export default App;
export { Loading, Provider, Consumer };