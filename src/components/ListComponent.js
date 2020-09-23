import React, { Component } from 'react'

import { Form, Row, Col, Input, Button, Table } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import './ListComponent.css';

export default class ListComponent extends Component {

    constructor() {
        super()
        this.state = {
            expand: false
        }
        this.setExpand = this.setExpand.bind(this);
    }

    formRef = React.createRef();

    setExpand() {
        this.setState({
            expand: !this.state.expand
        })
    }


    render() {

        const dataSource = this.props.dataSource;
        const columns = this.props.columns;
        const pagination = this.props.pagination;

        return (
            <div>
                <Form ref={this.formRef} name="advanced_search" className="ant-advanced-search-form" onFinish={this.props.onFinish}>
                    <Row gutter={24}>{this.props.getFields(this.state.expand)}</Row>

                    <Row>
                        <Col span={24} style={{ textAlign: 'right', }} >
                            <Button type="primary" htmlType="submit">
                                Search
                    </Button>
                            <Button style={{ margin: '0 8px', }} onClick={() => { this.formRef.current.resetFields(); }}>
                                Clear
                    </Button>
                            <a style={{ fontSize: 12, }} onClick={this.setExpand} >
                                {this.state.expand ? <UpOutlined /> : <DownOutlined />} Collapse
                            </a>
                        </Col>
                    </Row>
                </Form>


                <div className="search-result-list">
                    <Table dataSource={dataSource} columns={columns} pagination={pagination} />
                </div>
            </div>
        )
    }
}
