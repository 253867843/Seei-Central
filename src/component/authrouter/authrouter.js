import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
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
    // 获取当前用户信息
    this.props.fetchUserInfo();
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