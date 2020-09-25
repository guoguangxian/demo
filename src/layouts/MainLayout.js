import {
    BellOutlined, MenuFoldOutlined, MenuUnfoldOutlined,

    UserOutlined
} from '@ant-design/icons';
import { Avatar, Badge, Breadcrumb, Dropdown, Layout, Menu, message, Spin } from 'antd';
import React, { Component } from 'react';
import MenuComponent from '../components/MenuComponent';
import MenuConfig from '../config/MenuConfig';
import './MainLayout.css';
import {withRouter} from "react-router-dom";


const { Header, Sider, Content, Footer } = Layout;

class MainLayout extends Component {

    constructor() {
        super()
        this.state = {
            collapsed: false,
            spinLoading: true,
            sideMenuSelectedKeys: [],
            menuPathKeyMap: new Map()
        }

        this.handlerSiderMenuClick = this.handlerSiderMenuClick.bind(this)
    }

    componentDidMount() {
        console.log('componentDidMount')
        console.log(this)
        let userInfo = window.localStorage.getItem("userInfo");
        // 判断用户是否登录
        console.log(this.props)
        if (!userInfo) {
            message.error('未登录不能访问系统')
            let history = this.props.history;
            this.aa = setTimeout(function () {
                console.log()
                history.push("/login")
            }, 500)
            return
        }
        setTimeout(() => {
            this.setState({
                spinLoading: false
            })
        }, 3000);

        // 设置路径和菜单key的映射关系
        let map = this.changeToMenuMap(MenuConfig)

        console.log(map)

        // 设置菜单选中 
        let pathname = this.props.history.location.pathname;
        let menuKey = map.get(pathname)
        console.log(menuKey)

        this.setState({
            menuPathKeyMap: map,
            sideMenuSelectedKeys: [menuKey]
        })
    }

    componentWillUnmount(){
        clearTimeout(this.aa)
    }

    changeToMenuMap = (data) => {
        let map = new Map()
        data.map((item, index) => {
            map.set(item.path, item.key);
            let childrenMap = item.children && item.children.length > 0 ? this.changeToMenuMap(item.children) : new Map()
            for (let [k, v] of childrenMap) {
                map.set(k, v)
            }
            return map;
        })
        return map;
    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    // 头像下拉菜单
    dropdownMenu = () => {
        return (
            <Menu>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                        个人中心
                        </a>
                </Menu.Item>
                <Menu.Item>
                    <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
                        修改密码
                     </a>
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item onClick={this.handlerLogout}>退出登录</Menu.Item>
            </Menu>
        )
    }

    handlerLogout=()=> {
        window.localStorage.removeItem("userInfo")
        this.props.history.push("/login")
    }

    handlerSiderMenuClick({ item, key, keyPath, domEvent }) {
        this.setState({
            sideMenuSelectedKeys: [key]
        })
    }

    getAccount() {
        let userInfo = window.localStorage.getItem("userInfo");
        let account = '';
        if (userInfo) {
            account = JSON.parse(userInfo).account;
        }
        return account
    }

    render() {
        let account = this.getAccount();
        console.log('render')
        return (
           
            <Layout>
                {/* 侧边栏 */}
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className='logo'></div>
                    <MenuComponent menuClick={this.handlerSiderMenuClick} selectedKeys={this.state.sideMenuSelectedKeys} />
                </Sider>

                <Layout className="site-layout">
                    <div className='main-wrap'>
                        {/* 头部 */}
                        <Header className="site-layout-background" style={{ padding: 0, clear: "both" }}>

                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: this.toggle,
                            })}

                            <div style={{ float: "right", padding: "0 24px" }}>

                                <div style={{ display: "inline-block", padding: "0 20px" }}>
                                    <Badge count={0}>
                                        <BellOutlined style={{ fontSize: '18px' }} />
                                    </Badge>
                                </div>

                                <div style={{ display: "inline-block", padding: "0 20px" }}>
                                    <Dropdown placement="bottomCenter" overlay={this.dropdownMenu}>
                                        <div>
                                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                                <Avatar icon={<UserOutlined />} />
                                                <span style={{ marginLeft: "8px", color: "rgba(0,0,0,.65)" }}>{account}</span>
                                            </a>
                                        </div>
                                    </Dropdown>
                                </div>

                            </div>
                        </Header>

                        {/* 面包屑 */}
                        <Breadcrumb style={{ margin: '24px 16px 0 16px' }}>
                            {/* {
                                this.props.crumbs.map(function (item, index) {
                                    if (item.clickable) {
                                        return (
                                            <Breadcrumb.Item key={index}>
                                                <Link to={item.path}>{item.name}</Link>
                                            </Breadcrumb.Item>
                                        )
                                    } else {
                                        return (
                                            <Breadcrumb.Item key={index}>
                                                {item.name}
                                            </Breadcrumb.Item>
                                        )
                                    }
                                })
                            } */}
                        </Breadcrumb>

                        {/* 主内容 */}
                        <Content className="site-layout-background"
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280,
                            }}
                        >
                            <Spin spinning={this.state.spinLoading} size="large">
                                {this.props.children}
                            </Spin>
                        </Content>

                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </div>
                </Layout>

            </Layout>
        )
    }
}

export default withRouter(MainLayout)