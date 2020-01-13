import { fromJS } from 'immutable';
// import axios from 'axios';
import { postAxios } from '../utils/request';
import { actions as appActions } from './app.redux';
import url from '../utils/url';

const defaultState = fromJS({});

// action types
export const types = {
  FETCH_USER_INFO: 'USERS/FETCH_USER_INFO'
};

// action creators
export const actions = {
  fetchUserInfo: () => {
    return (dispatch) => {
      postAxios(url.getUserInfo(), dispatch)
        .then((data) => {
          console.log('[users.redux fetchUserInfo]', data);
          if (!data.error) {
            if (data.status) {
              // 扁平化处理
              // 获取用户信息成功
              const { username, groups, groupsIds } = convertUserInfoToPlain(data.data);
              dispatch(fetchUserInfoSuccess(username, groups, groupsIds));
            } else {
              // 获取用户信息失败
            }
          } else {
            // http请求错误
            dispatch(appActions.setError(data.error));
          }
        }
        )
    }
  }
};

// 内部action creators
const fetchUserInfoSuccess = (username, groups, groupsIds) => ({
  type: types.FETCH_USER_INFO,
  username,
  groups,
  groupsIds
});

const convertUserInfoToPlain = (data) => {
  const { name = '' } = data.userInfo;
  const groupList = data.groupList;
  let groupsById = {};
  let groupsIds = [];
  groupList.forEach((item) => {
    groupsById[item.group_id] = { ...item };
    groupsIds.push(item.group_id);
  });
  return {
    username: name,
    groups: groupsById,
    groupsIds,
  };
};

// reducer
export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}

// selectors

/**
 * 维护用户信息
 * 1.获取用户信息 FETCH_USER_INFO, 比较特殊, 获取后, 更新数据到
 * auth.redux.js/username
 * groups.redux.js/groups
 * */