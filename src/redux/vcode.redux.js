import { fromJS } from 'immutable';
// import axios from 'axios';
import { getAxios } from '../utils/request';
import { actions as appActions } from './app.redux';
import { types as authTypes } from './auth.redux';
import url from '../utils/url';

const defaultState = fromJS({
  verifyCodeImg: null,
});

// action types
export const types = {
  FETCH_VERIFY_CODE_IMG_SUCCESS: 'VCODE/FETCH_VERIFY_CODE_IMG_SUCCESS',
};

// action creators
export const actions = {
  fetchVerifyCode: () => {
    return (dispatch) => {
      // +
      // {responseType: 'blob', emulateJSON: true}在axios配置文件中实现
      getAxios(url.getVerifyCode(), dispatch)
        .then((data) => {
          if (!data.error) {
            // 获取验证码成功
            if (data.vcode) {
              convertBlobToBase64(data.vcode)
                .then((base64) => {
                  dispatch(fetchVerifyCodeSuccess(base64));
                });
            } else {
              // 获取验证码失败
            }
          } else {
            dispatch(appActions.setError(data.error));
          }
        })
    }
  }
};

// 内部creators
const fetchVerifyCodeSuccess = (url) => ({
  type: types.FETCH_VERIFY_CODE_IMG_SUCCESS,
  url
});

const convertBlobToBase64 = async (data) => {
  const blob = data;
  const base64 = await blobToBase64(blob);
  return base64;
};

const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      resolve(e.target.result);
    };
    // console.log('[blobToBase64]', blob);
    fileReader.readAsDataURL(blob);
    // readAsDataURL
    fileReader.onerror = () => {
      reject(new Error('文件流异常'));
    };
  });
};

// reducers
export default (state = defaultState, action) => {
  switch (action.type) {
    case types.FETCH_VERIFY_CODE_IMG_SUCCESS:
      return state.merge({ verifyCodeImg: action.url });
    case authTypes.LOGOUT:
    case authTypes.MODIFY_PASSWORD:
      return state.merge(defaultState); // 清空数据
    default:
      return state;
  }
}

// selectors
export const getVerifyCodeImg = (state) => state.getIn(['vcode', 'verifyCodeImg']);
export const getVerifyCodeStatus = (state) => state.getIn(['vcode', 'verifyCodeStatus']);

/**
 * 属于哪种数据结构: 没有id, 当作应用状态数据处理
 * */

