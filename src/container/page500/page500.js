import React from 'react';
import {connect} from 'react-redux';
import {Result, Button} from 'antd';
import {push} from 'connected-react-router';

class Page403 extends React.Component {
  render() {
    const style = {
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center',
    };
    return (
      <div style={style}>
        <Result
          status="500"
          title="500"
          subTitle="内部服务器错误"
          extra={
            <Button
              type="primary"
              onClick={() => this.props.push('/login')}
            >
              返回首页
            </Button>
          }
        />
      </div>
    )
  }
}

export default connect(null, {push})(Page403);