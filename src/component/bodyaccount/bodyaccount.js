/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// action creators
import { actions as vcodeActions, getVerifyCodeImg } from '../../redux/vcode.redux';

// antd
import { Form, Input, Row, Col, Button } from 'antd';

// styled-components
import {
    VerifyCodeLayout
} from './style';

class BodyAccount extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmDirty: false
        };
    }

    static propsTypes = {
        username: PropTypes.string.isRequired,
        form: PropTypes.object.isRequired
    };

    // 确认新密码(Input获取焦点后, 开启'新密码'和'确认新密码'校验)
    handleConfirmBlur = (e) => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
        // !!value: 将value类型从string>>>boolean
    };

    // 确认新密码(校验两次密码输入是否一致)
    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('new_password')) {
            callback('您输入的两个密码不一致！');
        } else {
            // 校验成功
            callback();
        }
    };

    // 新密码
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            // 强制校验'新密码'和'确认新密码'
            form.validateFields(['confirm_new_password'], { force: true });
        }
        callback();
    }

    /**
     * confirmDirty >>> false >>> 确认密码新密码校验
     * confirmDirty >>> true >>> 新密码校验
    */

    updateVCode = () => {
        // 请求验证码
        this.props.fetchVerifyCode();
    };

    componentDidMount() {
        // 获取验证码
        this.updateVCode();
    }

    render() {
        const username = this.props.username;
        const verifyCodeImg = this.props.verifyCodeImg;
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
                            getFieldDecorator('user', {
                                rules: [{ required: true, message: 'username is required' }],
                                initialValue: username
                            })(<Input placeholder='please input username' size='large' disabled />)
                        }
                    </Form.Item>

                    <Form.Item label='旧密码' hasFeedback>
                        {
                            getFieldDecorator('old_password', {
                                rules: [{ required: true, message: 'old_password is required' }]
                            })(<Input.Password placeholder='please input your old_password' size='large' />)
                        }
                    </Form.Item>

                    <Form.Item label='新密码' hasFeedback>
                        {
                            getFieldDecorator('new_password', {
                                rules: [
                                    { required: true, message: 'new_password is required' },
                                    { validator: this.validateToNextPassword }
                                ],
                            })(
                                <Input.Password placeholder='please input your new_password' size='large' />
                            )
                        }
                    </Form.Item>

                    <Form.Item label='确认密码' hasFeedback>
                        {
                            getFieldDecorator('confirm_new_password', {
                                rules: [
                                    { required: true, message: 'confirm_new_password is required' },
                                    { validator: this.compareToFirstPassword }
                                ],
                            })(
                                <Input.Password
                                    placeholder='please input your confirm_new_password'
                                    onBlur={this.handleConfirmBlur}
                                    size='large'
                                />
                            )
                        }
                    </Form.Item>

                    {/* 张勇建议先去掉, 等待后续版本. 原因: 密码能修改成功, 但请求没有response */}
                    {/* <Form.Item label='验证码' hasFeedback>
                        <Row gutter={8}>
                            <Col span={16}>
                                {
                                    getFieldDecorator('verifyCode', {
                                        rules: [{ required: true, message: 'verifyCode is required' }]
                                    })(<Input placeholder='please input captcha' size='large' />)
                                }
                            </Col>
                            <Col span={8}>
                                <VerifyCodeLayout>
                                    <img
                                        // src={require('../../images/cnValidateImage.png')}
                                        src={verifyCodeImg}
                                        alt=''
                                        onClick={this.updateVCode}
                                    />
                                </VerifyCodeLayout>
                            </Col>
                        </Row>
                    </Form.Item> */}

                </Form>
            </div>
        )
    }
}


const mapStateToProps = (state, props) => {
    return {
        verifyCodeImg: getVerifyCodeImg(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators(vcodeActions, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(BodyAccount);