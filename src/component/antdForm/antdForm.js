import React from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import {Form, Input, Icon, Button, Checkbox} from 'antd';
import './style.css';
import DynamicContext from './dynamicApp/dynamicApp';
import NestingApp from './nestingApp/nestingApp';
import MultipleConsumerApp from './multipleConsumerApp/multipleConsumerApp';

class AntdForm extends React.Component {
  render() {
    const {match} = this.props;
    return (
      <div style={{margin: '50px 0 0 50px'}}>
        <ul>
          <li>
            <Link to={`${match.path}/form1`}>内联登录框</Link>
          </li>
          <li>
            <Link to={`${match.path}/form2`}>登录框</Link>
          </li>
          <li>
            <Link to={`${match.path}/form3`}>注册新用户</Link>
          </li>
          <li>
            <Link to={`${match.path}/form4`}>自定义控件</Link>
          </li>
          <li>
            <Link to={`${match.path}/form5`}>React-Context</Link>
          </li>
          <li>
            <Link to={`${match.path}/form6`}>在嵌套组件中更新Context</Link>
          </li>
          <li>
            <Link to={`${match.path}/form7`}>消费多个Consumer</Link>
          </li>
        </ul>
        <Switch>
          <Route path={`${match.path}/form1`} component={WrappedHorizontalLoginForm}/>
          <Route path={`${match.path}/form2`} component={WrappedNormalLoginForm}/>
          <Route path={`${match.path}/form3`} component={WrappedRegistrationForm}/>
          <Route path={`${match.path}/form4`} component={DeviceEdit}/>
          <Route path={`${match.path}/form5`} component={DynamicContext}/>
          <Route path={`${match.path}/form6`} component={NestingApp}/>
          <Route path={`${match.path}/form7`} component={MultipleConsumerApp}/>
        </Switch>
      </div>
    )
  }
}

// 错误信息采集
const hasError = (fieldsError) => {
  // console.log('[hasError]', fieldsError);
  /*
  * {
  *   username: ['please input your username'],
  *   password: ['please input your password'],
  * }
  * */
  return Object.keys(fieldsError).some(field => fieldsError[field]);
};

class HorizontalLoginForm extends React.Component {

  render() {
    const {getFieldDecorator, getFieldsError, getFieldError, isFieldTouched} = this.props.form;
    const Item = Form.Item;

    const usernameError = isFieldTouched('username') && getFieldError('username');
    const passwordError = isFieldTouched('password') && getFieldError('password');
    return (
      <Form
        layout='inline'
        onSubmit={this.handleSubmit}
      >
        {/*用户名*/}
        <Item validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
          {
            getFieldDecorator('username', {
              rules: [{required: true, message: 'please input your username'}]
            })(<Input
              prefix={<Icon type='user' style={{color: 'rgba(0,0,0,.25)'}}/>}
              placehoder='Username'
            />)
          }
        </Item>
        {/*密码*/}
        <Item validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
          {
            getFieldDecorator('password', {
              rules: [{required: true, message: 'please input your password'}]
            })(<Input
              prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}}/>}
              placeholder='Password'
              type='password'
            />)
          }
        </Item>

        <Item>
          <Button type='primary' htmlType='submit' disabled={hasError(getFieldsError())}>Log in</Button>
        </Item>
      </Form>
    )
  }

  componentDidMount() {
    // 在一开始禁用登录按钮
    this.props.form.validateFields();
  }

  handleSubmit = (e) => {
    console.log('[登录]');
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('[Received values of form]', values);
      }
    });
  };


}

/**
 * 1.只有<Button ...htmlType='submit'/>添加了属性 htmlType='submit', 点击才会触发this.handleSubmit()
 * 2.当<Form layout='inline' .../>: 其中的Item会水平显示
 * 3.Button.disabled: 不可点击, 根据一个函数hasErrors(form.getFieldsError());
 *  查询所有错误 >>> 没有错误 >>> 返回true
 *            >>> 只要有一个错误 >>> 返回false >>> [].some(...);
 * 4.Form.Item的help属性: 提示信息(一般用来显示错误信息)
 * 5.isFieldTouched('username') + componentDidMount(){this.props.form.validateFields()} 一起使用
 * 6.isFieldTouched('username')/isFieldTouched('password'): 用来监听用户是否有过输入
 * */

