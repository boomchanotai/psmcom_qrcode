import React, { useState } from 'react';
import './navbar.css';
import { CSSTransition } from 'react-transition-group';
import { Link } from 'react-router-dom';

import { Consumer } from '../App';

const Navbar = (props) => {
    let [useNav, setuseNav] = useState(false);
    let [show, setshow] = useState(false);

    return(
        <div>
            <nav>
                <div className="info">
                    <Consumer>
                        {({ islogged, user }) => (user.nname)}
                    </Consumer>
                </div>
                <div className="menu" onClick={()=>{setuseNav(true)}}>
                    <svg viewBox="0 0 18 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect y="0.669891" width="18" height="2.59223" rx="1.29612" fill="#102239"/>
                        <rect y="4.99026" width="18" height="2.59223" rx="1.29612" fill="#102239"/>
                        <rect y="9.31067" width="18" height="2.59223" rx="1.29612" fill="#102239"/>
                    </svg>
                </div>
            </nav>

            <CSSTransition in={useNav} unmountOnExit timeout={350} classNames="toggling" onEntered={()=>{setshow(!show)}}>
                <div className="navtransition"></div>
            </CSSTransition>
            <CSSTransition in={show} unmountOnExit timeout={350} classNames="show" onEntered={()=>{setuseNav(!useNav)}} onExited={()=>{setuseNav(!useNav)}}>
                <div id="sidebar" className="sidebar-container">
                    <div className="info-contain">
                        <div className="header-info">
                            <div className="just">
                                <div className="icon"></div>
                                <div className="identical-info">
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
                            <div className="xbut" onClick={()=>{setuseNav(true)}}>
                                <span className="x1"></span>
                                <span className="x2"></span>
                            </div>
                        </div>
                        <hr/>
                        <ul className="list-contain">
                            <Link to="/"><li>Home</li></Link>
                            <Link to="/leaderboard"><li>Leaderboard</li></Link>
                            <Link to="/checklist"><li>Check List</li></Link>
                            <Link to="/changepassword"><li>Change Password</li></Link>
                            <Link to="/logout"><li>Log Out</li></Link>
                        </ul>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
}

export default Navbar;