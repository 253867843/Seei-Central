import Immutable from 'immutable';
import {combineReducers} from 'redux-immutable';
import {types as groupsTypes} from './groups.redux';
import {types as authTypes} from './auth.redux';
// action types

// action creators

// 内部action creators

// reducers
const byId = (state = Immutable.fromJS({}), action) => {
    function deleteWowzaIds(state, wowzaIds) {
      return state.deleteAll(wowzaIds);
    }

    switch (action.type) {
      case groupsTypes.CREATE_GROUP: // 添加Group
      case groupsTypes.MODIFY_GROUP: // 修改Group
      case groupsTypes.FETCH_GROUP_INFO: // 查看Group
        return state.merge(Immutable.fromJS(action.wowzas)); // 复杂数据类型
      case groupsTypes.MATCH_GROUP:
        return state.merge(Immutable.fromJS(action.wowzas)); // 复杂数据类型
      case groupsTypes.DELETE_GROUP: // TODO: 测试
        return deleteWowzaIds(state, action.wowzas);
      case authTypes.LOGOUT:
        return Immutable.fromJS({}); // 清空redux
      default:
        return state;
    }
  }
;

const byGroup = (state = Immutable.fromJS({}), action) => {
  switch (action.type) {
    case groupsTypes.CREATE_GROUP: // 添加组
      return state.set(
        [action.groupItem.group_id],
        // state.get(action.groupItem.group_id).unshift(action.wowzaIds[0])
        Immutable.List([]).unshift(action.wowzaIds[0])
      );
    case groupsTypes.FETCH_GROUP_INFO:
      return state.merge({[action.groupItem.group_id]: Immutable.fromJS(action.wowzaIds)}); // 复杂数据类型
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
// 获取所有wowzas
export const getWowzas = (state) => state.getIn(['wowzas', 'byId']);
// 获取某一个组件下的所有wowzas的id
export const getWowzaIdsByGroup = (state, groupId) => state.getIn(['wowzas', 'byGroup', groupId]);
// 获取某个wowza
export const getWowzaById = (state, id) => state.getIn(['wowzas', 'byId', id]);

/**
 * wowzas: {
 *   	b0abd9249451d0fdbf0e1406f5d9e31: {
 *   	  id: 'b0abd9249451d0fdbf0e1406f5d9e31'		#wowza服务id
				domain: '127.0.0.1',	#接收端wowza地址可以是IP或者域名
				port: 8087		#接收端wowza端口  默认8087
				state:	normal,		#状态 abnormal(异常)	 normal(正常)
				eMessage: ''	#异常信息
 *			bytesIn: 23582908,		#累计视频流传入多少字节 （单位: 字节）
 *			bytesInRate: 109203,		#视频流传入速率	(单位: 字节/秒)
 *   		totalConnections: 1,		#播放连接数
 *			bytesOut: 45879708,		#累计视频流传出多少字节 （单位: 字节）
 * 			bytesOutRate: 231396		#视频流传出速率 (单位: 字节/秒)
 *   	}
 * }
 *
 *    b0abd9249451d0fdbf0e1406f5d9e31: {
				id: 'b0abd9249451d0fdbf0e1406f5d9e31'		#接收端wowza服务id
				bytesIn: 23582908,		#累计视频流传入多少字节 （单位: 字节）
				bytesInRate: 109203,		#视频流传入速率	(单位: 字节/秒)
				totalConnections: 1,		#播放连接数
				bytesOut: 45879708,		#累计视频流传出多少字节 （单位: 字节）
				bytesOutRate: 231396		#视频流传出速率 (单位: 字节/秒)
			}
 *
 * */