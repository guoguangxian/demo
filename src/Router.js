import React, { Component } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import UserList from './pages/user/UserList'

export default class Router extends Component {
    render() {
        return (
            <HashRouter>
                <Switch>
                    <Route path="/" exact component={Home} />
                    <Route path="/login" exact component={Login} />
                    <Route path="/user/list" exact component={UserList} />
                </Switch>
            </HashRouter>
        )
    }
}


