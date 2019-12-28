import React, {Fragment} from 'react';
import {withRouter} from 'react-router-dom';

// antd
import {Form, Select, Popover, List, Typography, Modal, Button} from 'antd';

// styled-components
import {
  GroupSelectLayout,
  MainGroupSelect,
  UserMenu,
  DropDownMenu
} from './style.js';

// utils
import {getRouteParams} from '../../utils/utils';
import apiPrefix from '../../apiPrefix';

// iconfont
import IconFont from '../../iconFont/iconfont';

// css
import './style.css';

@withRouter
class GroupSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showUserMenu: false,
      showMenuModal: false,
      modalName: ''
    };

    this.dropDownMenuListItem = {
      account: {
        title: '账户',
        body: '',
        resEvent: '',
        width: 750,
      },
      support: {
        title: '技术支持',
        body: '',
        resEvent: '',
        width: 500,
      },
      about: {
        title: '关于',
        body: '',
        resEvent: '',
        width: 500,
      },
      news: {
        title: '什么是新闻',
        body: '',
        resEvent: '',
        width: 750,
      },
      setting: {
        title: '设置',
        body: '',
        resEvent: '',
        width: 750,
      },
      logout: {
        title: '注销',
        body: '',
        resEvent: '',
        width: 500,
      }
    };

    this.handleArrage = this.handleArrage.bind(this);
  }

  handleArrage = () => {
    console.log('[搞定]');
    this.setState((prevState) => ({
      showMenuModal: !prevState.showMenuModal
    }));
  };

  render() {
    const {nameList, user, location: {state}} = this.props;
    const nameListRaw = nameList.toJS();
    const userRaw = user.toJS();
    const {group} = state;
    const {username} = userRaw;
    // console.log('[GroupSelect]', nameListRaw);
    return (<GroupSelectLayout id='navbar-select-div'>

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
            (<Popover placement='bottom'
                      title={
                        <span>
                      {username}
                      </span>
                      }
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
          visible={this.state.showMenuModal}
          modalName={this.state.modalName}
          dropDownMenuListItem={this.dropDownMenuListItem}
          onOk={() => this.setState({showMenuModal: false})}
          onCancel={() => this.setState({showMenuModal: false})}
        />
      </GroupSelectLayout>
    )
  }

  // 切换组
  handleChange = (value, namelist) => {
    // console.log('[更换组]');
    const rootUrl = apiPrefix.rootUrl();
    this.props.history.push(getRouteParams(namelist, value)(rootUrl));
  };

  // 切换用户信息
  toggleUserMenu = () => {
    // console.log('[切换用户信息]');
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
                                 {marginRight: 10}
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
    // console.log('List.Item被点击了', name);
    this.setState((prevState) => ({
      showMenuModal: !prevState.showMenuModal,
      modalName: name
    }));
  };
}

// 下拉菜单Form
const GroupSelectForm = Form.create({name: 'group_select_form'})(
  class extends React.Component {
    render() {
      const {defaultGroup, grouplist, onChange} = this.props;
      // console.log('[defaultValue]', grouplist);
      return (
        <div style={{width: '100%'}}>
          <Select size='large'
                  onChange={onChange}
                  notFoundContent='No Group'
                  value={defaultGroup || 'Please add a group'}
                  style={{width: '100%'}}
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
const UserDropDownListForm = Form.create({name: 'user_dropdown_list_form'})(
  class extends React.Component {
    render() {
      // console.log('[modalName]', this.props.modalName);
      const {modalName, dropDownMenuListItem} = this.props;
      const currentModal = dropDownMenuListItem[modalName] || {};
      // console.log('[currentModal]', currentModal);
      return (
        <Modal
          visible={this.props.visible}
          title={currentModal.title}
          width={currentModal.width}
          mast={true}
          // onOk={this.props.onOk}
          // onCancel={this.props.onCancel}
          // footer={
          //   [
          //     <Button key='cancel'>取消12</Button>,
          //     <Button key='confirm'>确定34</Button>
          //   ]
          // }
          // footer={this.getFooterBtn(modalName)}
        >

        </Modal>
      )
    }

    getFooterBtn = (name) => {
      console.log('[name]', name);

      return [
        <Button key='cancel'>取消12</Button>,
        <Button key='confirm'>确定34</Button>
      ]
    };
  }
);

export default GroupSelect;

/**
 *  分为3个部分:
 *  1.标题
 *  2.body内容
 *  3.响应事件
 *
 */