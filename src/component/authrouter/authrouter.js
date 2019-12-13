import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
// import {loadData} from '../../redux/user.redux';
import {actions as usersAction} from '../../redux/users.redux.js';

@withRouter
class AuthRouter extends React.Component {

  componentDidMount() {
    // 根据用户信息获取来判断, 用户是否登录
    console.log('[认证路由]', this.props.location.pathname);
    const publicPath = ['/', '/login', '/exception/403', '/exception/404', '/exception/500', '/exception/getUserInfo'];
    if (publicPath.findIndex((name) =>
      Object.is(name, this.props.location.pathname)
    ) > -1) {
      return null;
    }

    // console.log('[authRouter.js/fetchUserInfo]');
    // 获取当前用户信息
    this.props.fetchUserInfo();

    // axios.post('/users/userInfo') // 真实接口
    // // axios.get('/users/userInfo.json')
    //   .then(res => {
    //     // console.log('[AuthRouter res]', res);
    //     if (res.status === 200) {
    //       if (res.data.status) {
    //         // 获取用户信息成功
    //         // console.log('获取用户信息成功');
    //         this.props.loadData(res.data);
    //       } else {
    //         // 获取用户信息失败, 跳转到登录界面
    //         // console.log('获取用户信息失败, 跳转到登录界面');
    //         this.props.history.push('/login');
    //       }
    //     }
    //   })
    //   .catch(err => {
    //     console.log('[AuthRouter err]', err);
    //   });
  }

  render() {
    return null;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(usersAction, dispatch),
  };
};

export default connect(null, mapDispatchToProps)(AuthRouter);