import React from 'react';
import {withRouter} from 'react-router-dom';
import {
  NavbarSelect,
  SelectLayout,
  AvatarLayout,
  RegisterContentLayout,
  RegisterArea,
  Title,
  AddGroupLayout,
  SpinWrapper
} from './style';
import {Select, Avatar, Icon, Form, Modal, Input, Divider, Empty, Spin, Button} from 'antd';
import './style.css';
import isEmpty from 'lodash/isEmpty';
import Immutable from 'immutable';
import browserCookies from 'browser-cookies';

@withRouter
class UserInfo extends React.Component {
  state = {
    visible: false,
    selectText: 'dcj123'
  };

  render() {
    const {username} = this.props.user;
    const {groupNameList} = this.props;
    // console.log('[UserInfo username]', username);
    return (
      <NavbarSelect>
        <span>组</span>
        <SelectLayout>
          <GroupSelectForm
            groupNameList={this.props.groupNameList}
            onChange={this.handleChange}
            defaultSelectedItem={this.props.defaultSelectedItem}
            selectText={this.state.selectText}
          />
        </SelectLayout>
        <AvatarLayout>
          {/*登录后, 一定会有username*/}
          {
            username
              ? (
                <Avatar size={40}
                        style={{border: '2px solid #fff', background: '#212a35'}}
                >
                  {username.substring(0, 1).toUpperCase()}
                </Avatar>
              )
              : null
          }
        </AvatarLayout>
        {/*添加组按钮*/}
        <AddGroupLayout>
          <Avatar
            size={40}
            style={{border: '2px solid #fff', background: '#212a35', cursor: 'pointer'}}
            onClick={this.showModal}
          >
            <Icon type="usergroup-add"/>
          </Avatar>
        </AddGroupLayout>
        {/*删除组*/}
        {
          groupNameList.length
            ? (
              <AddGroupLayout>
                <Avatar
                  size={40}
                  style={{border: '2px solid #fff', background: '#212a35', cursor: 'pointer'}}
                  onClick={this.deleteGroup}
                >
                  <Icon type="usergroup-delete"/>
                </Avatar>
              </AddGroupLayout>
            )
            : null
        }
        {/*刷新组*/}
        {
          groupNameList.length
            ? (
              <AddGroupLayout>
                <Avatar
                  size={40}
                  style={{border: '2px solid #fff', background: '#212a35', cursor: 'pointer'}}
                  onClick={this.refreshGroup}
                >
                  <Icon type="sync"/>
                </Avatar>
              </AddGroupLayout>
            )
            : null
        }

        {/*删除所有组, 测试用*/}
        {/*{*/}
        {/*groupNameList.length*/}
        {/*? (*/}
        {/*<AddGroupLayout>*/}
        {/*<Avatar*/}
        {/*size={40}*/}
        {/*style={{border: '2px solid #fff', background: '#212a35', cursor: 'pointer'}}*/}
        {/*onClick={this.deleteAllGroup}*/}
        {/*>*/}
        {/*<Icon type="delete"/>*/}
        {/*</Avatar>*/}
        {/*</AddGroupLayout>*/}
        {/*)*/}
        {/*: null*/}
        {/*}*/}

        {/*登出按钮*/}
        <AddGroupLayout>
          <Avatar
            size={40}
            style={{border: '2px solid #fff', background: '#212a35', cursor: 'pointer'}}
            onClick={this.logout}
          >
            <Icon type="logout"/>
          </Avatar>
        </AddGroupLayout>
        {/*创建组Form*/}
        <GroupCreateForm
          wrappedComponentRef={this.saveCreateFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
      </NavbarSelect>
    )
  }

  handleChange = (value) => {
    // console.log(`selected ${value}`);
    this.props.onSelectedItem(value);
  };

  // 显示窗口
  showModal = () => {
    this.setState({visible: true});
  };

  // 登出
  logout = () => {
    const {confirm} = Modal;
    confirm({
      title: '退出登录',
      content: '确定退出登录???',
      onOk: () => {
        // console.log('确认');
        // 1.清空cookie
        browserCookies.erase('login.user');
        // 2.调用auth.redux.logout方法
        this.props.onLogout();
        // 3.清空localStorage
        this.props.removeLocalStorage('selectedItem');
        this.props.removeLocalStorage('selectedMenuItem');
      },
      onCancel: () => {
        console.log('取消');
      }
    });
  };

  // 刷新组(groupNameList为空时, 不显示)
  refreshGroup = () => {
    // const {group, group_id} = this.getCurrentGroupData();
    // if (!isEmpty(group) && !isEmpty(group_id)) {
    //   this.props.onRefreshGroup({group, group_id});
    // }
    window.location.href = window.location.href;
  };

  // 删除组(groupNameList为空时, 不显示)
  deleteGroup = () => {
    const {group, group_id} = this.getCurrentGroupData();
    const {confirm} = Modal;
    if (!isEmpty(group) && !isEmpty(group_id)) { // 新用户的group和group_id为空
      confirm({
        title: '删除组',
        content: `确定删除${group}组吗???`,
        onOk: () => {
          // 调用删除组api
          this.props.onDeleteGroup({group, group_id});
          // 清空localStorage
          this.props.removeLocalStorage('selectedItem');
          this.props.removeLocalStorage('selectedMenuItem');
          // 刷新页面
          // window.location.href = window.location.href;
        },
        onCancel: () => {
          console.log('取消');
        }
      });
    } else {
      // 删除的用户不存在
      console.log('[删除的用户不存在]');
    }
  };

  // 删除所有组
  // deleteAllGroup = () => {
  //   this.props.onDeleteAllGroup();
  // };

  getCurrentGroupData = () => {
    const {groupNameList, selectedItem} = this.props;
    // console.log('[删除的selectedItem]', selectedItem);
    const index = groupNameList.findIndex((v) => v.group_id === selectedItem);
    if (index > -1) {
      const item = groupNameList[index];
      const group = item.group;
      const group_id = item.group_id;
      return {
        group,
        group_id
      }
    }
    return {};
  };

  // 关闭窗口, 传递给GroupCreateForm组件
  handleCancel = () => {
    this.setState({visible: false});
  };

  handleCreate = () => {
    // 数据校验, 并调用父组件的addGroup方法
    const {form} = this.createFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      // console.log('[Receive values of form]', values);
      form.resetFields(); // 清空表单
      this.setState({visible: false});// 隐藏窗口
      let requestData = {
        group: values['group'],
        description: values['group-description'],
        encodeDevices: [
          {
            domain: values['encode-domain'],
            port: values['encode-port'],
            auth: values['encode-auth'],
            recvServicePort: values['encode-recvServicePort']
          }
        ],
        recvStreamServices: [
          {
            domain: values['wowza-domain'],
            port: values['wowza-port']
          }
        ]
      };
      this.props.onCreateNewGroup(requestData); // home.js传递过来的
      // 清除localStorage
      this.props.removeLocalStorage('selectedItem');
      this.props.removeLocalStorage('selectedMenuItem');
      // 刷新页面
      // window.location.href = window.location.href;
    });
  };

  saveCreateFormRef = (formRef) => { // 表示GroupCreateForm的实例
    this.createFormRef = formRef;
  };
}

