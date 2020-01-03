import React, { Fragment } from 'react';
import { withRouter } from 'react-router-dom';

// 自定义组件
import BodyAccount from '../../component/bodyaccount/bodyaccount';
import BodyAbout from '../../component/bodyabout/bodyabout';
import BodySupport from '../../component/bodysupport/bodysupport';
import BodyNews from '../../component/bodynews/bodynews';
import BodySetting from '../../component/bodysetting/bodysetting';
import BodyLogout from '../../component/bodylogout/bodylogout';
import UserDropDownListFormModal from '../../component/userdropdownlistformmodal/userdropdownlistformmodal';

// antd
import { Form, Select, Popover, List, Typography, Modal, Button, Col } from 'antd';

// styled-components
import {
  GroupSelectLayout,
  MainGroupSelect,
  UserMenu,
  DropDownPopover,
} from './style.js';

// utils
import { getRouteParams } from '../../utils/utils';
import apiPrefix from '../../apiPrefix';

// iconfont
import IconFont from '../../iconFont/iconfont';

// css
import './style.css';

// lodash
import _ from 'lodash';

@withRouter
class GroupSelect extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showUserMenu: false,
      modalName: ''
    };
  }

  // 有Form表单, 在原组件上包装一层, 传入props
  WrappedBody = (props, WrappedComponent) => {
    return (
      <WrappedComponent {...props} />
    )
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
        body: (props) => this.WrappedBody(props, BodyAccount),
        resEvent: this.props.modifyPassword,
        width: 750,
        wrapClassName: 'customize-750',
        okText: 'OK',
        cancelText: '取消',
      },
      support: {
        title: '技术支持',
        body: BodySupport,
        width: 500,
        wrapClassName: 'customize-500',
        okText: 'OK',
        cancelText: '取消'
      },
      about: {
        title: '关于',
        body: BodyAbout,
        width: 500,
        wrapClassName: 'customize-500',
        cancelText: '搞定'
      },
      news: {
        title: '什么是新闻',
        body: BodyNews,
        width: 750,
        wrapClassName: 'customize-750',
        cancelText: '搞定'
      },
      setting: {
        title: '设置',
        body: BodySetting,
        resEvent: '',
        width: 750,
        wrapClassName: 'customize-750',
        okText: 'OK',
        cancelText: '取消'
      },
      logout: {
        title: '注销',
        body: BodyLogout,
        resEvent: this.props.logout,
        width: 500,
        wrapClassName: 'customize-500',
        okText: '注销',
        cancelText: '取消',
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

        <UserDropDownListFormModal
          ref={(modal) => this.userDropDownListFormInstance = modal}
          dropDownMenuListItem={dropDownMenuListItem}
          modalName={this.state.modalName}
          username={username}
        />
      </GroupSelectLayout>
    )
  }

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
    this.userDropDownListFormInstance.showModal();
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

export default GroupSelect;