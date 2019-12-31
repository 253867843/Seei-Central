import React, { Component } from 'react';

import { Form, Input } from 'antd';

class BodyAccount extends Component {
    constructor(props) {
        super(props);
    }

    validateToNextPassword = () => {

    }

    render() {
        // console.log('[bodyAccount props]', this.props);
        const username = this.props.location.state.group;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        return (
            <div className='bodyAccount'>
                <Form {...formItemLayout}>
                    <Form.Item label='用户名'>
                        {
                            getFieldDecorator('username', {
                                rules: [{ required: true, message: 'username is required' }],
                                initialValue: username
                            })(<Input placeholder='please input username' disabled />)
                        }
                    </Form.Item>

                    <Form.Item label='旧密码' hasFeedback>
                        {
                            getFieldDecorator('old_password', {
                                rules: [{ required: true, message: 'old_password is required' }]
                            })(<Input.Password placeholder='please input your old_password' />)
                        }
                    </Form.Item>

                    <Form.Item label='新密码' hasFeedback>
                        {
                            getFieldDecorator('new_password', {
                                rules: [{ required: true, message: 'new_password is required' }],
                                validator: this.validateToNextPassword
                            })(<Input.Password placeholder='please input your new_password' />)
                        }
                    </Form.Item>

                    <Form.Item label='确认密码' hasFeedback>
                        {
                            getFieldDecorator('password', {
                                rules: [{ required: true, message: 'confirm_new_password is required' }]
                            })(<Input.Password placeholder='please input your confirm_new_password' />)
                        }
                    </Form.Item>

                    <Form.Item label='验证码' hasFeedback>
                        {
                            getFieldDecorator('captcha', {
                                rules: [{ required: true, message: 'captcha is required' }]
                            })(<Input placeholder='please input captcha' />)
                        }
                    </Form.Item>

                </Form>
            </div>
        )
    }
}

export default BodyAccount;
