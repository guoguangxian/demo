import React, { Component } from 'react'
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined,
    HomeOutlined,
    SettingOutlined
} from '@ant-design/icons';
import MenuConfig from '../config/MenuConfig';

const { SubMenu } = Menu;

export default class MenuComponent extends Component {

    constructor() {
        super()
    }

    getMenu(data) {
        return (
            <Menu.Item key={data.key} icon={this.getIcon(data.icon)} >
                <Link to={data.path}>
                    {data.name}
                </Link>
            </Menu.Item>
        )
    }

    getSubMenu(data) {
        return (
            <SubMenu
                key={data.key}
                title={data.name}
                icon={this.getIcon(data.icon)}
            >
                {
                    data.children && data.children.map((item, index) => {
                        return item.children && item.children.length > 0 ? this.getSubMenu(item) : this.getMenu(item)
                    })
                }
            </SubMenu>
        )
    }

    getIcon(iconName) {
        switch (iconName) {
            case 'MenuUnfoldOutlined':
                return <MenuUnfoldOutlined />
            case 'MenuFoldOutlined':
                return <MenuFoldOutlined />
            case 'HomeOutlined':
                return <HomeOutlined />
            case 'UserOutlined':
                return <UserOutlined />
            case 'SettingOutlined':
                return <SettingOutlined />
            default:
                return ''
        }
    }

    render() {

        return (
            <Menu theme='dark' mode='inline' selectedKeys={this.props.selectedKeys} onClick={this.props.menuClick}>
                {MenuConfig.map((item) => {
                    return item.children && item.children.length > 0 ? this.getSubMenu(item) : this.getMenu(item)
                })}
            </Menu>
        )
    }
}
