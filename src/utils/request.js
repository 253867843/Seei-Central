import axios from 'axios';
import {push} from 'connected-react-router';
import {notification ,message} from 'antd';
import isEmpty from 'lodash/isEmpty';
import codeMessage from './codeMessage';

// connected-react-router
// with react-redux

const httpMessage = {
  401: '请求要求用户的身份认证',
  403: '无权访问当前页面',
  404: '请求的资源（网页等）不存在',
  500: '内部服务器错误'
};

/*
* dispatch: 用于跳转
* */
function getAxios(url, dispatch) {
  return axios.get(url)
    .then((response) => {
      console.log('[request.js response]', response);
      return handleResponse(response, dispatch);
    })
    .catch((error) => {
      console.log('[request.js error]', error.response);
      return handleErrorResponse(error, dispatch);
    });
}

function postAxios(url, data, dispatch) {
  return axios.post(url, data)
    .then((response) => {
      return handleResponse(response, dispatch);
    })
    .catch((error) => {
      console.log('[request.js error]', error.response);
      return handleErrorResponse(error, dispatch);
    });
}

// 200
// 业务状态码
function handleResponse(response, dispatch) {
  // >>>>>>>>>>>>>> 请求成功 <<<<<<<<<<<<<<
  if (response.data && !isEmpty(response.data.code) && !isEmpty(response.data.info)) {
    const {code, info} = response.data;
    const {type, title} = codeMessage[code] || info;

    if (!isEmpty(type)) {
      notification[type === 'tip' ? 'success' : type]({
        message: title || info.info,
        description: info.info
      });
    }

    // 路由跳转
    if (code === '-16000') {
      // 未登录
      dispatch(push('/login'));
    } else if (code === '10051') {
      // 登出成功
      dispatch(push('/login'));
    } else if (code === '10021') {
      // 修改密码成功
      dispatch(push('/login'));
    } else if (code === '-10041') {
      // 获取用户信息失败
      dispatch(push('/exception/getUserInfo'));
    }

    return {...response.data};
  } else {
    console.log('[请求验证码]', response.data);
    // 请求验证码, 返回没有code和info字段
    return {vcode: response.data};
  }
}

// 304, 401, 404, 500(非200)
// http请求状态码
function handleErrorResponse(error, dispatch) {
  // >>>>>>>>>>>>>> 请求失败 <<<<<<<<<<<<<<
  const response = error.response;
  // 请求配置发生的错误
  if (!response) {
    console.log('Error', error.message);
    message.error(error.message);
    return {error: error.message};
  }

  // http状态码和文本
  const status = response.status;
  const errorText = httpMessage[status] || response.statusText;

  notification.error({
    message: `请求错误 ${status}`,
    description: errorText
  });

  // 路由跳转, 到不同的页面
  if (status === 401) {
    dispatch(push('/loginPage'));
  } else if (status === 403) {
    dispatch(push('/exception/403'));
  } else if (status >= 404 && status < 422) {
    dispatch(push('/exception/404'));
  } else if (status >= 500 && status <= 504) {

    dispatch(push('/exception/500'));
  }

  return {error: {message: errorText}};
}

export {getAxios, postAxios};

/**
 * 对axios请求做封装
 * 1.http请求状态码
 * 2.业务状态码
 * error.response
 * 3.response >>> 200
 *   error >>> 304, 401, 404, 500
 * 4.https://www.jianshu.com/p/d6796986e2ab
 * 5.原来请求中的res.stats === 200可以删除
 *   判断error是否为空
 *
 * 6.axios响应拦截器
 *    res => 200, 请求成功 >>> 业务码处理
 *    error => 304, 401, 404, 500 http请求错误
 *
 * 7.经过处理后,
 *   handleResponse() >>> Promise.then() >>> xxx.redux.js >>>
 *   handleErrorResponse() >>> Promise.then() >>> xxx.redux.js >>>
 *   返回给xxx.redux.js请求都是走Promise.then()
 * */

// 请求失败返回
// response: {
// config: {url: "/api/v1/httpError", method: "get", headers: {…}, baseURL: "/api/v1", transformRequest: Array(1), …}
// data: {code: "-16000", data: {…}, info: {…}, msg: "登录失败"}
// headers: {connection: "close", content-length: "132", content-type: "application/json; charset=utf-8", date: "Thu, 05 Dec 2019 14:29:58 GMT", etag: "W/"84-gtFmWbeIARagHtPuLR7zH3t3djE"", …}
// request: XMLHttpRequest {readyState: 4, timeout: 10000, withCredentials: true, upload: XMLHttpRequestUpload, onreadystatechange: ƒ, …}
// status: 404
// statusText: "Not Found"
// }

// response.data: {
// code: "-10001"
// data: {}
// info: {type: "error", title: "登录失败", info: "验证码错误", note: "验证码错误", steps: "登录步骤"}
// msg: "验证码错误",
// status: true
// }