import axios from 'axios';
import apiPrefix from './apiPrefix';
import NProgress from 'nprogress';
import url from './utils/url';

const pending = {};
const CancelToken = axios.CancelToken;

const getRequestIdentify = (config, isRequest = false) => {
  let url = config.url;
  if (isRequest) { // 请求拦截使用
    url = config.baseURL + config.url; // 拼接路由
  }
  return config.method === 'get'
    ? encodeURIComponent(url + JSON.stringify(config.params))
    : encodeURIComponent(url + JSON.stringify(config.data));
};

const removePending = (key, isRequest = false) => {
  if (pending[key] && isRequest) { // 请求拦截使用
    // console.log('[取消重复请求]');
    pending[key]('取消重复请求');
  }
  delete pending[key]; // 删除取消请求函数
};

/*
* 第一次:
* (1)requestData
* (2)pending[key]=undefined
* (3)不执行pending[key]('取消重复请求');
* (4)delete pending[key] >>> delete undefined;
* (5)pending[key] = c
*
* 第二次: 假设第一次请求没有完成
* (1)requestData
* (2)pending[key] = c
* (3)执行pending[key]('取消重复请求')
* (4)delete pending[key] = c;
* (5)pending[key] = c >>> 给下次判断用
* */

// 配置
axios.defaults.timeout = 60000;
axios.defaults.baseURL = apiPrefix.baseURL();
axios.defaults.withCredentials = true;

// 拦截请求
axios.interceptors.request.use((config) => {
  NProgress.start();
  // console.log('[拦截请求]', config);

  // 1.拦截重复请求
  // (1)生成请求唯一标识
  let requestData = getRequestIdentify(config, true);

  // (2)删除重复请求
  removePending(requestData, true);

  // (3)创建 取消请求对象(是为了给下次请求做判断)
  config.cancelToken = new CancelToken((c) => { // c是函数
    pending[requestData] = c;
  });

  // 2.请求验证码, 补充请求参数
  if (config.url === url.getVerifyCode()) {
    config.responseType = 'blob';
    config.emulateJSON = true;
  }
  // console.log('[请求发出前 pending]', pending);
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 拦截响应
axios.interceptors.response.use((config) => {
  NProgress.done();
  // console.log('[拦截响应]', config);
  // console.log('[拦截响应 pending]', pending);
  // 把已经完成的请求从 pending 中移除
  let requestData = getRequestIdentify(config.config);
  removePending(requestData); // 请求响应使用

  // 200
  return config;
}, (error) => {
  NProgress.done();
  // console.log('[拦截响应 出错 error]', error);
  // console.log('[拦截响应 出错 error.message]', error.response);
  // 304, 400, 401, 404, 500
  return Promise.reject(error); // 将错误往下抛
});

// data:
//   code: "-10001"
//   data: {}
//   info: {type: "error", title: "登录失败", info: "验证码错误", note: "验证码错误", steps: "登录步骤"}
//   msg: "验证码错误"

/**
 * 一.功能:
 * 1.统一拦截http错误请求码
 * 2.统一拦截业务错误代码
 * 3.统一设置请求前缀
 * | -- 每个 http 加前缀 baseURL = /api/v1, 从配置文件 apiPrefix 中获取
 * 4.配置异步请求过渡状态: 显示蓝色加载条, 表示正在请求中, 避免给用户页面假死的不好体验
 * | -- 使用 NProgress 工具库
 *
 * 二.引包:
 * 1.axios: http请求工具库
 * 2.NProgress: 异步请求过渡条, 在浏览器主体部分顶部显示蓝色小条
 * 3.notification: Antd组件 > 处理错误响应码提示信息
 * 4.routerRudux: dva/router对象, 用于路由跳转, 错误响应跳转相应页面 --- 自己改,dva --- connected-react-router实现
 * 5.store: dva中对象, 使用里面的dispatch对象, 用于触发路由跳转 --- 自己改,dva --- connected-react-router实现
 * * */

/**
 * 拦截重复请求:
 * 1.使用请求路径+请求参数的方式, 避免相同请求路径, 不同请求参数情况下的拦截错误.
 * 2.isReuest: 请求拦截器中 config.url = '/users/userInfo', 响应拦截器中 config.url = '/api/v1/users/userInfo'，所以加上一个标识来计算请求的全路径
 * */


// then表示http请求正确, 业务码(正确错误)
// catch表示http请求错误

// axios：取消请求的使用案例分析:
// https://github.com/ohhoney1/notes/issues/3