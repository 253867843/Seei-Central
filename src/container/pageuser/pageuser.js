import React from 'react';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import {Button, Result} from 'antd';

class PageUser extends React.Component {
  render() {
    const style = {
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center'
    };
    // console.log('[PageUser]', this.props);
    return (
      <div style={style}>
        <Result
          status="error"
          title="获取用户信息失败"
          subTitle="获取用户信息步骤时操作数据库异常"
          extra={
            <Button onClick={() => {
              console.log('[已经通知管理员了]');
              this.props.push('/login');
            }
            }>联系管理员</Button>
          }
        />
      </div>
    )
  }
}

export default connect(null, {push})(PageUser);

/**
 * 自定义用户错误信息展示
 * */