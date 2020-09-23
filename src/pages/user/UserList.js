import React, { Component } from 'react'
import MainLayout from '../../layouts/MainLayout'
import { Form, Row, Col, Input, Button, Table, Modal } from 'antd';
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

        this.state = {
            addModalVisible: false,
            addModalLoading: false,
        }

        this.getFields = this.getFields.bind(this);
        this.onFinish = this.onFinish.bind(this);
        this.showAddModal = this.showAddModal.bind(this);
        this.getOperation = this.getOperation.bind(this);
        this.handleAddOk = this.handleAddOk.bind(this);
        this.handleAddCancel = this.handleAddCancel.bind(this);
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

    showAddModal() {
        this.setState({
            addModalVisible: true,
        });
    }

    getOperation() {
        const children = [];
        children.push(<Button key='1' type="primary" onClick={this.showAddModal}>新增</Button>)
        children.push(<Button key='2' style={{ marginLeft: "16px" }}>修改</Button>)
        return children
    }

    /**
     * 处理新增对话框
     */
    handleAddOk() {
        this.setState({ addModalLoading: true });
        setTimeout(() => {
            this.setState({ addModalLoading: false, addModalVisible: false });
        }, 3000);
    }

    handleAddCancel() {
        this.setState({ addModalVisible: false });
    }

    render() {

        const pagination = {
            defaultCurrent: 1,
            defaultPageSize: 10,
            current: 1,
            total: 0
        }

        return (
            <MainLayout crumbs={crumbs} selectedKeys={['2']}>
                <ListComponent dataSource={dataSource} columns={columns} pagination={pagination}
                    onFinish={this.onFinish} getFields={this.getFields} getOperation={this.getOperation}  ></ListComponent>
                <Modal
                    visible={this.state.addModalVisible}
                    title="Title"
                    onOk={this.handleAddOk}
                    onCancel={this.handleAddCancel}
                    footer={[
                        <Button key="back" onClick={this.handleAddCancel}>
                            Return
            </Button>,
                        <Button key="submit" type="primary" loading={this.state.addModalLoading} onClick={this.handleAddOk}>
                            Submit
            </Button>,
                    ]}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </MainLayout>
        )
    }
}