// 下拉菜单Form
const GroupSelectForm = Form.create({name: 'group_select_form'})(
  class extends React.Component {
    render() {
      const {getFieldDecorator, setFieldsValue} = this.props.form;
      const {groupNameList, onChange, defaultSelectedItem, selectText} = this.props;

      return (
        <div style={{width: '100%'}}>
          <Select size='large' onChange={onChange} notFoundContent='No Group'
                  value={defaultSelectedItem || 'Please add a group'}
                  style={{width: '100%'}}>
            {
              groupNameList.map((item) => (
                <Select.Option
                  size='large'
                  value={item.group_id}
                  key={item.group_id}
                >
                  {item.group}
                </Select.Option>
              ))
            }
          </Select>
        </div>
      )
    }
  }
);

class ModalTitle extends React.Component {
  render() {
    return (
      <div style={{background: ''}}>添加组信息</div>
    )
  }
}

// 创建组Form
const GroupCreateForm = Form.create({name: 'group_create_form'})(
  class extends React.Component {
    render() {
      const {visible, onCancel, onCreate, form} = this.props;
      const {getFieldDecorator} = form;
      const formItemLayout = {
        labelCol: {
          xs: {span: 24},
          sm: {span: 6, offset: 12},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 8},
        },
      };
      return (
        <Modal
          visible={visible}
          title={<ModalTitle/>}
          okText='添加'
          cancelText='取消'
          onOk={onCreate}
          onCancel={onCancel}
          width={750}
          mast={false}
          className='add-group-modal-dcj'
          style={{color: 'red'}}
        >
          <Spin spinning={false} size='large' tip='Loading...' style={{maxHeight: '100%'}}>
            <RegisterContentLayout>
              <RegisterArea>
                <Form layout='vertical' {...formItemLayout}>
                  <Title>组信息</Title>
                  <Form.Item label='组名' style={{lineHeight: '40px', textAlign: 'center !important'}}>
                    {
                      getFieldDecorator('group', {
                        rules: [{required: true, message: 'group is required'}]
                      })(<Input placeholder='group' size='large'/>)
                    }
                  </Form.Item>
                  <Form.Item label='描述' style={{lineHeight: '40px', textAlign: 'center !important'}}>
                    {
                      getFieldDecorator('group-description', {
                        rules: [{required: true, message: 'description is required'}]
                      })(<Input placeholder='description' size='large'/>)
                    }
                  </Form.Item>
                  <Divider style={{background: '#212a35'}}/>

                  <Title>编码器设置</Title>
                  <Form.Item label='编码器服务地址'>
                    {
                      getFieldDecorator('encode-domain', {
                        rules: [{required: true, message: 'domain is required'}],
                        initialValue: '211.161.196.204' // 测试添加组数据
                      })(<Input placeholder='domain' size='large'/>)
                    }
                  </Form.Item>
                  <Form.Item label='编码器服务端口'>
                    {
                      getFieldDecorator('encode-port', {
                        rules: [{required: true, message: 'port is required'}],
                        initialValue: 8000 // 测试数据
                      })(<Input placeholder='port' size='large'/>)
                    }
                  </Form.Item>
                  <Form.Item label='认证auth'>
                    {
                      getFieldDecorator('encode-auth', {
                        rules: [{required: true, message: 'auth is required'}],
                        initialValue: 'FFj6hRxD7Xe22di5hTKQAKxtCAFSsSbf', // 测试数据
                      })(<Input placeholder='auth' size='large'/>)
                    }
                  </Form.Item>
                  <Form.Item label='接收wowza端的端口'>
                    {
                      getFieldDecorator('encode-recvServicePort', {
                        rules: [{required: true, message: 'recvServicePort is required'}],
                        initialValue: 12000 // 测试数据
                      })(<Input placeholder='recvServicePort' size='large'/>)
                    }
                  </Form.Item>
                  <Divider style={{background: '#212a35'}}/>

                  <Title>wowza设置</Title>
                  <Form.Item label='接收端wowza地址'>
                    {
                      getFieldDecorator('wowza-domain', {
                        rules: [{required: true, message: 'domain is required'}],
                        initialValue: '127.0.0.1' // 测试数据
                      })(<Input placeholder='domain' size='large'/>)
                    }
                  </Form.Item>
                  <Form.Item label='接收端wowza端口'>
                    {
                      getFieldDecorator('wowza-port', {
                        rules: [{required: true, message: 'port is required'}],
                        initialValue: 8087// 测试数据
                      })(<Input placeholder='port' size='large'/>)
                    }
                  </Form.Item>
                </Form>
              </RegisterArea>
            </RegisterContentLayout>
          </Spin>
        </Modal>
      )
    }
  }
);

export default UserInfo;

/**
 * 设计
 * 1.在创建组Group的时候, 必须输入1台encode编码器设备 和 1台wowza接收服务器设备
 * 2.后续如果设计 1对多(1台wowza对应多个encode编码器设备), 新encode编码器设备, 在对应的组中添加
 * */

/*
* 创建组: 完成后, 清空localStorage
* 删除组: 完成后, 清空localStorage, 并刷新页面
* 需要一个操作组的标志位: loading或添加组, 删除组后的其他操作
* */
