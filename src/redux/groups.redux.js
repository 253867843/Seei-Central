import Immutable from 'immutable';
import {fromJS} from 'immutable';
// import axios from 'axios';
import {postAxios} from '../utils/request';
import {actions as appActions} from './app.redux';
import {types as authTypes} from './auth.redux';
import {types as usersTypes} from './users.redux';
import url from '../utils/url';
import {combineReducers} from 'redux-immutable';

// action types
export const types = {
  CREATE_GROUP: 'GROUPS/CREATE_GROUP', // 添加Group
  MODIFY_GROUP: 'GROUPS/MODIFY_GROUP', // 修改Group
  FETCH_GROUP_INFO: 'GROUPS/FETCH_GROUP_INFO', // 查看单个Group(查看组中所有encodes/查看组中所有wowzas)
  FETCH_GROUPS: 'GROUPS/FETCH_GROUPS', // TODO: 查看所有组Group(可能不需要encodes和wowzas信息)
  DELETE_GROUP: 'GROUPS/DELETE_GROUP', // 删除Group
  DELETE_ALL_GROUP: 'GROUPS/DELETE_ALL_GROUP', // 删除所有Group
  MATCH_GROUP: 'GROUPS/MATCH_GROUP', // 匹配Group
  START_PUSH_STREAM: 'GROUPS/START_PUSH_STREAM', // 开始推流
  FINISH_PUSH_STREAM: 'GROUPS/FINISH_PUSH_STREAM', // 停止推流
};

