import React from 'react';
import {withRouter} from 'react-router-dom';

// antd
import {Form, Select, Popover, List, Typography} from 'antd';

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
  state = {
    showUserMenu: true
  };

  render() {
    const {nameList, user, location: {state}} = this.props;
    const nameListRaw = nameList.toJS();
    const userRaw = user.toJS();
    const {group} = state;
    const {username} = userRaw;
    // console.log('[GroupSelect]', nameListRaw);
    return (
      <GroupSelectLayout id='navbar-select-div'>

        <span>组</span>

        <MainGroupSelect>
          <GroupSelectForm
            defaultGroup={group}
            grouplist={nameListRaw}
            onChange={(v) => this.handleChange(v, nameListRaw)}
          />
        </MainGroupSelect>

        {
          username
            ? (
              <Popover placement='bottom'
                       title={
                         <span>{username}</span>
                       }
                       content={this.getDropDownMenu()}
                       trigger='click'
                       overlayClassName='customize-popover'
              >
                <UserMenu onClick={this.toggleUserMenu}>
                  {username.substring(0, 1).toUpperCase()}
                </UserMenu>
              </Popover>
            )
            : null
        }

        {/*<DropDownMenu>*/}
        {/*  123456*/}
        {/*</DropDownMenu>*/}


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

  getDropDownMenu = () => {
    const data = [
      {
        title: '账户',
        type: 'iconuser-copy'
      },
      {
        title: '技术支持',
        type: 'iconsupport-copy'
      },
      {
        title: '关于',
        type: 'iconabout-copy'
      },
      {
        title: '什么是新闻',
        type: 'iconNews-copy'
      },
      {
        title: '设置',
        type: 'iconsetting-copy'
      },
      {
        title: '注销',
        type: 'iconLogout-copy'
      }
    ];
    return (
      <List
        itemLayout='horizontal'
        dataSource={data}
        size='small'
        renderItem={(item) => (
          <List.Item>
            <Typography.Text><IconFont type={item.type} style={{marginRight: 10}}/></Typography.Text>
            <span onClick={() => console.log('List.Item被点击了')}>{item.title}</span>
          </List.Item>
        )}
      >

      </List>
    )
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
          <Select size='large' onChange={onChange} notFoundContent='No Group'
                  value={defaultGroup || 'Please add a group'}
                  style={{width: '100%'}}>
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