const WrappedHorizontalLoginForm = Form.create({name: 'horizontal_login'})(HorizontalLoginForm);

class NormalLoginForm extends React.Component {
  render() {
    const {Item} = Form;
    const {getFieldDecorator} = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        {/*用户名*/}
        <Item>
          {
            getFieldDecorator('username', {
              rules: [{required: true, message: 'please input your username'}]
            })(
              <Input
                prefix={<Icon type='user' style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder='Username'
              />
            )
          }
        </Item>
        {/*密码*/}
        <Item>
          {
            getFieldDecorator('password', {
              rules: [{required: true, message: 'please input your password'}]
            })(
              <Input
                prefix={<Icon type='lock' style={{color: 'rgba(0,0,0,.25)'}}/>}
                placeholder='PassWord'
                type='password'
              />
            )
          }
        </Item>
        {/**/}
        <Item>
          {
            getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true
            })(
              <Checkbox>Remember me</Checkbox>
            )
          }
          {/*忘记密码*/}
          <a href='#' className='login-form-forgot'>Forget password</a>
          {/*提交*/}
          <Button type='primary' htmlType='submit' className='login-form-button'>Log in</Button>
          Or <a href='#'>register now!</a>
        </Item>
      </Form>
    )
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('[Receive values of form]', values);
      }
    })
  };
}

const WrappedNormalLoginForm = Form.create({name: 'normal_login'})(NormalLoginForm);

/**
 * 1.Form.Item
 * 注意：一个 Form.Item 建议只放一个被 getFieldDecorator 装饰过的 child，
 * 当有多个被装饰过的 child 时，help required validateStatus 无法自动生成。
 *
 * 2.valuePropName: 属性名
 *   initialValue: 初始值
 *   {
 *     valuePropName: 'checked',
       initialValue: true
 *   }
 *   等同于
 *   {'checked': true}
 * */

class RegistrationForm extends React.Component {
  state = {
    confirmDirty: false
  };

  render() {
    const Item = Form.Item;
    const {getFieldDecorator} = this.props.form;
    const formItemLayout = {
      labelCol: { // 列
        xs: {span: 24},
        sm: {span: 8},
      },
      wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
      }
    };
    return (
      <Form onSubmit={this.handleSubmit} {...formItemLayout}>
        {/*邮件*/}
        <Item label='E-mail'>
          {
            getFieldDecorator('email', {
              rules: [
                {type: 'email', message: '无效email'},
                {required: true, message: '请输入email'}
              ]
            })(<Input/>)
          }
        </Item>
        {/*密码*/}
        <Item label='Password' hasFeedback>
          {
            getFieldDecorator('password', {
              rules: [
                {required: true, message: '请输入密码'},
                {validator: this.validateToNextPassword}
              ]
            })(<Input.Password/>)
          }
        </Item>
        {/*再次输入密码*/}
        <Item label='Confirm Password' hasFeedback>
          {
            getFieldDecorator('confirm', {
              rules: [
                {required: true, message: '请确认密码'},
                {validator: this.compareToFirstPassword}
              ]
            })(<Input.Password onBlur={this.handleConfirmBlur}/>)
          }
        </Item>
        {/*注册按钮*/}
        <Item>
          <Button type='primary' htmlType='submit'>Register</Button>
        </Item>
      </Form>
    )
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('注册');
    // 让不通过的菜单域滚动到可见的范围内
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('[Receive values of form]', values);
      }
    });
  };

  // 监听确认密码输入框
  handleConfirmBlur = (e) => {
    const {value} = e.target;
    console.log(!!value); // true >>> false
    console.log(this.state.confirmDirty); // false >>> true
    console.log(this.state.confirmDirty || !!value);
    // console.log('[handleConfirmBlur]', this.state.confirmDirty || !!value);
    this.setState({confirmDirty: this.state.confirmDirty || !!value});
  };

  // 密码校验 --- 自定义函数
  validateToNextPassword = (rule, value, callback) => {
    // 检查2次密码输入是否一致
    // console.log('[validateToNextPassword]', rule, value);
    const {form} = this.props;
    if (value && this.state.confirmDirty) {
      // this.state.confirmDirty >>> 保证'confirm'字段已经有值
      form.validateFields(['confirm'], {force: true}); // confirm字段强制校验
      /**
       * 每次在'password'字段中输入值时, 如果'confirm'字段存在时, 启动对'confirm'字段强制校验???什么意思
       * */
    }
    callback();
  };

  // 比较password字段值
  compareToFirstPassword = (rule, value, callback) => {
    // console.log('[compareToFirstPassword]', rule, value);
    const {form} = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  };
}

