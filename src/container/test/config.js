import axios from 'axios';
import apiPrefix from '../../apiPrefix';
import NProgress from 'nprogress';
import url from '../../utils/url';

axios.defaults.timeout = 10000;
axios.defaults.baseURL = apiPrefix.baseURL();
axios.defaults.withCredentials = true;

const pending = {};
const CancelToken = axios.CancelToken;

function getRequestIdentify(config, isRequest = false) {
  let url = config.url;
  if (isRequest) { // 请求拦截用
    url = config.baseURL + config.url; // 拼接路由
  }
  return config.method === 'get'
    ? encodeURIComponent(url + JSON.stringify(config.params))
    : encodeURIComponent(url + JSON.stringify(config.data))
}

function removePending(key, isRequest = false) {
  if (pending[key] && isRequest) { // 请求拦截用
    // 取消重复请求
    pending[key]('取消重复请求');
  }
  delete pending[key];
}

// 请求拦截
axios.interceptors.request.use((config) => {
  NProgress.start();

  // 拦截重复请求
  // 1.生成请求唯一标识(请求地址+请求参数+请求方法)
  let requestData = getRequestIdentify(config, true);

  // 2.删除重复请求
  removePending(requestData, true);

  // 3.创建 取消请求对象
  config.cancelToken = new CancelToken((c) => {
    // 参数 c 也是一个函数
    pending[requestData] = c;
  });

  // 当请求路径为获取验证码时, 补充请求头部信息
  if (config.url === url.getVerifyCode()) {
    config.responseType = 'blob';
    config.emulateJSON = true;
  }

  return config;
}, (error) => {
  return Promise.reject(error);
});

// 响应拦截
axios.interceptors.response.use((config) => {
  NProgress.done();
  let requestData = getRequestIdentify(config.config);
  removePending(requestData);
  return config;
}, (error) => {
  // 304, 400, 401, 404, 500请求失败
  NProgress.done();
  return Promise.reject(error);
});