// action creators
export const actions = {
  createGroup: (data) => { // 添加Group(操作: 修改)
    return (dispatch) => {
      dispatch(appActions.startRequest());
      // -
      // axios.post(url.createGroup(), data)
      // +
      postAxios(url.createGroup(), data, dispatch)
        .then((data) => {
          dispatch(appActions.finishRequest());
          // -
          // console.log('[groups.redux createGroup]', res);
          // +
          console.log('[groups.redux createGroup]', data);
          // -
          // if (res.status === 200 && res.data.status) {
          // +
          if (!data.error && data.status) {
            // -
            // const {group_id, groupItem, encodes, encodeIds, wowzas, wowzaIds} = convertCreateGroupToPlain(res.data.data);
            // +
            const {group_id, groupItem, encodes, encodeIds, wowzas, wowzaIds} = convertCreateGroupToPlain(data.data);
            dispatch(createGroupSuccess(group_id, groupItem, encodes, encodeIds, wowzas, wowzaIds));
          } else {
            dispatch(appActions.setError(data.error)); // 错误信息保留
          }
        })
      // -
      // .catch((err) => {
      //   console.log('[err]', err);
      //   dispatch(appActions.setError(err));
      // });
    }
  },
  modifyGroup: (data) => { // 修改Group(操作: 修改)
    return (dispatch) => {
      dispatch(appActions.startRequest());
      // axios.post(url.modifyGroup(), data)
      postAxios(url.modifyGroup(), data, dispatch)
        .then((data) => {
          dispatch(appActions.finishRequest());
          // console.log('[groups.redux modifyGroup]', res);
          console.log('[groups.redux modifyGroup]', data);
          // if (res.status && res.data.status) {
          if (!data.error && data.status) {
            // const {groupItem, encodes, encodeIds, wowzas, wowzaIds} = convertUpdateGroupToPlain(res.data.data);
            const {groupItem, encodes, encodeIds, wowzas, wowzaIds} = convertUpdateGroupToPlain(data.data);
            dispatch(modifyGroupSuccess(groupItem, encodes, encodeIds, wowzas, wowzaIds));
          } else {
            dispatch(appActions.setError(data.error)); // 错误信息保留
          }
        })
      // .catch((err) => {
      //   dispatch(appActions.setError(err));
      // });
    }
  },
  fetchGroupInfo: ({group, group_id}) => { // 查看Group(操作: 覆盖)
    return (dispatch) => {
      // -
      // dispatch(appActions.startRequest());
      // axios.post(url.fetchGroupInfo(), {group, group_id})
      postAxios(url.fetchGroupInfo(), {group, group_id}, dispatch)
        .then((data) => {
          // -
          // dispatch(appActions.finishRequest());
          // console.log('[groups.redux fetchGroupInfo]', res);
          console.log('[groups.redux fetchGroupInfo]', data);
          // if (res.status && res.data.status) {
          if (!data.error && data.status) {
            // console.log('[fetchGroupInfo结果]',res.data);
            // const {groupItem, encodes, encodeIds, wowzas, wowzaIds} = convertSingleGroupToPlain(res.data.data);
            const {groupItem, encodes, encodeIds, wowzas, wowzaIds} = convertSingleGroupToPlain(data.data);
            dispatch(fetchGroupInfoSuccess(groupItem, encodes, encodeIds, wowzas, wowzaIds));
          } else {
            dispatch(appActions.setError(data.error));
          }
        })
      // .catch((err) => {
      //   console.log('[fetchGroupInfo err]', err);
      //   dispatch(appActions.setError(err));
      // });
    }
  },
  deleteGroup: ({group, group_id}) => { // 删除Group(操作: 修改)
    // console.log('[删除组参数]', group, group_id);
    return (dispatch) => {
      dispatch(appActions.startRequest());
      // axios.post(url.deleteGroup(), {group, group_id})
      postAxios(url.deleteGroup(), {group, group_id}, dispatch)
        .then((data) => {
          dispatch(appActions.finishRequest());
          // console.log('[groups.redux deleteGroup]', res);
          console.log('[groups.redux deleteGroup]', data);
          // if (res.status === 200 && res.data.status) {
          if (!data.error && data.status) {
            //   const {encodeIds, wowzaIds} = convertDeleteGroupToPlain(res.data.data);
            const {encodeIds, wowzaIds} = convertDeleteGroupToPlain(data.data);
            dispatch(deleteGroupSuccess(group, group_id, encodeIds, wowzaIds));
          } else {
            dispatch(appActions.setError(data.error)); // 错误信息保留
          }
        })
      // .catch((err) => {
      //   console.log('[删除组 报错]', err);
      //   dispatch(appActions.setError(err));
      // });
    }
  },
  matchGroup: ({group, group_id}) => { // 匹配Group
    return (dispatch) => {
      dispatch(appActions.startRequest());
      // axios.post(url.matchGroup(), {group, group_id, auth: '6xxc4MS8Z9bFr2xcSK23r9Wd3P5jfrbG'})
      postAxios(url.matchGroup(), {group, group_id, auth: '6xxc4MS8Z9bFr2xcSK23r9Wd3P5jfrbG'}, dispatch)
        .then((data) => {
          dispatch(appActions.finishRequest());
          // console.log('[groups.redux matchGroup]', res);
          console.log('[groups.redux matchGroup]', data);
          if (!data.error && data.status) {
            // if (res.status === 200 && res.data.status) {
            //   const {groupItem, encodes, wowzas} = convertMatchGroupToPlain(res.data.data);
            const {groupItem, encodes, wowzas} = convertMatchGroupToPlain(data.data);
            dispatch(matchGroupSuccess(groupItem, encodes, wowzas));
          } else {
            dispatch(appActions.setError(data.error)); // 错误信息保留
          }
        })
      // .catch((err) => {
      //   dispatch(appActions.setError(err));
      // });
    }
  },
  startPushStream: ({group, group_id, encodeDevice_id, recvStreamService_id}) => {
    return (dispatch) => {
      dispatch(appActions.startRequest());
      // axios.post(url.startPushStream(), {group, group_id, encodeDevice_id, recvStreamService_id})
      postAxios(url.startPushStream(), {group, group_id, encodeDevice_id, recvStreamService_id}, dispatch)
        .then((data) => {
          dispatch(appActions.finishRequest());
          // console.log('[groups.redux startPushStream]', res);
          console.log('[groups.redux startPushStream]', data);
          // if (res.status === 200 && res.data.status) {
          if (!data.error && data.status) {
            console.log('[startPushStream]', data);
            dispatch(startPushStreamSuccess(group_id));
          } else {
            dispatch(appActions.setError(data.error)); // 错误信息保留
          }
        })
      // .catch((err) => {
      //   dispatch(appActions.setError(err));
      // });
    }
  },
  finishPushStream: ({group, group_id}) => {
    return (dispatch) => {
      dispatch(appActions.startRequest());
      // axios.post(url.finishPushStream(), {group, group_id})
      postAxios(url.finishPushStream(), {group, group_id}, dispatch)
        .then((data) => {
          dispatch(appActions.finishRequest());
          // console.log('[groups.redux finishPushStream]', res);
          console.log('[groups.redux finishPushStream]', data);
          // if (res.status === 200 && res.data.status) {
          if (!data.error && data.status) {
            dispatch(finishPushStreamSuccess(group_id));
          } else {
            dispatch(appActions.setError(data.error)); // 错误信息保留
          }
        })
      // .catch((err) => {
      //   dispatch(appActions.setError(err));
      // });
    }
  },
  deleteAllGroup: () => { // 不需要传参
    return (dispatch) => {
      dispatch(appActions.startRequest());
      // axios.post(url.deleteGroup())
      postAxios(url.deleteGroup(), dispatch)
        .then((data) => {
          dispatch(appActions.finishRequest());
          // console.log('[groups.redux deleteAllGroup]', res);
          console.log('[groups.redux deleteAllGroup]', data);
          // if (res.status === 200 && res.data.status) {
          if (!data.error && data.status) {
            dispatch(deleteAllGroupSuccess());
          } else {
            dispatch(appActions.setError(data.error)); // 错误信息保留
          }
        })
      // .catch((err) => {
      //   dispatch(appActions.setError(err));
      // });
    }
  }
};