const WrappedRegistrationForm = Form.create({name: 'register'})(RegistrationForm);
/**
 * 1.labelCol, 同<Col>标签, 标签布局
 * 2.wrapperCol, 控件布局
 * 3.Item.label:
 * 4.rules: [{...},{...},...] --- 校验规则 email, 正则, validator
 * 5.validator还可以自定义校验函数validateToNextPassword(rule, value, callback){... callback()} --- callback()必须被调用.
 * 6.密码类型的输入框: <Input.Password/>
 * 7.hasFeedback --- 展示校验状态图标，建议只配合 Input 组件使用 --- bool --- 成功, 在输入框尾部有一个绿色的勾☑️/失败, 红色的大叉✖️
 * */

export default AntdForm;


/**
 * 对Antd的Form表单
 *
 * form.getFieldDecorator: 用于和表单进行双向绑定
 *
 * form.getFieldsError: 获取一组输入控件的 Error ，如不传入参数，则获取全部组件的 Error --- Function([names: string[]])
 *
 * form.getFieldError: 获取某个输入控件的 Error --- Function(name)
 *
 * form.isFieldTouched:  判断一个输入控件是否经历过 getFieldDecorator 的值收集时机 options.trigger --- (name: string) => boolean
 * 表示控件有值输入了 >>> true (有点像自己写的, 监听input控件第一次输入值)
 *
 * form.validateFields:  校验并获取一组输入域的值与 Error，若 fieldNames 参数为空，则校验全部组件
 *
 * form.validateFieldsAndScroll 相似，但校验完后，如果校验不通过的菜单域不在可见范围内，则自动滚动进可见范围
 *
 * form.getFieldValue  获取一个输入控件的值
 *
 * Item.validateStatus: 校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating'
 *
 * */

// 表单数据存储于上层控件
const CustomizedForm = Form.create({
  name: 'global_state',
  onFieldsChange(props, changedFields) {
    console.log('[onFieldsChange]', props); // props包括 Form表单的一些方法 | 父元素传递过来的onChange方法 | 修改之前的{username: {value: 'dcj123'}}
    console.log('[onFieldsChange]', changedFields); // 修改后的值{username: {value: 'dcj1231'}}
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    console.log('[mapPropsToFields]', props); // {onChange: f, username: {value: 'dcj123'}}
    console.log('[mapPropsToFields]', props.username); // {value: 'dcj123'}
    console.log('[mapPropsToFields]', props.username.value);// dcj123
    return {
      username: Form.createFormField({ // 返回的表单域数据必须使用Form.createFormField包装
        ...props.username,
        value: props.username.value
      })
    };
    // ...props.username === value: props.username.value
  },
  onValuesChange(_, values) {
    console.log('[onValuesChange]', values); // {username: 'dcj1231'} 这里没有value???
  }
})(props => {
  const {getFieldDecorator} = props.form;
  return (
    <Form layout='inline'>
      <Form.Item>
        {
          getFieldDecorator('username', {
            rules: [{required: true, message: 'Username is required'}]
          })(<Input/>)
        }
      </Form.Item>
    </Form>
  )
});

class DeviceEdit extends React.Component {
  static propTypes = {};

  state = {
    fields: {
      username: {
        value: 'dcj123'
      }
    }
  };

  render() {
    const {fields} = this.state;
    console.log('[DeviceEdit]', fields); // {username: {value: 'dcj123'}}
    return (
      <div>
        <CustomizedForm {...fields} onChange={this.handleFormChange}/>
      </div>
    )
  }

  handleFormChange = (changedFields) => {
    console.log('[handleFormChange]', changedFields); // 同changedFields的值
    this.setState(({fields}) => {
      console.log('[this.setState]', fields);
      return {
        fields: {...fields, ...changedFields}
      }
    });
  };
}

