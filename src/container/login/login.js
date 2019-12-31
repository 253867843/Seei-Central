import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {Form, Input, Icon, Checkbox, Button} from 'antd';
import {LoginWrapper, LoginContainer, LoginMain, Logo, Title} from './style';
import {actions as appActions, getError, getRedirectTo} from '../../redux/app.redux';
import {actions as authActions} from '../../redux/auth.redux';
import {actions as vcodeActions, getVerifyCodeImg, getVerifyCodeStatus} from '../../redux/vcode.redux';
import {actions as uiActions, isRememberAccount} from '../../redux/ui.redux';
import {removeLocalStorage, getLocalStorage} from '../../utils/utils';

class Login extends React.Component {
  state = {
    confirmDirty: false,
    height: window.innerHeight, // 浏览器高度
  };

  render() {
    const {verifyCodeImg, isRememberAccount, redirectTo} = this.props;
    return (
      <LoginMain>
        {
          (redirectTo && redirectTo !== '/login' && redirectTo !== '/')
            ? (<Redirect to={redirectTo}/>)
            : null
        }
        <LoginWrapper style={{height: this.state.height}}>
          <LoginContainer style={{marginTop: (this.state.height * 3 / 14)}}>
            <Logo>
              <img src={require('../../images/logo_220.png')} alt=""/>
            </Logo>
            <Title>
              登录
            </Title>
            <LoginInputForm
              wrappedComponentRef={this.saveFormRef}
              onSubmit={this.handleSubmit}
              onChange={this.handleChange}
              verifyCodeImg={verifyCodeImg}
              isRememberAccount={isRememberAccount}
              onUpdateVCode={this.updateVCode}
            />
          </LoginContainer>
        </LoginWrapper>
      </LoginMain>
    )
  }

  saveFormRef = (formRef) => {
    this.formRef = formRef;
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {form} = this.formRef.props;
    form.validateFields((err, values) => {
      if (!err) {
        // console.log('登录', values);
        this.props.login(values);
      }
    });
  };

  // checkbox状态改变
  handleChange = (e) => {
    e.target.checked
      ? this.props.openRememberAccount()
      : this.props.closeRememberAccount()
  };

  // 请求验证码
  updateVCode = () => {
    this.props.fetchVerifyCode();
  };

  componentDidMount() {
    // 获取验证码图片
    this.updateVCode();
    // 监听页面高度变化
    const _this = this;
    window.onresize = function () {
      if (window.innerHeight > 600) {
        _this.setState({height: window.innerHeight});
      }
    };
    // 清除localStorage
    removeLocalStorage('selectedItem');
    removeLocalStorage('selectedMenuItem');
  }

  // componentDidUpdate(prevProps, prevState, snapshot) {
  //   const verifyCodeStatus = this.props.verifyCodeStatus;
  //   if (verifyCodeStatus) {
  //     console.log('[获取验证码失败, 正在重新请求]');
  //     this.updateVCode();
  //   }
  // }
}

// 匿名登录输入框组件
const LoginInputForm = Form.create({name: 'login_input_form'})(
  class extends React.Component {
    render() {
      const {getFieldDecorator} = this.props.form;
      const {onSubmit, onChange, verifyCodeImg, isRememberAccount, onUpdateVCode} = this.props;
      return (
        <Form onSubmit={onSubmit}
              style={{width: '100%'}}
        >
          <Form.Item>
            {
              getFieldDecorator('user', {
                rules: [{required: true, message: 'Please input your username!'}]
              })(
                <Input
                  prefix={<Icon type='user' style={{color: 'rgba(0, 0, 0, .25)'}}/>}
                  placeholder='Username'
                  size='large'
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('password', {
                rules: [{required: true, message: 'Please input your password!'}]
              })(
                <Input.Password
                  prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}}/>}
                  placeholder='Password'
                  type='password'
                  size='large'
                />
              )
            }
          </Form.Item>
          <Form.Item>
            {
              getFieldDecorator('verifyCode', {
                rules: [{required: true, message: 'Please input verifyCode!'}]
              })(
                <div>
                  <Input
                    prefix={<Icon type="barcode" style={{color: 'rgba(0,0,0,.25)'}}/>}
                    placeholder='verifyCode'
                    size='large'
                    style={{width: 'calc(100% - 80px)'}}
                  />
                  <div style={{
                    display: 'inline-block',
                    width: 80,
                    height: 40,
                    verticalAlign: 'top',
                  }}>
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: '#fff'
                    }}>
                      <img
                        // src={require('../../images/cnValidateImage.png')}
                        src={verifyCodeImg}
                        style={{width: '100%', height: '100%', verticalAlign: 'top', cursor: 'pointer'}}
                        alt=""
                        onClick={onUpdateVCode}
                      />
                    </div>
                  </div>
                </div>
              )
            }
          </Form.Item>
          <Form.Item>
            <Checkbox checked={isRememberAccount} onChange={onChange}
                      style={{color: '#fff', fontWeight: '700'}}
            >
              记住我
            </Checkbox>
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' className="login-form-button" size='large'
                    block
                    disabled={!verifyCodeImg}>登录</Button>
          </Form.Item>
        </Form>
      )
    }
  }
);


const WrappedLoginForm = Form.create({name: 'login'})(Login);

const mapStateToProps = (state, props) => {
  return {
    verifyCodeImg: getVerifyCodeImg(state), // 验证码 图片
    // verifyCodeStatus: getVerifyCodeStatus(state),
    isRememberAccount: isRememberAccount(state), // 记住密码
    redirectTo: getRedirectTo(state), // 跳转
  };
};

const mapDispatchToProps = (dispatch) => { // 操作的方法
  return {
    ...bindActionCreators(authActions, dispatch),
    ...bindActionCreators(vcodeActions, dispatch),
    ...bindActionCreators(uiActions, dispatch),
    ...bindActionCreators(appActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WrappedLoginForm);