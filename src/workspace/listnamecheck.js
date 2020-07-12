import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import { Consumer } from '../App';

import './leader.css';

import Navbar from './header';

class Listcheck extends Component{

    constructor(props){
        super(props);
        this.state = {
            items: "",
            itemscancel: "",
            nickname: props.nickname,
            class: props.class,
            role: props.role
        }
    }

    componentDidMount = ()=>{
        let user_uid = this.props.uid
        const userrole = firebase.database().ref("users").child(`${user_uid}`);
        let scanarray = [];
        userrole.on('value', (snapshot)=>{
            if(this.state.role === "junior"){
                const seniorlist = firebase.database().ref("users").orderByChild('role').equalTo('senior');
                let itemss = [];
                let itemsscancel = [];
                let itemorderedcancel = [];
                let itemordered = [];
                let num = 0;
                if(snapshot.val().scanned){
                    let scanned = Object.values(snapshot.val().scanned);
                    scanned.forEach(scanlist => {
                        scanarray.push(scanlist.scanned_uid)
                    })
                    seniorlist.on('value', (snap)=>{
                        let value = Object.values(snap.val()) 
                        let key = Object.keys(snap.val())
                        value.forEach(info => {
                            if(scanarray.includes(key[num])){
                                itemsscancel.push(
                                    <div className="leaders" key={info.name}>
                                        <div className="leader-info">
                                            <div className="leader list">
                                                <div className="leader-icons icon-cancel"></div>
                                                <div className="leader-nameinfo">
                                                    <div className="name-cancel">{info.nickname}</div>
                                                    <div className="class-cancel">{info.class}</div>
                                                </div>
                                            </div>
                                            <div className="leader-score">
                                                <label>{}</label>
                                            </div>
                                        </div>
                                    </div>
                                )
                            } else{
                                itemss.push(
                                    <div className="leaders" key={info.name}>
                                        <div className="leader-info">
                                            <div className="leader list">
                                                <div className="leader-icons"></div>
                                                <div className="leader-nameinfo">
                                                    <div>{info.nickname}</div>
                                                    <div>{info.class}</div>
                                                </div>
                                            </div>
                                            <div className="leader-score">
                                                <label>{}</label>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            num++;
                        })
                        itemordered.push(itemss.sort((a,b)=>{
                            let namea = a.props.children.props.children[0].props.children[1].props.children[0].props.children.toLowerCase();
                            let nameb = b.props.children.props.children[0].props.children[1].props.children[0].props.children.toLowerCase();
                            if(nameb < namea)
                                return 1;
                            if(nameb > namea)
                                return -1;
                            return 0;
                        }))
                        itemorderedcancel.push(itemsscancel.sort((a,b)=>{
                            let namea = a.props.children.props.children[0].props.children[1].props.children[0].props.children.toLowerCase();
                            let nameb = b.props.children.props.children[0].props.children[1].props.children[0].props.children.toLowerCase();
                            if(nameb < namea)
                                return 1;
                            if(nameb > namea)
                                return -1;
                            return 0;
                        }))
                        this.setState({items: itemordered})
                        this.setState({itemscancel: itemorderedcancel})
                    })
                } else {      
                    seniorlist.on('value', (snap)=>{
                        let value = Object.values(snap.val()) 
                        value.forEach(info => {
                            itemss.push(
                                <div className="leaders" key={info.name}>
                                    <div className="leader-info">
                                        <div className="leader list">
                                            <div className="leader-icons"></div>
                                            <div className="leader-nameinfo">
                                                <div>{info.nickname}</div>
                                                <div>{info.class}</div>
                                            </div>
                                        </div>
                                        <div className="leader-score">
                                            <label>{}</label>
                                        </div>
                                    </div>
                                </div>
                            )
                            num++;
                        })
                        
                        itemordered.push(itemss.sort((a,b)=>{
                            let namea = a.props.children.props.children[0].props.children[1].props.children[0].props.children.toLowerCase();
                            let nameb = b.props.children.props.children[0].props.children[1].props.children[0].props.children.toLowerCase();
                            if(nameb < namea)
                                return 1;
                            if(nameb > namea)
                                return -1;
                            return 0;
                        }))
                        this.setState({items: itemordered})
                    })
                }
            } else {
                const juniorlist = firebase.database().ref("users").orderByChild('role').equalTo('junior');
                juniorlist.on('value', (snaps)=>{
                    let eachjunior = Object.keys(snaps.val());
                    let itemss = [];
                    let itemsscancel = [];
                    let itemorderedcancel = [];
                    let itemordered = [];
                    eachjunior.forEach(junior => {
                        const juniorscan = firebase.database().ref("users/"+junior+"/scanned").orderByChild('scanned_uid').equalTo(`${user_uid}`);
                        juniorscan.on('value',(snapfw)=>{
                        const juniordata = firebase.database().ref("users/"+junior);
                        if(snapfw.val() != null){
                            juniordata.on('value',(snapa)=>{
                                itemsscancel.push(
                                    <div className="leaders" key={Object.values(snapa.val())[2]}>
                                        <div className="leader-info">
                                            <div className="leader list">
                                                <div className="leader-icons icon-cancel"></div>
                                                <div className="leader-nameinfo">
                                                    <div className="name-cancel">{Object.values(snapa.val())[2]}</div>
                                                    <div className="class-cancel">{Object.values(snapa.val())[0]}</div>
                                                </div>
                                            </div>
                                            <div className="leader-score">
                                                <label>{}</label>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        } else{
                            juniordata.on('value',(snapa)=>{
                                itemss.push(
                                    <div className="leaders" key={Object.values(snapa.val())[2]}>
                                        <div className="leader-info">
                                            <div className="leader list">
                                                <div className="leader-icons"></div>
                                                <div className="leader-nameinfo">
                                                    <div>{Object.values(snapa.val())[2]}</div>
                                                    <div>{Object.values(snapa.val())[0]}</div>
                                                </div>
                                            </div>
                                            <div className="leader-score">
                                                <label>{}</label>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        })
                        
                        
                    })
                    itemordered.push(itemss.sort((a,b)=>{
                        let namea = a.props.children.props.children[0].props.children[1].props.children[0].props.children.toLowerCase();
                        let nameb = b.props.children.props.children[0].props.children[1].props.children[0].props.children.toLowerCase();
                        if(nameb < namea)
                            return 1;
                        if(nameb > namea)
                            return -1;
                        return 0;
                    }))
                    itemorderedcancel.push(itemsscancel.sort((a,b)=>{
                        let namea = a.props.children.props.children[0].props.children[1].props.children[0].props.children.toLowerCase();
                        let nameb = b.props.children.props.children[0].props.children[1].props.children[0].props.children.toLowerCase();
                        if(nameb < namea)
                            return 1;
                        if(nameb > namea)
                            return -1;
                        return 0;
                    }))
                    this.setState({items: itemordered})
                    this.setState({itemscancel: itemorderedcancel})
                })
            }
        })
        
    }

    render(){
        if(this.state.role === "junior"){
            return(
                <div>
                    <Navbar />
                    <div className="bigcontain checklist">
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
                                <label>No. 
                                    <Consumer>
                                        {({ islogged, user }) => (user.rank)}
                                    </Consumer>
                                </label>
                            </div>
                        </div>
                        <div className="leaderboard locksize">
                            <div className="leader-contain">
                                {this.state.items}
                                {this.state.itemscancel}
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {
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
                                <label>ผมหล่อมาก</label>
                            </div>
                        </div>
                        <div className="leaderboard locksize list-senior">
                            <div className="leader-contain">
                                {this.state.items}
                                {this.state.itemscancel}
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
       
    }
}

export default Listcheck;