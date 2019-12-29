import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

// antd
import { Form, Select, Popover, List, Typography, Modal, Button, Input, Tree, Icon } from 'antd';

// styled-components
import {
  GroupSelectLayout,
  MainGroupSelect,
  UserMenu,
  AboutModal,
  AboutModalPic,
  AboutModalText,
  FlexJCenter,
  WhiteLineLeft,
  WhiteLineRight,
  Version,
  NewsModal,
  DropDownPopover,
} from './style.js';

// utils
import { getRouteParams } from '../../utils/utils';
import apiPrefix from '../../apiPrefix';
import versionTree from '../../utils/version';

// iconfont
import IconFont from '../../iconFont/iconfont';

// css
import './style.css';

// lodash
import _ from 'lodash';
import version from '../../utils/version';

const bodyAccount = (props) => {
  console.log('[bodyAccount props]', props);
  const username = props.location.state.group;
  const { getFieldDecorator } = props.form;
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

const bodyAbout = (props) => {
  return (
    <AboutModal>

      <AboutModalPic>

        <FlexJCenter>
          <img src={require('../../images/logo.png')} alt='' />
        </FlexJCenter>

      </AboutModalPic>

      <AboutModalText>

        <WhiteLineLeft></WhiteLineLeft>
        <Version>版本 0.0.2</Version>
        <WhiteLineRight></WhiteLineRight>

      </AboutModalText>

    </AboutModal>
  )
}

const bodySupport = (props) => {
  return (
    <div>
      技术支持
    </div>
  )
}

const bodyNews = (props) => {
  const { TreeNode } = Tree;
  const treeData = versionTree.getVersionTreeData();
  const renderTreeNodes = (treeData) => (
    treeData.map((v) => {
      if (v.children) {
        return (
          <TreeNode title={v.title} key={v.key} dataRef={v} icon={<IconFont type={v.icon} />}>
            {renderTreeNodes(v.children)}
          </TreeNode>
        )
      }
      return <TreeNode title={v.title} key={v.key} icon={<IconFont type={v.icon} />} />
    })
  );

  const { key } = _.first(treeData);
  return (
    <NewsModal>
      <Tree
        showIcon
        defaultExpandedKeys={[key]}
      >
        {renderTreeNodes(treeData)}
      </Tree>
    </NewsModal>
  )
}

const bodySetting = (props) => {
  return (
    <div>
      设置
    </div>
  )
}

const bodyLogout = (props) => {
  return (
    <span>确定退出登录吗?</span>
  )
}

@withRouter
class GroupSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showUserMenu: false,
      showMenuModal: false,
      modalName: 'account'
    };
  }

  render() {
    const { nameList, user, location: { state } } = this.props;
    const nameListRaw = nameList.toJS();
    const userRaw = user.toJS();
    const { group } = state;
    const { username } = userRaw;

    const dropDownMenuListItem = {
      account: {
        title: '账户',
        body: bodyAccount,
        resEvent: () => console.log('修改密码'),
        width: 750,
        wrapClassName: 'customize-750',
        okText: 'OK',
        cancelText: '取消'
      },
      support: {
        title: '技术支持',
        body: bodySupport,
        width: 500,
        wrapClassName: 'customize-500',
        okText: 'OK',
        cancelText: '取消'
      },
      about: {
        title: '关于',
        body: bodyAbout,
        width: 500,
        wrapClassName: 'customize-500',
        cancelText: '搞定'
      },
      news: {
        title: '什么是新闻',
        body: bodyNews,
        width: 750,
        wrapClassName: 'customize-750',
        cancelText: '搞定'
      },
      setting: {
        title: '设置',
        body: bodySetting,
        resEvent: '',
        width: 750,
        wrapClassName: 'customize-750',
        okText: 'OK',
        cancelText: '取消'
      },
      logout: {
        title: '注销',
        body: bodyLogout,
        resEvent: () => console.log('退出登录'),
        width: 500,
        wrapClassName: 'customize-500',
        okText: '注销',
        cancelText: '取消'
      }
    };

    return (
      <GroupSelectLayout id='navbar-select-div'>

        <span>组</span>

        <MainGroupSelect>
          <GroupSelectForm defaultGroup={group}
            grouplist={nameListRaw}
            onChange={
              (v) => this.handleChange(v, nameListRaw)
            }
          />
        </MainGroupSelect>

        {
          username ?
            (
              <Popover
                placement='bottom'
                title={
                  <span>
                    {username}
                  </span>
                }
                arrowPointAtCenter
                content={this.getDropDownMenu()}
                trigger='click'
                overlayClassName='customize-popover'>
                <UserMenu onClick={this.toggleUserMenu}> {username.substring(0, 1).toUpperCase()}
                </UserMenu>
              </Popover>
            ) : null
        }

        {/*用户信息弹窗*/}
        <UserDropDownListForm
          wrappedComponentRef={this.saveCreateFormRef}
          visible={this.state.showMenuModal}
          modalName={this.state.modalName}
          dropDownMenuListItem={dropDownMenuListItem}
          onOk={() => this.setState({ showMenuModal: false })}
          onCreate={this.handleCreate}
          onCancel={() => this.setState({ showMenuModal: false })}
          {...this.props}
        />
      </GroupSelectLayout>
    )
  }

  handleCreate = () => {
    console.log('[handleCreate]');
    const { form } = this.createFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('[values 用户信息弹窗]', values);
    });
  };

  saveCreateFormRef = (formRef) => {
    this.createFormRef = formRef;
  };

  // 切换组
  handleChange = (value, namelist) => {
    const rootUrl = apiPrefix.rootUrl();
    this.props.history.push(getRouteParams(namelist, value)(rootUrl));
  };

  // 切换用户信息
  toggleUserMenu = () => {
    this.setState((prevState) => ({
      showUserMenu: !prevState.showUserMenu
    }));
  };

  // 用户信息List展示
  getDropDownMenu = () => {
    const data = [{
      title: '账户',
      type: 'iconuser-copy',
      name: 'account'
    },
    {
      title: '技术支持',
      type: 'iconsupport-copy',
      name: 'support'
    },
    {
      title: '关于',
      type: 'iconabout-copy',
      name: 'about'
    },
    {
      title: '什么是新闻',
      type: 'iconNews-copy',
      name: 'news'
    },
    {
      title: '设置',
      type: 'iconsetting-copy',
      name: 'setting'
    },
    {
      title: '注销',
      type: 'iconLogout-copy',
      name: 'logout'
    }
    ];
    return (
      <List itemLayout='horizontal'
        dataSource={data}
        size='small'
        split={false}
        renderItem={
          (item) => (
            <List.Item>
              <Typography.Text>
                < IconFont type={item.type}
                  style={
                    { marginRight: 10 }
                  }
                />
              </Typography.Text>
              <span
                onClick={() => this.handleListItemClick(item.name)}
              >
                {item.title}
              </span>
            </List.Item>
          )
        }
      />
    )
  };

  handleListItemClick = (name) => {
    this.setState((prevState) => ({
      showMenuModal: !prevState.showMenuModal,
      modalName: name
    }));
  };
}

