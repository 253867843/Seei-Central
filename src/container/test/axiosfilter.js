import React from 'react';
import {Button} from 'antd';
import axios from 'axios';
import {getAxios} from '../../utils/request';

class AxiosFilter extends React.Component {
  render() {
    return (
      <div>
        <Button onClick={this.sendRequest}>发送请求</Button>
      </div>
    )
  }

  sendRequest = () => {
    this.getVerifyCode();
    this.getVerifyCode();
    // this.getVerifyCode();
    // this.getVerifyCode();
    // this.getVerifyCode();
  };
  getVerifyCode = () => {
    getAxios('/axiosfilter', {name: 'dcj123'})
      .then((res) => {
        console.log('[AxiosFilter res]', res);
      })
    // .catch((err) => {
    //   console.log('[AxiosFilter err]', err);
    // })
    ;
  };
}

export default AxiosFilter;