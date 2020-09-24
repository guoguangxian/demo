import React, { Component } from 'react'
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
import { userLogin } from '../../api/UserApi';


export default class Login extends Component {

    constructor() {
        super()
        this.state = {
            loginLoading: false
        }
        this.onFinish = this.onFinish.bind(this)
    }

    componentWillMount() {
        // 获取localstorage
        let userInfo = window.localStorage.getItem("userInfo");
        // 判断用户是否登录
        if (userInfo) {
            setTimeout(() => {
                this.props.history.push({
                    pathname: "/home"
                })
            }, 500);
           
        }
    }

    onFinish(values) {
        console.log('onFinish:' + values)
        console.log(values.username)

        this.setState({
            loginLoading:true
        })

        let reqData = {
            account: values.username,
            password: values.password,
            clientType: 'web',
            deviceCode: 'web'
        }
        
       userLogin(reqData).then(
            (res) => {
                console.log("get article response:", res);
                window.localStorage.setItem("userInfo", JSON.stringify({"a":1}))
                this.setState({
                    loginLoading:false
                })
                console.log(2222)
                this.props.history.push('/home')
            }
        )
        console.log(1111)
        
    }

    render() {
        return (
            <div className='login'>
                <div className='login-content'>
                    <div className='login-title'>xxx管理系统</div>
                    <Form name='login-form' className='login-form' initialValues={{ remember: true }} onFinish={this.onFinish}>
                        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
                            <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder="用户名"></Input>
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]} >
                            <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="密码" />
                        </Form.Item>
                        <Form.Item>
                            <Form.Item name="remember" valuePropName="checked" noStyle>
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                            <a className="login-form-forgot" href="">
                                Forgot password
                            </a>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" loading={this.state.loginLoading} className="login-form-button">
                                Log in
                            </Button>
                            Or <a href="">register now!</a>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}
