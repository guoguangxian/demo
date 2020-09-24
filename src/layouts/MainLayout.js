import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Avatar, Dropdown, Badge, message, Spin } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    BellOutlined,
    HomeOutlined,
    SettingOutlined
} from '@ant-design/icons';

import './MainLayout.css'
import { Link } from 'react-router-dom';
import { createHashHistory } from "history";
const history = createHashHistory();

const { Header, Sider, Content, Footer } = Layout;
const { SubMenu } = Menu;

export default class MainLayout extends Component {

    constructor() {
        super()
        this.state = {
            collapsed: false,
            spinLoading: true
        }
    }

    componentWillMount() {
        let userInfo = window.localStorage.getItem("userInfo");
        console.log(history)
        // 判断用户是否登录
        if (!userInfo) {
            message.error('未登录不能访问系统')
            setTimeout(function () {
                history.push({
                    pathname: "/login"
                })
            }, 500)
        }
        setTimeout(() => {
            this.setState({
                spinLoading: false
            })
        }, 3000);

    }

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

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
                <Menu.Item danger>登出</Menu.Item>
            </Menu>
        )
    }

    render() {
        return (

            <Layout>

                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className='logo'></div>
                    <Menu theme='dark' mode='inline' defaultSelectedKeys={this.props.selectedKeys}>
                        <Menu.Item key="1" icon={< HomeOutlined />}>
                            <Link to='/'>
                                首页
                            </Link>
                        </Menu.Item>
                        <Menu.Item key='2' icon={<UserOutlined />}>
                            <Link to='/user/list'>
                                用户管理
                            </Link>
                        </Menu.Item>
                        <SubMenu
                            key="systemMgr"
                            title={
                                <span>
                                    <SettingOutlined />
                                    <span>系统管理</span>
                                </span>
                            }
                        >
                            <Menu.Item key="9">Option 9</Menu.Item>
                            <Menu.Item key="10">Option 10</Menu.Item>
                            <Menu.Item key="11">Option 11</Menu.Item>
                            <Menu.Item key="12">Option 12</Menu.Item>
                        </SubMenu>
                        <Menu.Item key='3' icon={<VideoCameraOutlined />}>
                            <Link to='/login'>
                                登录
                            </Link>
                        </Menu.Item>
                    </Menu>
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

                                <div style={{ display: "inline-block", padding: "0 24px" }}>
                                    <Badge count={0}>
                                        <BellOutlined style={{ fontSize: '18px' }} />
                                    </Badge>
                                </div>

                                <div style={{ display: "inline-block", padding: "0 24px" }}>
                                    <Dropdown placement="bottomCenter" overlay={this.dropdownMenu}>
                                        <div>
                                            <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                                <Avatar icon={<UserOutlined />} />
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
