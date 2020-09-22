
import React, { Component } from 'react';
import './Home.css';
import MainLayout from '../../layout/MainLayout';



export default class Home extends Component {
    render() {
        return (
            <MainLayout test={"测试"}>
                首页
            </MainLayout>
        )
    }
}
