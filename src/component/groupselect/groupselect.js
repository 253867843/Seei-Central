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

// utils
import {getRouteParams} from '../../utils/utils';
import apiPrefix from '../../apiPrefix';

@withRouter
class GroupSelect extends React.Component {
  render() {
    // console.log('[GroupSelect]', this.props);
    const {nameList, user, location: {state}} = this.props;
    const nameListRaw = nameList.toJS();
    const userRaw = user.toJS();
    const {group} = state;
    const {username} = userRaw;
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
          username ? <UserMenu>{username.substring(0, 1).toUpperCase()}</UserMenu> : null
        }

      </GroupSelectLayout>
    )
  }

  handleChange = (value, namelist) => {
    console.log('[更换组]');
    const rootUrl = apiPrefix.rootUrl();
    this.props.history.push(getRouteParams(rootUrl, namelist, value));
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