import React from 'react';
import {withRouter} from 'react-router-dom';

// antd
import {Form, Select} from 'antd';

// styled-components
import {
  GroupSelectLayout,
  MainGroupSelect,
  UserMenu,
} from './style.js';

@withRouter
class GroupSelect extends React.Component {
  render() {
    // console.log('[GroupSelect]', this.props.id, this.props.grouplist);
    const {id, grouplist, userRaw} = this.props;
    const group = grouplist.reduce((ret, item) => {
      if (item.group_id === id) {
        ret['group_id'] = item.group_id;
        ret['group'] = item.group;
      }
      return ret;
    }, {});
    const {username} = userRaw;
    return (
      <GroupSelectLayout id='navbar-select-div'>

        <span>组</span>

        <MainGroupSelect>
          <GroupSelectForm
            defaultGroup={group}
            grouplist={grouplist}
            onChange={this.handleChange}
          />
        </MainGroupSelect>

        {
          username ? <UserMenu>{username.substring(0, 1).toUpperCase()}</UserMenu> : null
        }

      </GroupSelectLayout>
    )
  }

  handleChange = (value) => {
    this.props.history.push(`/homev2/${value}`);
  };
}

// 下拉菜单Form
const GroupSelectForm = Form.create({name: 'group_select_form'})(
  class extends React.Component {
    render() {
      const {defaultGroup, grouplist, onChange} = this.props;
      // console.log('[defaultValue]', defaultGroup.group);
      return (
        <div style={{width: '100%'}}>
          <Select size='large' onChange={onChange} notFoundContent='No Group'
                  value={defaultGroup.group || 'Please add a group'}
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

/**
 * 用户组展示
 * 1.展示默认值 --- 完成
 * 2.能够切换 --- 完成
 * 3.切换能跳转路由 --- 完成
 * */