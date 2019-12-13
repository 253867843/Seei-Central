import React from 'react';
import {connect} from 'react-redux';
import {push} from 'connected-react-router';
import {Button, Result} from "antd";

class Page404 extends React.Component {
  render() {
    const style = {
      display: 'flex',
      height: '100vh',
      alignItems: 'center',
      justifyContent: 'center'
    };
    return (
      <div style={style}>
        <Result
          status="404"
          title="404"
          subTitle="请求的资源（网页等）不存在"
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

export default connect(null, {push})(Page404);