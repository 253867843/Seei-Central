import Immutable from 'immutable';
import { combineReducers } from 'redux-immutable';
// import axios from 'axios';
import { postAxios } from '../utils/request';
import { actions as appActions } from './app.redux';
import { types as authTypes } from "./auth.redux";
import url from '../utils/url';

// action types
export const types = {
  FETCH_WOWZA_INFO: 'WOWZA/FETCH_WOWZA_INFO', // 获取接收wowza服务器流信息
};

// action creators
export const actions = {
  fetchWowzaInfo: ({ group, group_id, recvStreamServices_id }) => {
    // + 
    appActions.startFetching();
    return (dispatch) => {
      postAxios(url.fetchWowzaInfo(), { group, group_id, recvStreamServices_id }, dispatch)
        .then((data) => {
          // +
          appActions.finishFetching();
          console.log('[wstream.redux fetchWowzaInfo]', data);
          if (!data.error) {
            if (data.status) {
              // 获取成功
              const { wowzasInfo, wowzaIds } = convertSingleWowzaToPlain(data.data);
              dispatch(fetchWowzaInfoSuccess(group_id, wowzasInfo, wowzaIds));
            } else {
              // 获取失败
              // +
              appActions.finishFetching();
            }
          } else {
            dispatch(appActions.setError(data.error));
            // + 
            appActions.finishFetching();
          }
        }
        )
    }
  },
}
  ;

// 内部action creators
const fetchWowzaInfoSuccess = (group_id, wowzasInfo, wowzaIds) => ({
  type: types.FETCH_WOWZA_INFO,
  group_id,
  wowzasInfo,
  wowzaIds
});

const convertSingleWowzaToPlain = (data) => {
  const { recvStreamServicesStatusInfo } = data;
  let wowzasById = {};
  let wowzaIds = [];
  recvStreamServicesStatusInfo.forEach((item) => {
    wowzasById[item.id] = { ...item };
    wowzaIds.push(item.id);
  });
  return {
    wowzasInfo: wowzasById,
    wowzaIds
  }
};

const byId = (state = Immutable.fromJS({}), action) => {
  switch (action.type) {
    case types.FETCH_WOWZA_INFO:
      return state.merge(Immutable.fromJS(action.wowzasInfo)); // 复杂数据类型 {}
    case authTypes.LOGOUT:
      return Immutable.fromJS({}); // 清空数据
    default:
      return state;
  }
};

const byGroup = (state = Immutable.fromJS({}), action) => {
  switch (action.type) {
    case types.FETCH_WOWZA_INFO:
      return state.merge({ [action.group_id]: Immutable.fromJS(action.wowzaIds) }); // 复杂数据类型 []
    case authTypes.LOGOUT:
      return Immutable.fromJS({}); // 清空数据
    default:
      return state;
  }
};

const reducer = combineReducers({
  byId,
  byGroup
});

export default reducer;

// selector
// 获取所有wowzas的流信息
export const getWowzasStreamInfo = (state) => state.getIn(['wstream', 'byId']);
// 获取某一个组下的所有wowza流信息的id
export const getWowzaStreamInfoByGroup = (state, groupId) => state.getIn(['wstream', 'byGroup', groupId]);
// 获取单个wowza的流信息
export const getWowzaInfoById = (state, id) => state.getIn(['wstream', 'byId', id]);


/**
 * stream: {
 *   b0abd9249451d0fdbf0e1406f5d9e31: {
 *    byId: {
 *    	  id: 'b0abd9249451d0fdbf0e1406f5d9e31'{		#接收端wowza服务id
				  bytesIn: 23582908,		#累计视频流传入多少字节 （单位: 字节）
				  bytesInRate: 109203,		#视频流传入速率	(单位: 字节/秒)
				  totalConnections: 1,		#播放连接数
				  bytesOut: 45879708,		#累计视频流传出多少字节 （单位: 字节）
				  bytesOutRate: 231396		#视频流传出速率 (单位: 字节/秒)
 *        }
 *    },
 *    byGroup: {
 *        sd0abd9249451d0fdbf0e1406f5d9e6a: ['b0abd9249451d0fdbf0e1406f5d9e31']
 *        ...
 *    }
 * }
 *
 * */

/**
 *  "data": {
    "group_id": "sd0abd9249451d0fdbf0e1406f5d9e6a",
    "group": "group_test",
    "recvStreamServicesStatusInfo": [
      {
        "id": "b0abd9249451d0fdbf0e1406f5d9e31",
        "bytesIn": 23582908,
        "bytesInRate": 109203,
        "totalConnections": 1,
        "bytesOut": 45879708,
        "bytesOutRate": 231396
      }
    ]
  }
 * */