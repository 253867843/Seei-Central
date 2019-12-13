import Immutable from 'immutable';
import {getGroupIds, getGroupById} from './groups.redux';
import {getEncodeIdsByGroup, getEncodeById} from './encode.redux';
import {getWowzaIdsByGroup, getWowzaById} from './wowza.redux';
import {getWowzaStreamInfoByGroup, getWowzaInfoById} from './wstream.redux';
import {getSelectedItem, getSelectedMenuItem} from './ui.redux';
import {getLoggedUser} from './auth.redux';
import {getLocalStorage} from '../utils/utils';
import isEmpty from 'lodash/isEmpty';

// 获取所有组的名字
export const getGroupNameList = (state) => {
  const allIds = getGroupIds(state);
  return allIds.map(id => {
    const group = getGroupById(state, id).get('group');
    const group_id = getGroupById(state, id).get('group_id');
    return Immutable.fromJS({
      group,
      group_id
    });
  });
};

// 获取某一个组下的所有encodes
export const getEncodesListByGroupId = (state, group_id) => {
  const encodeIds = getEncodeIdsByGroup(state, group_id);
  if (encodeIds) {
    return encodeIds.map((id) => {
      const encode = getEncodeById(state, id);
      return encode;
    });
  } else {
    return Immutable.List();
  }
};

// 获取某一个组下的所有wowzas
export const getWowzasListByGroupId = (state, group_id) => {
  const wowzaIds = getWowzaIdsByGroup(state, group_id);
  if (wowzaIds) {
    return wowzaIds.map((id) => {
      const wowza = getWowzaById(state, id);
      return wowza;
    });
  } else {
    return Immutable.List();
  }
};

// 获取某一个组
export const getSingleGroupByGroupId = (state, group_id) => {
  const group = getGroupById(state, group_id);
  if (group) {
    return Immutable.fromJS(group);
  } else {
    return Immutable.fromJS({});
  }
};

// 获取某一组的信息
export const getGroupListByGroupId = (state, group_id) => {
  const encodes = getEncodesListByGroupId(state, group_id);
  const wowzas = getWowzasListByGroupId(state, group_id);
  const group = getSingleGroupByGroupId(state, group_id);
  return group.merge({
    encodeDevices: encodes,
    recvStreamServices: wowzas
  });
};

// // 获取某一组下的单个wowza流信息
// export const getSingleGroupWowzaStreamInfo = (state, group_id) => {
//   const allWowzaIds = getWowzaStreamInfoByGroup(state, group_id);
//   if (allWowzaIds) {
//     return allWowzaIds.map((id) => {
//       return getWowzaInfoById(state, id);
//     });
//   } else {
//     return Immutable.List();
//   }
// };

// 获取某一组下的单个wowza流信息
export const getSingleGroupWowzaStreamInfo = (state) => {
  const currentSelectedItem = getSelectedItem(state); // group_id
  if (currentSelectedItem) {
    const allWowzaIds = getWowzaStreamInfoByGroup(state, currentSelectedItem);
    if (allWowzaIds) {
      return allWowzaIds.map((id) => {
        return getWowzaInfoById(state, id);
      });
    }
  }
  return Immutable.fromJS([]);
};

// 根据selectedItem来整合单一组信息
export const getSingleGroupBySelectedItem = (state) => {
  // const currentSelectedItem = getSelectedItem(state);
  const currentSelectedItem = getSelectedItemToUse(state);
  // console.log('[currentSelectedItem]', currentSelectedItem);
  if (currentSelectedItem) {
    // 获取单一组, 包装成API的样子
    const group = getSingleGroupByGroupId(state, currentSelectedItem);
    const encodes = getEncodesListByGroupId(state, currentSelectedItem);
    const wowzas = getWowzasListByGroupId(state, currentSelectedItem);
    return group.merge({
      encodeDevices: encodes,
      recvStreamServices: wowzas
    });
  } else {
    return Immutable.fromJS({});
  }
};

// 计算<selected>的默认项目
export const getDetaultSelectedItem = (state) => {
  const selectedItem = getLocalStorage('selectedItem'); // TODO: 问题出在这里

  if (selectedItem) {
    const allIds = getGroupIds(state);
    const index = allIds.findIndex((v) => v === selectedItem);
    return (index >= 0) ? getGroupById(state, selectedItem).get('group') : '';
  } else {
    const groupList = getGroupNameList(state);
    // console.log('[defaultGroupNameList]', groupList.size ? groupList.first().get('group') : '');
    return groupList.size ? groupList.first().get('group') : '';
  }
};

// 根据selectedItem, 返回可用的选中项
export const getSelectedItemToUse = (state) => {
  const currentSelectedItem = getSelectedItem(state);

  // 当无组, 删除组时, selectedItem === ''
  const allIds = getGroupIds(state);
  const index = allIds.findIndex((v) => v === currentSelectedItem);

  // console.log('[计算selectedItem]', currentSelectedItem, index);

  if (index >= 0) {
    return currentSelectedItem;
  }

  if (index < 0 && allIds.size) { // 删除组
    return allIds.first();
  }

  return ''; // 没有组
};

// 根据可用的选中项, 获取group, 组名
export const getDetaultGroup = (state) => {
  const useSelectedItem = getSelectedItemToUse(state);
  const group = getGroupById(state, useSelectedItem);
  if (!isEmpty(group)) {
    return group.get('group');
  } else {
    return '';
  }
};

// 根据selectedMenuItem, 返回可用的跳转项
export const getSelectedMenuItemToUse = (state) => {
  const currentSelectedMenuItem = getSelectedMenuItem(state);
  const selectedMenuItem = getLocalStorage('selectedMenuItem');
  // console.log('[根据selectedMenuItem, 返回可用的跳转项]', currentSelectedMenuItem, selectedMenuItem);
  if (!isEmpty(currentSelectedMenuItem)) { // currentSelectedMenuItem是否为空(是不是登录/刷新状态)
    return currentSelectedMenuItem;
  }

  if (!isEmpty(selectedMenuItem)) { // 刷新页面, 当前是登录状态, 还是刷新状态
    return selectedMenuItem;
  }

  // 登录状态('', 且localStorage的selectedMenuItem为空)
  return 'device';

  // 登录/刷新, selectedMenuItem都返回''
  // 三种状态:
  //
};

// 根据可用的跳转项, 制作跳转路径, useRedirectTo
export const getUseRedirectTo = (state) => {
  const useSelectedMenuItem = getSelectedMenuItemToUse(state);
  return `/home/${useSelectedMenuItem}`;
};

// 获取username
export const getUserName = (state) => {
  let username = getLoggedUser(state).get('username');
  return username || getLocalStorage('login.user');
  /*
  * user/username三种状态:
  * 1.默认状态/加载前状态: username: ''
  * 2.加载完成, 有值: username: 'adinno'
  * 3.刷新: 从cookie中获取'login.user'
  * */
};

/**
 * 参数group_id都从ui.redux.js中的selectedItem字段来获取
 * */