// 内部action creators
const createGroupSuccess = (group_id, groupItem, encodes, encodeIds, wowzas, wowzaIds) => ({
  type: types.CREATE_GROUP,
  group_id,
  groupItem,
  encodes,
  encodeIds,
  wowzas,
  wowzaIds
});

const modifyGroupSuccess = (groupItem, encodes, encodeIds, wowzas, wowzaIds) => ({
  type: types.MODIFY_GROUP,
  groupItem,
  encodes,
  encodeIds,
  wowzas,
  wowzaIds
});

const fetchGroupInfoSuccess = (groupItem, encodes, encodeIds, wowzas, wowzaIds) => ({
  type: types.FETCH_GROUP_INFO,
  groupItem,
  encodes,
  encodeIds,
  wowzas,
  wowzaIds
});

const deleteGroupSuccess = (group, group_id, encodeIds, wowzaIds) => ({
  type: types.DELETE_GROUP,
  group,
  group_id,
  encodeIds,
  wowzaIds
});

const matchGroupSuccess = (groupItem, encodes, wowzas) => ({
  type: types.MATCH_GROUP,
  groupItem,
  encodes,
  wowzas
});

const startPushStreamSuccess = (group_id) => ({
  type: types.START_PUSH_STREAM,
  group_id
});

const finishPushStreamSuccess = (group_id) => ({
  type: types.FINISH_PUSH_STREAM,
  group_id
});

const deleteAllGroupSuccess = () => ({
  type: types.DELETE_ALL_GROUP
});

// 扁平化, 添加Group返回
const convertCreateGroupToPlain = (data) => {
  const {group_id, group, dState, eMessage, description, encodeDevices, recvStreamServices} = data;
  let groupItem = {group, group_id, dState, eMessage, description};
  let encodesById = {}; // 记录前端设备
  let encodeIds = []; // encode.redux.js/byPost用
  let wowzaById = {}; // 记录wowza
  let wowzaIds = []; //wowza.redux.js/byPost用
  encodeDevices.forEach((item) => {
    encodesById[item.id] = {...item};
    encodeIds.push(item.id);
  });
  recvStreamServices.forEach((item) => {
    wowzaById[item.id] = {...item};
    wowzaIds.push(item.id);
  });
  return {
    group_id,
    groupItem: groupItem,
    encodes: encodesById,
    encodeIds,
    wowzas: wowzaById,
    wowzaIds
  }
};

// 扁平化, 修改Group返回
const convertUpdateGroupToPlain = (data) => {
  const {group_id, group, dState, eMessage, description, encodeDevices, recvStreamServices} = data;
  let groupItem = {group, group_id, dState, eMessage, description};
  let encodesById = {}; // 记录前端设备
  let wowzasById = {}; // 记录wowza
  encodeDevices.forEach((item) => {
    encodesById[item.id] = {...item};
  });
  recvStreamServices.forEach((item) => {
    wowzasById[item.id] = {...item};
  });
  return {
    groupItem: groupItem,
    encodes: encodesById,
    wowzas: wowzasById,
  }
};

// 扁平化, 查看Group返回
const convertSingleGroupToPlain = (data) => {
  const {group_id, group, dState, eMessage, description, status, encodeDevices, recvStreamServices} = data;
  let groupItem = {group_id, group, dState, eMessage, description, status};
  let encodesById = {};
  let encodeIds = [];
  let wowzasById = {};
  let wowzaIds = [];
  encodeDevices.forEach((item) => {
    encodesById[item.id] = {...item};
    encodeIds.push(item.id);
  });
  recvStreamServices.forEach((item) => {
    wowzasById[item.id] = {...item};
    wowzaIds.push(item.id);
  });
  return {
    groupItem: groupItem,
    encodes: encodesById,
    encodeIds,
    wowzas: wowzasById,
    wowzaIds
  }
};

// 扁平化, 删除Group返回(目前不返回内容)
const convertDeleteGroupToPlain = (data) => {
  const {encodeDevices, recvStreamServices} = data;
  console.log('[删除Group返回 encodeDevices]', encodeDevices);
  console.log('[删除Group返回 recvStreamServices]', recvStreamServices);
  const encodeIds = [];
  const wowzaIds = [];
  encodeDevices.forEach((item) => {
    encodeIds.push(item.id);
  });
  recvStreamServices.forEach((item) => {
    wowzaIds.push(item.id);
  });
  return {
    encodeIds,
    wowzaIds
  }
};

