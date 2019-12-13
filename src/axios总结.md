## Axios封装
### 目的:
* http请求码处理(200, 304, 400, 401, 404, 500)
* 业务返回码处理(正确返回码:10001, 错误返回码: -16000)
* 更好的用户体验请求拦截 >>> 过渡条显示 >>> 响应拦截 >>> 过渡条消失



### 具体功能:
* 一.功能:
* 1.统一拦截http错误请求码
* 2.统一拦截业务错误代码
* 3.统一设置请求前缀
*   | -- 每个 http 加前缀 baseURL = /api/v1, 从配置文件 apiPrefix 中获取
* 4.配置异步请求过渡状态: 显示蓝色加载条, 表示正在请求中, 避免给用户页面假死的不好体验
*   | -- 使用 NProgress 工具库

* 二.引包:
* 1.axios: http请求工具库
* 2.NProgress: 异步请求过渡条, 在浏览器主体部分顶部显示蓝色小条
* 3.notification: Antd组件 > 处理错误响应码提示信息
* 4.routerRudux: connected-react-router实现
* 5.store: connected-react-router实现
 
### step1: axios拦截器实现
```
准备工作:
 
1.安装过渡条插件NProgress
npm install --save-dev nprogress

2.复制nprogress.js和nprogress.css, 并引入到index.html
<script src="./nprogress.js"/>
<style rel="stylesheet" href="./nprogress.css"/>

config.js(axios)
import axios from 'axios';
import apiPrefix from './apiPrefix';
import NProgress from 'nprogress';

// 配置
axios.defaults.timeout = 10000;
axios.defaults.baseURL = apiPrefix.baseURL();
axios.defaults.withCredentials = true;

// 拦截请求
axios.interceptors.request.use((config) => {
    // 启动过渡条
    NProgress.start();
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 拦截响应
axios.interceptors.response.use((config) => {
    // >>>>>>>>>>http请求码 === 200时<<<<<<<<<<
    // 关闭过渡条
    NProgress.done();
    return config;
}, (error) => {
    // >>>>>>>>>>http请求码 > 200时, 请求异常<<<<<<<<<<
    // 关闭过渡条
    NProgress.done();
    return Promise.reject(error);
});

在拦截响应阶段: 不在这里做处理而是抛给axio请求
axios.get/post()
    .then((response) => {
        // 处理http请求码 === 200时
    })
    .catch((error) => {
        // 处理http请求码 > 200时, 请求异常
    })
```

### step2: axios二次封装
```
request.js
import axios from 'axios';

function getAxios(url, dispatch) {
    return axios.get(url)
        .then((response) => {
            // http请求码 === 200, 请求正常, 处理业务返回码
            return handleResponse(response, dispatch);
        })
        .catch((error) => {
            // http请求码 > 200, 请求异常, 处理http请求码异常
            return handleErrorResponse(response, dispatch);
        })
}

function postAxios(url,data,dispatch) {
    return axios.post(url)
        .then((response) => {
            return handleResponse(response,dispatch);
        })
        .catch((error) => {
            return handleErrorResponse(response,dispatch);
        });
}

// dispatch: 上层redux传递下来, 在这里路由跳转用.

export {getAxios, postAxios};
```

### step3: http请求码处理
```
import {notification} from 'antd';
const httpMessage = {
  401: '请求要求用户的身份认证',
  403: '无权访问当前页面',
  404: '请求的资源（网页等）不存在',
  500: '内部服务器错误'
};

function handleErrorResponse(error){
    // >>>>>>>>>>>>>> 请求失败 <<<<<<<<<<<<<<
    // 通过error.response, 返回json格式的错误信息
    const response = error.response;
    // 请求配置发生的错误
    if (!response) {
        return console.log('Error', error.message);
    }

    // 获取http请求码和文本
    const status = response.status;
    const errorText = httpMessage[status] || response.statusText;

    // 展示错误信息
    notification.error({
        message: `请求错误 ${status}`,
        description: errorText
    }); 

    // 根据错误码, 跳转路由到不同界面
    // step5里实现
    // ...

    return {error: {message: errorText}}
}

http请求码: 处理完成后, 返回到调用的then(...)方法中
```

### step4: 业务返回码处理
```
function handleResponse(response){
    // >>>>>>>>>>>>>> 请求成功 <<<<<<<<<<<<<<
    if(response.data && !isEmpty(response.data.code) && !isEmpty(response.data.info)) {
        const {code, info} = response.data;
        const {type, title} = codeMessage[code] || info;

        // 展示业务状态码信息
        if(!isEmpty(type)) {
            notification[type === 'tip' ? 'success' : type]({
                message: title || info.info,
                description: info.info
            });
        }        

        // 根据业务状态码, 判断路由跳转
        // step5实现
        // ...

        return {...response.data};
    } else {
        // 请求验证码, response.data中没有code和info字段
        // 这里没想好, 测试后再来补充
        return {...response.data};
    }
}

业务状态码: 处理完成后, 返回到调用的then(...)方法中
```

### step5: 在redux中实现路由跳转
```
准备工作: 
1.使用connected-react-router实现在redux中跳转
2.安装connected-react-router
npm instatll --save-dev connected-react-router
3.配置connected-react-router, 看文档或者代码, 核心就是添加一个router的reducer

import {push} from 'connected-react-router';
function handleErrorResponse(response, dispatch) {
    ... 
    // 传入第二个参数, dispatch, 用于路由跳转
    if(status === 401) {
        dispatch(push('/loginPage'));
    }else if(status === 403){
        dispatch(push('/exception/403'));
    }else if(status >= 404 && status < 422){
        dispatch(push('/exception/404'));
    }else if(status >= 500 && status <= 504){
        dispatch(push('/exception/500'));
    }
    ...
}
 
function handleResponse(response, dispatch) {
    ...
    // 业务状态码
    if(code === -16000){
        dispatch(push('/login'));
    }else if(code === 10051) {
        dispatch(push('/login'));
    }else if(code === 10021) {
        dispatch(push('/login'));
    }
    ... 
}
```

### step6: 在redux中使用
```
例如: auth.redux.js
import {getAxios, postAxios} from '../utils/request.js';

login: ({user, password, verifyCode})=> {
    return (dispatch) => {
        postAxios(url.login(), {user, password, verifyCode}, dispatch)
            .then((response) => {
                if(!data.error && data.status){
                    const {...} = 扁平化处理;
                    dispatch(loginSuccess(...)); 
                }else {
                    dispatch(appActions.setError(data.error));
                }
            })
    }
}
```

