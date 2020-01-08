import { fromJS } from 'immutable';
import { types as authTypes } from './auth.redux';
import isEmpty from 'lodash/isEmpty';

const defaultState = fromJS({
  requestQuantity: 0, // 当前应用正在进行的API请求数
  error: null, // 应用全局错误信息
  redirectTo: '', // 跳转
  isFetching: false, // 是否开始轮询(获取接收wowza服务器流信息tabinfo.js用, wstream.redux)
});

// action types
export const types = {
  START_REQUEST: 'APP/START_REQUEST',
  FINISH_REQUEST: 'APP/FINISH_REQUEST',
  SET_ERROR: 'APP/SET_ERROR',
  REMOVE_ERROR: 'APP/REMOVE_ERROR',
  START_WOWZA_FETCH: 'APP/START_WOWZA_FETCH',
  FINISH_WOWZA_FETCH: 'APP/FINISH_WOWZA_FETCH'
};

// action creators
export const actions = {
  startRequest: () => ({
    type: types.START_REQUEST
  }),
  finishRequest: () => ({
    type: types.FINISH_REQUEST
  }),
  setError: (error) => ({
    type: types.SET_ERROR,
    error
  }),
  removeError: () => ({
    type: types.REMOVE_ERROR
  }),
  startFetching: () => ({
    type: types.START_WOWZA_FETCH
  }),
  finishFetching: () => ({
    type: types.FINISH_WOWZA_FETCH
  })
};

// reducers
export default (state = defaultState, action) => {
  switch (action.type) {
    case types.START_REQUEST:
      return state.merge({ requestQuantity: state.get('requestQuantity') + 1 });
    case types.FINISH_REQUEST:
      return state.merge({ requestQuantity: state.get('requestQuantity') - 1 });
    case types.SET_ERROR:
      return state.merge({ error: action.error });
    case types.REMOVE_ERROR:
      return state.merge({ error: null });
    case authTypes.LOGIN:
      return state.merge({ redirectTo: '/dashboard' });
    case authTypes.LOGOUT:
    case authTypes.MODIFY_PASSWORD:
      return state.merge({ redirectTo: '' });
    case types.START_WOWZA_FETCH:
      return state.merge({ isFetching: true }); // 简单数据类型
    case types.FINISH_WOWZA_FETCH:
      return state.merge({ isFetching: false });
    default:
      return state;
  }
};

// -
// 跳转
// const getRedirectToPath = ({username, groupsIds}) => {
//   const isLoggedIn = !isEmpty(username); // 新用户的组为空
//   if (isLoggedIn) {
//     return '/home/device'; // 获取用户信息成功
//   } else {
//     return '/login'; // 获取用户信息失败, 跳转到登录界面
//   }
// };

// selectors
// 获取当前请求数
export const getRequestQuantity = (state) => state.getIn(['app', 'requestQuantity']);
// 获取错误信息
export const getError = (state) => state.getIn(['app', 'error']);
// 获取当前跳转路径
export const getRedirectTo = (state) => state.getIn(['app', 'redirectTo']);
// 获取isFetching
export const getIsFetching = (state) => state.getIn(['app', 'isFetching']);

/**
 * app: {
 *   requestQuantity: 0, // 当前应用中正在进行的API请求数
 *   error: null, // 应用全局错误信息
 *   redirectTo: '', // 跳转
 * }
 * */