import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

// 使用connected-react-router插件
import {ConnectedRouter} from 'connected-react-router/immutable';
import configureStore, {history} from './configureStore';

import Home from './container/home/home';
import Login from './container/login/login';
// +
import DashBoard from './component/dashboard/dashboard';
import HomeV2 from './container/homev2/homev2';

import NotFound from './container/notfound/notFound';
import AuthRouter from './component/authrouter/authrouter';
import TestRedux from './container/testRedux/testRedux';
import RcForm from './container/rcform/rcform';
import Page403 from './container/page403/page403';
import Page404 from './container/page404/page404';
import Page500 from './container/page500/page500';
import PageUser from './container/pageuser/pageuser';
import AxiosFilter from './container/test/axiosfilter';
import './config';

// -
// 移植到./configureStore.js里
// const store = createStore(
//   reducers,
//   composeWithDevTools(
//     applyMiddleware(
//       thunk,
//       // logger
//     ),
//   )
// );

const store = configureStore();

const AppProvider = (
  <Provider store={store}>
    <Router>
      <ConnectedRouter history={history}>
        <AuthRouter/>
        <Switch>
          <Route path='/' exact component={Login}/>
          <Route path='/login' component={Login}/>
          <Route path='/home' component={Home}/>
          {/*+*/}
          {/*<Route path={['/homev2/:id/:menu', '/homev2']} component={HomeV2}/>*/}
          <Route path='/homev2/:menu' component={HomeV2}/>
          <Route path='/dashboard' component={DashBoard}/>
          <Route path='/exception/403' component={Page403}/>
          <Route path='/exception/404' component={Page404}/>
          <Route path='/exception/500' component={Page500}/>
          <Route path='/exception/getUserInfo' component={PageUser}/>
          <Route path='/test' component={TestRedux}/>
          <Route component={NotFound}/>
          {/*<Route path='/rcform' component={RcForm}/>*/}
          {/*<Route path='/axiosFilter' component={AxiosFilter}/>*/}
        </Switch>
      </ConnectedRouter>
    </Router>
  </Provider>
);
ReactDOM.render(AppProvider, document.getElementById('root'));

// +
// step3:
// import {ConnectedRouter} from 'connected-react-router/immutable';
// import configureStore, {history} from './configureStore';
//
// const store = configureStore();
//
// function LoginPage() {
//   return (
//     <h1>登录页面</h1>
//   )
// }
//
// const AppProvider = (
//   <Provider store={store}>
//     <ConnectedRouter history={history}>
//       <Switch>
//         <Route path='/test' component={TestRedux}/>
//         <Route path='/login' component={LoginPage}/>
//         <Route path='/exception/403' component={Page403}/>
//         <Route path='/exception/404' component={Page404}/>
//         <Route path='/exception/500' component={Page500}/>
//       </Switch>
//     </ConnectedRouter>
//   </Provider>
// );
//
// ReactDOM.render(
//   AppProvider,
//   document.getElementById('root')
// );

// 使用ConnectedRouter在react-router-dom上包裹一层，history属性传递
// 删除BrowserRouter的任何用法，它会导致同步状态出现问题
// 将ConnectedRouter作为 react-redux/Provider下的一个子元素
// 如果你是服务端渲染，你仍将应该在服务端使用react-router的Static Router

// "proxy": "http://zyhh123.xiaomy.net:80"

// 1.实现功能
// 2.