import React from 'react';
import {Icon, Result, Spin} from 'antd';
import {ResultWrapper, SpinWrapper} from './style';

class Server extends React.Component {
  render() {
    return (
      <div style={{height: '100%'}}>
        <ResultWrapper>
          <Result
            icon={<Icon type='bulb'/>}
            // icon={{}}
            title={
              <pre>
                服务未启用<br/>
                请联系技术支持
              </pre>
            }
          />
        </ResultWrapper>
        <SpinWrapper>
          <Spin spinning={true}>
            <div style={{width: 400, height: 400, border: '1px solid red'}}>123</div>
          </Spin>
        </SpinWrapper>
      </div>
    )
  }
}

export default Server;