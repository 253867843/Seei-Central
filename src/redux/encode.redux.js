import Immutable from "immutable";
import {combineReducers} from 'redux-immutable';
import {types as groupsTypes} from './groups.redux';
import {types as authTypes} from './auth.redux';

// action types

// action creators

// reducer
const byId = (state = Immutable.fromJS({}), action) => { // 记录encodes
  function deleteEncodes(state, encodeIds) {
    return state.deleteAll(encodeIds);
  }

  switch (action.type) {
    case groupsTypes.CREATE_GROUP: // 添加Group
    case groupsTypes.MODIFY_GROUP: // 修改Group
    case groupsTypes.FETCH_GROUP_INFO: // 查看Group
      return state.merge(Immutable.fromJS(action.encodes)); // 复杂数据类型
    case groupsTypes.MATCH_GROUP:
      // console.log('[encode MATCH_GROUP]', action.encodes);
      return state.merge(Immutable.fromJS(action.encodes)); // 复杂数据类型
    case groupsTypes.DELETE_GROUP: // TODO: 测试
      return deleteEncodes(state, action.encodeIds);
    case authTypes.LOGOUT:
      return Immutable.fromJS({}); // 清空redux
    default:
      return state;
  }
};

const byGroup = (state = Immutable.fromJS({}), action) => { // 记录encode属于哪个group
  switch (action.type) {
    case groupsTypes.CREATE_GROUP:
      return state.set(
        [action.groupItem.group_id],
        // state.get(action.groupItem.group_id).unshift(action.encodeIds[0])
        Immutable.List([]).unshift(action.encodeIds[0])
      );
    case groupsTypes.FETCH_GROUP_INFO:
      return state.merge({[action.groupItem.group_id]: Immutable.fromJS(action.encodeIds)}); // 复杂数据类型
    case groupsTypes.DELETE_GROUP:
      return state.delete(action.group_id);
    case authTypes.LOGOUT:
      return Immutable.fromJS({}); // 清空redux
    default:
      return state;
  }
};

const reducer = combineReducers({
  byId,
  byGroup
});

export default reducer;


// selectors
// 获取所有encodes
export const getEncodes = (state) => state.getIn(['encodes', 'byId']);
// 获取某一个组下的所有encodes的id
export const getEncodeIdsByGroup = (state, groupId) => state.getIn(['encodes', 'byGroup', groupId]);
// 获取某个encode
export const getEncodeById = (state, id) => state.getIn(['encodes', 'byId', id]);

/**
 * encodes: {
 *    byId: {
          f0abd9249451d0fdbf0e1406f5d9e87: {
          id: 'f0abd9249451d0fdbf0e1406f5d9e87',		#编码器设备id
          domain: '127.0.0.1',	#编码器服务地址可以是IP或者域名
          port: 8000,		#编码器服务端口  默认8000
          auth: '4a0abd9249451d0fdbf0e1406f5d9e6a',	#认证auth 让用户自行输入
          recvServicePort: 10000,		#接收wowza端的端口  默认10000
          state:	normal,		#状态 abnormal(异常)	 normal(正常)
          eMessage: ''	#异常信息
 *       }
 *    },
 *    byGroup: {
 *      sd0abd9249451d0fdbf0e1406f5d9e6a: ['f0abd9249451d0fdbf0e1406f5d9e87', '...']
 *    }
 * }
 * */