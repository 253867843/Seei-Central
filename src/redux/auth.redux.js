import {fromJS} from 'immutable';
import axios from 'axios';
import {getAxios, postAxios} from '../utils/request';
import {actions as appActions} from './app.redux';
import {actions as vcodeActions} from './vcode.redux';
import {types as usersTypes} from './users.redux';
import url from '../utils/url';
import isEmpty from 'lodash/isEmpty';

const defaultState = fromJS({
  username: null,
});

// action types
export const types = {
  LOGIN: 'AUTH/LOGIN',
  LOGOUT: 'AUTH/LOGOUT',
  MODIFY_PASSWORD: 'AUTH/MODIFY_PASSWORD',
};

// action creators
export const actions = {
  login: ({user, password, verifyCode}) => {
    return (dispatch) => {
      dispatch(appActions.startRequest());
      postAxios(url.login(), {user, password, verifyCode}, dispatch)
        .then((data) => {
          dispatch(appActions.finishRequest());
          console.log('[auth.redux login]', data);
          if (!data.error) {
            if (data.status) {
              // 登录成功
              const {username, groups, groupsIds} = convertLoginInfoToPlain(data.data);
              dispatch(loginSuccess(username, groups, groupsIds));
              /**
               * auth.redux.js
               * groups.redux.js
               * */
            } else {
              // 登录失败, 刷新验证码
              dispatch(vcodeActions.fetchVerifyCode());
            }
          } else {
            // http请求错误
            dispatch(appActions.setError(data.error));
          }
        })
    }
  },
  logout: () => {
    return (dispatch) => {
      dispatch(appActions.startRequest());
      // -
      // axios.get(url.logout())
      // +
      getAxios(url.logout(), dispatch)
        .then((data) => {
          dispatch(appActions.finishRequest());
          // -
          // console.log('[auth.redux logout]', res);
          // +
          console.log('[auth.redux logout]', data);
          // -
          // if (res.status === 200 && res.data.status) {
          // +
          if (!data.error && data.status) {
            dispatch(logoutSuccess());
            /**
             * auth.redux.js 清空
             * groups.redux.js 清空
             * */
          } else {
            dispatch(appActions.setError(data.error));
          }
        })
      // -
      // .catch((err) => {
      //   dispatch(appActions.setError(err));
      // })
    }
  },
  modifyPassword: ({user, old_password, new_password, verifyCode}) => {
    return (dispatch) => {
      dispatch(appActions.startRequest());
      // -
      // axios.post(url.modifyPassword(), {user, old_password, new_password, verifyCode})
      // +
      postAxios(url.modifyPassword(), {user, old_password, new_password, verifyCode}, dispatch)
        .then((data) => {
          dispatch(appActions.finishRequest());
          // -
          // console.log('[auth.redux modifyPassword]', res);
          // +
          console.log('[auth.redux modifyPassword]', data);
          // -
          // if (res.status === 200 && res.data.status) {
          // +
          if (!data.error && data.status) {
            // 修改密码成功, 无操作
          } else {
            dispatch(appActions.setError(data.error));
          }
        })
      // .catch((err) => {
      //   dispatch(appActions.setError(err));
      // });
    }
  }
};

// 内部action creators
const loginSuccess = (username, groups, groupsIds) => ({
  type: types.LOGIN,
  username,
  groups,
  groupsIds
});

const logoutSuccess = () => ({
  type: types.LOGOUT
});

// 登录成功后, 扁平化处理
const convertLoginInfoToPlain = (data) => {
  const name = data.userInfo.name;
  const groupList = data.groupList;
  let groupsById = {};
  let groupsIds = [];
  groupList.forEach((item) => {
    groupsById[item.group_id] = {...item};
    groupsIds.push(item.group_id);
  });
  return {
    username: name,
    groups: groupsById,
    groupsIds
  }
};


// reducers
export default (state = defaultState, action) => {
  switch (action.type) {
    case usersTypes.FETCH_USER_INFO: // 获取用户信息
    case types.LOGIN: // 登录
      return state.merge({username: action.username});
    case types.LOGOUT: // 登出
      return state.merge(defaultState);
    default:
      return state;
  }
};

// selectors
export const getLoggedUser = (state) => state.get('auth');

/**
 * auth: {
 *   username: null // 当前登录的用户名
 * }
 * */