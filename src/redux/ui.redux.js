import Immutable from 'immutable';
import {types as authTypes} from './auth.redux';
import {types as userTypes} from './users.redux';
import {types as groupsTypes, getGroupIds} from './groups.redux';
import {getLocalStorage} from "../utils/utils";
import isEmpty from 'lodash/isEmpty';

const defaultState = Immutable.fromJS({
  isRememberAccount: false,
  deviceStatus: ['transmission', 'online', 'offline'], // 传送中, 在线, 离线
  deviceType: ['encode', 'wowza'], // encode, wowza
  selectedItem: '', // 导航条, <select>选中项, group_id
  selectedMenuItem: '', // <Menu>选中项, device/groups/server.js
});

// action types
export const types = {
  OPEN_REMEMBER_ACCOUNT: 'UI/OPEN_REMEMBER_ACCOUNT', // 勾选 记住密码 选项
  CLOSE_REMEMBER_ACCOUNT: 'UI/CLOSE_REMEMBER_ACCOUNT', // 取消勾选 记住密码 选项
  SET_DEVICE_STATUS: 'UI/SET_DEVICE_STATUS', // 设置展示的设备状态
  CLEAR_DEVICE_STATUS: 'UI/CLEAR_DEVICE_STATUS', // 清空展示的设备状态
  SET_DEVICE_TYPE: 'UI/SET_DEVICE_TYPE', // 设置展示的设备类型
  CLEAR_DEVICE_TYPE: 'UI/CLEAR_DEVICE_TYPE', // 清空展示的设备类型
  SET_SELECTED_ITEM: 'UI/SET_SELECTED_ITEM', // 设置<select>选中项目
  SET_SELECTED_MENU_ITEM: 'UI/SET_SELECTED_MENU_ITEM', // 设置<Menu>选中项目
};

// action creators
export const actions = {
  openRememberAccount: () => ({
    type: types.OPEN_REMEMBER_ACCOUNT
  }),
  closeRememberAccount: () => ({
    type: types.CLOSE_REMEMBER_ACCOUNT
  }),
  setDeviceStatus: (dStatus) => ({
    type: types.SET_DEVICE_STATUS,
    dStatus
  }),
  clearDeviceStatus: () => ({
    type: types.CLEAR_DEVICE_STATUS
  }),
  setDeviceType: (dType) => ({
    type: types.SET_DEVICE_TYPE,
    dType
  }),
  clearDeviceType: () => ({
    type: types.CLEAR_DEVICE_TYPE
  }),
  setSelectedItem: (group_id) => ({
    type: types.SET_SELECTED_ITEM,
    group_id
  }),
  setSelectedMenuItem: (current) => ({
    type: types.SET_SELECTED_MENU_ITEM,
    current
  })
};

// reducers
export default (state = defaultState, action) => {
  function getLoginSelectedStatus(state, groupsIds) { // 方式1: 登录状态(无组/有组)
    return state.merge({
      selectedItem: groupsIds.length ? groupsIds[0] : '',
      selectedMenuItem: ''
    });
  }

  function getRefreshSelectedStatus(state, groupIds) { // 方式2: 刷新页面
    let selectedItem = getLocalStorage('selectedItem');
    let selectedMenuItem = getLocalStorage('selectedMenuItem');
    if (isEmpty(selectedItem)) {
      return getLoginSelectedStatus(state, groupIds);
    }
    return state.merge({selectedItem, selectedMenuItem});
  }

  function getOperateSelectedStatus(state, group_id) { // 方式三: 操作数组(添加组/删除组)
    return state.merge({
      selectedItem: group_id, // 创建组: id/删除组: ''
      selectedMenuItem: 'device'
    });
  }

  switch (action.type) {
    case types.OPEN_REMEMBER_ACCOUNT:
      return state.set('isRememberAccount', true);
    case types.CLOSE_REMEMBER_ACCOUNT:
      return state.set('isRememberAccount', false);
    case types.SET_DEVICE_STATUS:
      return state.merge({deviceStatus: Immutable.fromJS(action.dStatus)}); // 复杂数据类型 []
    case types.CLEAR_DEVICE_STATUS:
      return state.merge({deviceStatus: Immutable.fromJS([])}); // 复杂数据类型 []
    case types.SET_DEVICE_TYPE:
      return state.merge({deviceType: Immutable.fromJS(action.dType)}); // 复杂数据类型 []
    case types.CLEAR_DEVICE_TYPE:
      return state.merge({deviceType: Immutable.fromJS([])}); // 复杂数据类型 []
    case types.SET_SELECTED_ITEM:
      return state.set('selectedItem', action.group_id); // 简单数据类型
    case types.SET_SELECTED_MENU_ITEM:
      return state.set('selectedMenuItem', action.current); // 简单数据类型
    case authTypes.LOGIN: // 登录成功
      return getLoginSelectedStatus(state, action.groupsIds); // 简单数据类型
    case userTypes.FETCH_USER_INFO: // 刷新页面
      return getRefreshSelectedStatus(state, action.groupsIds); // 简单数据类型
    case groupsTypes.CREATE_GROUP: // 创建组
      return getOperateSelectedStatus(state, action.group_id); // 简单数据类型
    case groupsTypes.DELETE_GROUP: // 删除组
      return getOperateSelectedStatus(state, ''); // 简单数据类型
    default:
      return state;
  }
};

// selector
export const isRememberAccount = (state) => state.getIn(['ui', 'isRememberAccount']);
export const getDeviceStatus = (state) => state.getIn(['ui', 'deviceStatus']);
export const getDeviceType = (state) => state.getIn(['ui', 'deviceType']);
export const getSelectedItem = (state) => state.getIn(['ui', 'selectedItem']);
export const getSelectedMenuItem = (state) => state.getIn(['ui', 'selectedMenuItem']);

/**
 * 测试参数: 127.0.0.1     8000   auth:D37pAyzwfYTD4P1ZA1ycZ158PBy9zEzs
 * 接收端参数:  127.0.0.1    8087
 * */


/**
 * 测试
 * 登录:
 *    : 条件 --- select显示 --- selectedItem --- selectedMenuItem
 *    : 无组 --- '' --- '' --- 'device'
 *    : 有组 * 1 --- firstItem in allIds --- 应该firstItem in allIds --- 'device'
 *    : 有组 * 2 --- firstItem in allIds --- 应该firstItem in allIds --- 'device'
 *
 * 刷新流程: setLocalStorage --- 刷新页面 --- getLocalStorage
 * localstorage:
 *              无组: 刷新 --- '' --- '' --- 'device'
 *              有组 * 1: 刷新 --- firstItem in allIds --- firstItem in allIds --- 'device'默认/'groups'/'server'
 *              有组 * 2: 刷新 --- firstItem in allIds --- firstItem in allIds --- 'device'默认/'groups'/'server'
 *              创建组: 刷新 --- 创建的group_id --- 创建的group_id --- 'device'
 *              删除组: 刷新 ---
 *                            如果数组中还有值: firstItem in allIds --- '' --- 'device'
 *                            如果数组中没有值: '' --- '' --- 'device'
 *
 * 操作组:
 *    创建组: 创建的group_id --- 创建的group_id --- 'device'
 *
 *    删除组:
 *      如果数组中还有值: firstItem in allIds --- '' --- 'device'
 *      如果数组中没有值: '' --- '' --- 'device'
 *
 * 删除组后, selectedItem, 会不会影响刷新
 * */