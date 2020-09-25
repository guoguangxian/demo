
import React, { Component } from 'react';
import './Home.css';

const crumbs = [{
    "name": "xxx管理系统",
    "path": "/",
    "clickable": true
}, {
    "name": "首页",
    "path": "/",
    "clickable": false
}]

export default class Home extends Component {
    render() {
        return (
            <div><h1>首页</h1></div>
        )
    }
}
