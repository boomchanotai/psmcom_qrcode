import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';
import { Consumer } from '../App';

import './test.css';

import Navbar from './header';

class Test extends Component{
    render(){
        return(
            <div>
                <div className="whole-container">
                    <div className="self-info">
                        <div className="Name-icon">
                            <div className="icon-container">
                                <div className="some-icon"></div>
                            </div>
                            <div className="self-nameclass">
                                <div>Chanotai Krajeam</div>
                                <div>M.4 / IT</div>
                            </div>
                        </div>
                        <div className="self-score">
                            <div>1</div>
                            <div>No.1</div>
                        </div>
                    </div>
                    <div className="listboard">
                        <div className="item-rank">
                            <div className="item-userinfo">
                                <div className="rank-place">1</div>
                                <div className="inner-info">
                                    <div className="icon-container-sm">
                                        <div className="some-icon-sm"></div>
                                    </div>
                                    <div className="rank-info">
                                        <div>Nickname</div>
                                        <div>M.4 / IT</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rank-score">1</div>
                        </div>
                        <div className="item-rank">
                            <div className="item-userinfo">
                                <div className="rank-place">1</div>
                                <div className="inner-info">
                                    <div className="icon-container-sm">
                                        <div className="some-icon-sm"></div>
                                    </div>
                                    <div className="rank-info">
                                        <div>Nickname</div>
                                        <div>M.4 / IT</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rank-score">1</div>
                        </div>
                        <div className="item-rank">
                            <div className="item-userinfo">
                                <div className="rank-place">1</div>
                                <div className="inner-info">
                                    <div className="icon-container-sm">
                                        <div className="some-icon-sm"></div>
                                    </div>
                                    <div className="rank-info">
                                        <div>Nickname</div>
                                        <div>M.4 / IT</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rank-score">1</div>
                        </div>
                        <div className="item-rank">
                            <div className="item-userinfo">
                                <div className="rank-place">1</div>
                                <div className="inner-info">
                                    <div className="icon-container-sm">
                                        <div className="some-icon-sm"></div>
                                    </div>
                                    <div className="rank-info">
                                        <div>Nickname</div>
                                        <div>M.4 / IT</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rank-score">1</div>
                        </div>
                        <div className="item-rank">
                            <div className="item-userinfo">
                                <div className="rank-place">1</div>
                                <div className="inner-info">
                                    <div className="icon-container-sm">
                                        <div className="some-icon-sm"></div>
                                    </div>
                                    <div className="rank-info">
                                        <div>Nickname</div>
                                        <div>M.4 / IT</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rank-score">1</div>
                        </div>
                        <div className="item-rank">
                            <div className="item-userinfo">
                                <div className="rank-place">1</div>
                                <div className="inner-info">
                                    <div className="icon-container-sm">
                                        <div className="some-icon-sm"></div>
                                    </div>
                                    <div className="rank-info">
                                        <div>Nickname</div>
                                        <div>M.4 / IT</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rank-score">1</div>
                        </div>
                        <div className="item-rank">
                            <div className="item-userinfo">
                                <div className="rank-place">1</div>
                                <div className="inner-info">
                                    <div className="icon-container-sm">
                                        <div className="some-icon-sm"></div>
                                    </div>
                                    <div className="rank-info">
                                        <div>Nickname</div>
                                        <div>M.4 / IT</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rank-score">1</div>
                        </div>
                        <div className="item-rank">
                            <div className="item-userinfo">
                                <div className="rank-place">1</div>
                                <div className="inner-info">
                                    <div className="icon-container-sm">
                                        <div className="some-icon-sm"></div>
                                    </div>
                                    <div className="rank-info">
                                        <div>Nickname</div>
                                        <div>M.4 / IT</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rank-score">1</div>
                        </div>
                        <div className="item-rank">
                            <div className="item-userinfo">
                                <div className="rank-place">1</div>
                                <div className="inner-info">
                                    <div className="icon-container-sm">
                                        <div className="some-icon-sm"></div>
                                    </div>
                                    <div className="rank-info">
                                        <div>Nickname</div>
                                        <div>M.4 / IT</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rank-score">1</div>
                        </div>
                        <div className="item-rank">
                            <div className="item-userinfo">
                                <div className="rank-place">1</div>
                                <div className="inner-info">
                                    <div className="icon-container-sm">
                                        <div className="some-icon-sm"></div>
                                    </div>
                                    <div className="rank-info">
                                        <div>Nickname</div>
                                        <div>M.4 / IT</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rank-score">1</div>
                        </div>
                        <div className="item-rank">
                            <div className="item-userinfo">
                                <div className="rank-place">1</div>
                                <div className="inner-info">
                                    <div className="icon-container-sm">
                                        <div className="some-icon-sm"></div>
                                    </div>
                                    <div className="rank-info">
                                        <div>Nickname</div>
                                        <div>M.4 / IT</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rank-score">1</div>
                        </div>
                        <div className="item-rank">
                            <div className="item-userinfo">
                                <div className="rank-place">1</div>
                                <div className="inner-info">
                                    <div className="icon-container-sm">
                                        <div className="some-icon-sm"></div>
                                    </div>
                                    <div className="rank-info">
                                        <div>Nickname</div>
                                        <div>M.4 / IT</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rank-score">1</div>
                        </div>
                        <div className="item-rank">
                            <div className="item-userinfo">
                                <div className="rank-place">1</div>
                                <div className="inner-info">
                                    <div className="icon-container-sm">
                                        <div className="some-icon-sm"></div>
                                    </div>
                                    <div className="rank-info">
                                        <div>Nickname</div>
                                        <div>M.4 / IT</div>
                                    </div>
                                </div>
                            </div>
                            <div className="rank-score">1</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Test;