// 扁平化, 匹配Group返回
const convertMatchGroupToPlain = (data) => {
  const {group_id, group, dState, eMessage, description, status, encodeDevices, recvStreamServices} = data;
  let groupItem = {group_id, group, dState, eMessage, description};
  let encodesById = {};
  let wowzasById = {};
  encodeDevices.forEach((item) => {
    encodesById[item.id] = {...item};
  });
  recvStreamServices.forEach((item) => {
    wowzasById[item.id] = {...item};
  });
  return {
    groupItem: groupItem,
    encodes: encodesById,
    wowzas: wowzasById
  };
};

// reducers
const byId = (state = Immutable.fromJS({}), action) => { // 记录groups信息
  switch (action.type) {
    case usersTypes.FETCH_USER_INFO: // 获取用户信息
    case authTypes.LOGIN: // 登录成功
      return state.merge(Immutable.fromJS(action.groups)); // 复杂数据类型
    case authTypes.LOGOUT: // 登出成功
      return Immutable.fromJS({});
    case types.CREATE_GROUP:
    case types.MODIFY_GROUP:
    case types.FETCH_GROUP_INFO:
    case types.MATCH_GROUP:
      return state.merge({[action.groupItem.group_id]: Immutable.fromJS(action.groupItem)}); // 复杂数据类型
    case types.DELETE_GROUP:
      return state.delete(action.group_id);
    case types.START_PUSH_STREAM:
      return state.set(action.group_id, state.get(action.group_id).set('status', true));
    case types.FINISH_PUSH_STREAM:
      return state.set(action.group_id, state.get(action.group_id).set('status', false));
    default:
      return state;
  }
};

const allIds = (state = Immutable.fromJS([]), action) => {
  switch (action.type) {
    case usersTypes.FETCH_USER_INFO:
    case authTypes.LOGIN:
      // console.log('[!!!!!!!!!]', action.groupsIds);
      return Immutable.List(action.groupsIds);
    case authTypes.LOGOUT:
      return Immutable.List();
    case types.CREATE_GROUP:
      return state.unshift(action.groupItem.group_id);
    case types.FETCH_GROUPS: // TODO: 未实现
      return state;
    case types.DELETE_GROUP:
      return state.delete(state.indexOf(action.group_id));
    default:
      return state;
  }
};

const reducer = combineReducers({
  byId,
  allIds
});

export default reducer;

// selector
// 获取所有组信息:
export const getGroupList = (state) => state.getIn(['groups', 'byId']);
// 获取单个组信息:
export const getGroupById = (state, id) => state.getIn(['groups', 'byId', id]);
// 获取组的排序数组:
export const getGroupIds = (state) => state.getIn(['groups', 'allIds']);
// 获取组的匹配状态
export const getGroupMatchStatus = (state, id) => state.getIn(['groups', 'byId', id, 'dState']);
// 获取组的推流状态
export const getGroupStreamStatus = (state, id) => state.getIn(['groups', 'byId', id, 'status']);

/**
 * groups: {
 *    byId: {
 *      sd0abd9249451d0fdbf0e1406f5d9e6a: {
 *          group_id: 'sd0abd9249451d0fdbf0e1406f5d9e6a',
 *          group: 'group_test',
 *          dState: 'offline', // offline(未匹配), ready(已经匹配)
 *          eMessage: '',
 *          description: ''
 *      }
 *    },
 *    allIds: ['sd0abd9249451d0fdbf0e1406f5d9e6a', ...]
 * }
 * */

// 查询: /mcm/api/groups?filter={"fields":{},"where":{},"skip":0,"limit":20,"include":["encodeDevices","recvStreamServices"]}
// 新增:

// {
//   "group_id": "sd0abd9249451d0fdbf0e1406f5d9e6b",
//   "group": "group_test2",
//   "dState": "ready",
//   "status": true,
//   "eMessage": "no error",
//   "description": "组2",
//   "encodeDevices": [
//   {
//     "domain": "192.168.3.4",
//     "port": "8100",
//     "auth": "4a0abd9249451d0fdbf0e1406f5d9e6b",
//     "recvServicePort": "11000",
//     "state": "normal",
//     "eMessage": "no error",
//   }
// ]
// }

/**
 * 使用merge时, 要注意类型统一, 对数据进行fromJS(...)处理
 * 1.如果值是简单类型:
 * 当值为 number, string, boolean时, 不需要fromJS(...)处理了
 * state.merge({requestQuantity: state.get('requestQuantity') + 1});
 * state.merge({error: action.error});
 *
 * 2.如果值是复杂类型:
 * 当值为 {}, [] 时, 需要使用fromJS(...)处理, 来保证数据类型统一
 * state.merge({[action.groupItem.group_id]: fromJS(action.groupItem)}); // action.groupItem是一个{}
 * state.merge({[action.groupItem.group_id]: Immutable.List(action.encodeIds)}); // action.encodeIds是一个[]
 * */