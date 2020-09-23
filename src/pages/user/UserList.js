import React, { Component } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Form, Row, Col, Input, Button, Table } from 'antd';
import './UserList.css';
import ListComponent from '../../components/ListComponent';


const crumbs = [{
    "name": "xxx管理系统",
    "path": "/",
    "clickable": true
}, {
    "name": "用户管理",
    "clickable": false
}, {
    "name": "列表",
    "path": "/user/list",
    "clickable": true
}]

const dataSource = [
    {
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号',
    },
    {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号',
    },
];

const columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    },
    {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    },
];

export default class UserList extends Component {

    constructor() {
        super()

        this.getFields = this.getFields.bind(this);
        this.onFinish = this.onFinish.bind(this);

    }


    getFields(expand) {
        const count = expand ? 10 : 6;
        const children = [];
        for (let i = 0; i < count; i++) {
            children.push(
                <Col span={8} key={i}>
                    <Form.Item
                        name={`field-${i}`}
                        label={`Field ${i}`}
                        rules={[
                            {
                                required: true,
                                message: 'Input something!',
                            },
                        ]}
                    >
                        <Input placeholder="placeholder" />
                    </Form.Item>
                </Col>,
            );
        }
        return children;
    }

    onFinish(values) {
        console.log('Received values of form: ', values);
    };

    render() {

        const pagination = {
            defaultCurrent:1,
            defaultPageSize:10,
            current:1,
            total:0
        }

        return (
            <MainLayout crumbs={crumbs} selectedKeys={['2']}>
                <ListComponent dataSource={dataSource} columns={columns} pagination={pagination} 
                onFinish={this.onFinish} getFields={this.getFields} ></ListComponent>
            </MainLayout>
        )
    }
}
