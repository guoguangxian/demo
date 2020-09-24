
import React, { Component } from 'react';
import './Home.css';
import MainLayout from '../../layouts/MainLayout';


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
            <div>首页</div>
            // <MainLayout crumbs={crumbs} selectedKeys={['1']}>
            //     首页
            // </MainLayout>
        )
    }
}
