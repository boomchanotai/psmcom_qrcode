import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import { Consumer } from '../App';

import './leader.css';

import Navbar from './header';

class Leaderboard extends Component{

    constructor(props){
        super(props);
        this.state = {
            items : [],
            role: props.role
        }
    }

    componentDidMount = ()=>{
        
        const dsa = firebase.database().ref("users").orderByChild('role').equalTo('junior');
        dsa.on('value', (snap)=>{
            if (snap.val() != null) {
                let itemss = [];
                let itemordered = [];
                let key = Object.values(snap.val())
                //let num = 1;
                key.forEach(info => {
                    itemss.push(
                        <div className="leaders" key={info.name}>
                            <div className="leader-info z">
                                <div className="leader">
                                    <div className="rank"></div>
                                    <div class="leader-icon-container">
                                        <div className="leader-icons"></div>
                                    </div>
                                    <div className="leader-nameinfo">
                                        <div>{info.nickname}</div>
                                        <div>{info.class}</div>
                                    </div>
                                </div>
                                <div className="leader-score">
                                    <label>{info.totalsign}</label>
                                </div>
                            </div>
                        </div>
                    )
                });
                itemordered.push(itemss.sort((a,b)=>{
                    return b.props.children.props.children[1].props.children.props.children - a.props.children.props.children[1].props.children.props.children;
                }))
                
                itemordered = itemordered[0].slice(0,7)
                
                this.setState({
                    items: itemordered
                })
            }
            
        })
        
    }

    componentDidUpdate(){
        let num = 1;
        document.querySelectorAll('.rank').forEach((rank)=>{
            rank.innerHTML= num;
            num++;
        })
    }

    componentWillUnmount(){
        this.setState({
            items : []
        })
    }

    render(){
        if(this.state.role === "junior"){
            return(
                <div>
                    <Navbar />
                    <div className="bigcontain">
                        <div className="user-info">
                            <div className="ddd">
                                <div className="icon-box">
                                    <div className="icons"></div>
                                </div>
                                <div className="user-nameinfo">
                                    <div>
                                        <Consumer>
                                            {({ islogged, user }) => (user.nname)}
                                        </Consumer>
                                    </div>
                                    <div>
                                        <Consumer>
                                            {({ islogged, user }) => (user.class)}
                                        </Consumer>
                                    </div>
                                </div>
                            </div>
                            <div className="score">
                                <label>
                                    <Consumer>
                                        {({ islogged, user }) => (user.totalsign)}
                                    </Consumer>
                                </label>
                                <label>NO.
                                    <Consumer>
                                        {({ islogged, user }) => (user.rank)}
                                    </Consumer>
                                </label>
                            </div>
                        </div>
                        <div className="leaderboard">
                            <div className="leader-contain">
                                {this.state.items}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div>
                    <Navbar />
                    <div className="bigcontain">
                        <div className="user-info">
                            <div className="ddd">
                                <div className="icon-box">
                                    <div className="icons"></div>
                                </div>
                                <div className="user-nameinfo">
                                    <div>
                                        <Consumer>
                                            {({ islogged, user }) => (user.nname)}
                                        </Consumer>
                                    </div>
                                    <div>
                                        <Consumer>
                                            {({ islogged, user }) => (user.class)}
                                        </Consumer>
                                    </div>
                                </div>
                            </div>
                            <div className="score hi">
                                <label>ขี้เกียจ</label>
                                <label>Dave55</label>
                            </div>
                        </div>
                        <div className="leaderboard">
                            <div className="leader-contain">
                                {this.state.items}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
       
    }
}

export default Leaderboard;