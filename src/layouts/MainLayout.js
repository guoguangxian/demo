import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    HomeOutlined
} from '@ant-design/icons';

import './MainLayout.css'
import { Link } from 'react-router-dom';

const { Header, Sider, Content, Footer } = Layout;

export default class MainLayout extends Component {

    state = {
        collapsed: false,
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        console.log(this.props)
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
                        <Header className="site-layout-background" style={{ padding: 0 }}>
                            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                className: 'trigger',
                                onClick: this.toggle,
                            })}
                        </Header>
                        {/* 面包屑 */}
                        <Breadcrumb style={{ margin: '24px 16px 0 16px' }}>
                            {
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
                            }
                        </Breadcrumb>

                        <Content className="site-layout-background"
                            style={{
                                margin: '24px 16px',
                                padding: 24,
                                minHeight: 280,
                            }}
                        >
                            {this.props.children}
                        </Content>

                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </div>
                </Layout>

            </Layout>
        )
    }
}