// 下拉菜单Form
const GroupSelectForm = Form.create({ name: 'group_select_form' })(
  class extends React.Component {
    render() {
      const { defaultGroup, grouplist, onChange } = this.props;
      return (
        <div style={{ width: '100%' }}>
          <Select size='large'
            onChange={onChange}
            notFoundContent='No Group'
            value={defaultGroup || 'Please add a group'}
            style={{ width: '100%' }}
          >
            {
              grouplist.map((item) => (
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

// 用户信息List点击弹窗
const UserDropDownListForm = Form.create({ name: 'user_dropdown_list_form' })(
  class extends React.Component {
    render() {
      const { modalName, dropDownMenuListItem, onCancel, onCreate } = this.props;
      const currentModal = dropDownMenuListItem[modalName] || {};
      const hasEvent = _.has(currentModal, 'resEvent');
      console.log('[UserDropDownListForm]', this.props);
      let footer = [
        <Button key='cancel' onClick={onCancel} type={hasEvent ? '' : 'primary'}> {currentModal.cancelText}</ Button>
      ];
      if (hasEvent) {
        footer.push(
          <Button key='execEvent' type='primary' onClick={onCreate}>{currentModal.okText}</Button>
        );
      }

      return (
        <Modal
          wrapClassName={currentModal.wrapClassName}
          visible={this.props.visible}
          title={currentModal.title}
          width={currentModal.width}
          mast={true}
          onCancel={onCancel}
          footer={footer}
          centered={true}
        >
          {currentModal.body(this.props)}
        </Modal>
      )
    }
  }
);

export default GroupSelect;

/**
 *  分为3个部分:
 *  1.标题
 *  2.body内容
 *  3.响应事件
 */
