import {fromJS} from 'immutable';
// import axios from 'axios';
import {getAxios} from '../utils/request';
import {actions as appActions} from './app.redux';
import {types as authTypes} from './auth.redux';
import url from '../utils/url';

const defaultState = fromJS({
  verifyCodeImg: null,
  // verifyCodeStatus: Math.random()
});

// action types
export const types = {
  FETCH_VERIFY_CODE_IMG_SUCCESS: 'VCODE/FETCH_VERIFY_CODE_IMG_SUCCESS',
  // FETCH_VERIFY_CODE_IMG_FAIL: 'VCODE/FETCH_VERIFY_CODE_IMG_FAIL',
  // REFRESH_VERIFY_CODE_STATUS: 'VCODE/REFRESH_VERIFY_CODE_STATUS',
};

// action creators
export const actions = {
  fetchVerifyCode: () => {
    return (dispatch) => {
      dispatch(appActions.startRequest());
      // -
      // axios.get(url.getVerifyCode(), {responseType: 'blob', emulateJSON: true})
      // +
      // {responseType: 'blob', emulateJSON: true}在axios配置文件中实现
      getAxios(url.getVerifyCode(), dispatch)
        .then((data) => {
          dispatch(appActions.finishRequest());
          // -
          // console.log('[vcode.redux fetchVerifyCode]', res);
          // +
          console.log('[vcode.redux fetchVerifyCode]', data);
          // -
          // if (res.status === 200) {
          // +
          if (!data.error) {
            // 成功
            if (data.vcode) {
              convertBlobToBase64(data.vcode)
                .then((base64) => {
                  dispatch(fetchVerifyCodeSuccess(base64));
                  // dispatch(refreshVerifyCodeStatus(0));
                });
            } else {
              // 失败, 刷新随机数
              // const status = Math.random();
              // setTimeout(() => {
              //   dispatch(refreshVerifyCodeStatus(status));
              // }, 5000);
            }
          } else {
            dispatch(appActions.setError(data.error));
          }
        })
      // .catch((err) => {
      //   console.log('[fetchVerifyCode err]', err);
      // });
      // -
      // .catch((err) => {
      //   dispatch(appActions.setError(err));
      // });
    }
  }
};

// 内部creators
const fetchVerifyCodeSuccess = (url) => ({
  type: types.FETCH_VERIFY_CODE_IMG_SUCCESS,
  url
});

// const fetchVerifyCodeFail = () => ({
//   type: types.FETCH_VERIFY_CODE_IMG_FAIL
// });
//
// const refreshVerifyCodeStatus = (status) => ({
//   type: types.REFRESH_VERIFY_CODE_STATUS,
//   status
// });

const convertBlobToBase64 = async (data) => {
  // -
  // const blob = res.data;
  // +
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
      return state.merge({verifyCodeImg: action.url});
    // case types.FETCH_VERIFY_CODE_IMG_FAIL:
    // return state.merge({verifyCodeImg: });
    // case types.REFRESH_VERIFY_CODE_STATUS:
    //   return state.merge({verifyCodeStatus: action.status});
    case authTypes.LOGOUT:
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

