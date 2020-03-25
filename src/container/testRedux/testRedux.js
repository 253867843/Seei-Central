import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button} from 'antd';
import {actions as appActions, getRequestQuantity, getError} from '../../redux/app.redux';
import {actions as groupsActions, getGroupStreamStatus} from '../../redux/groups.redux';
import {actions as testActions} from '../../redux/test.redux';


// import NProgress from 'nprogress';

class TestRedux extends React.Component {
  render() {
    return (
      <div>
        <Button onClick={this.sendRequestSuccess01}>http正确码 + 业务成功</Button>
        <Button onClick={this.sendRequestSuccess02}>http正确码 + 业务失败</Button>
        <Button onClick={this.sendRequestFailGet403}>请求失败get403</Button>
        <Button onClick={this.sendRequestFailGet404}>请求失败get404</Button>
        <Button onClick={this.sendRequestFailGet500}>请求失败get500</Button>
        <Button onClick={this.sendRequestFailPost}>请求失败post</Button>
        {/*<Button onClick={() => NProgress.start()}>加载开始</Button>*/}
        {/*<Button onClick={() => NProgress.done()}>加载结束</Button>*/}
      </div>
    )
  }

  sendRequestSuccess01 = () => {
    this.props.getTest('/httpCorrect01');
    // getAxios('/httpCorrect01')
    //   .then((data) => {
    //     // console.log('[sendRequest res]', data.error);
    //     if (!data.error) {
    //       console.log('[没有错误]', data.error, data);
    //     } else {
    //       console.log('[有错误]', data.error);
    //       // dispatch(setError());
    //     }
    //   })
    // .catch((err) => {
    //   console.log('[sendRequest err]', err.response, err.message);
    // })
    ;
  };

  sendRequestSuccess02 = () => {
    this.props.getTest('/httpCorrect02');
    // getAxios('/httpCorrect02')
    //   .then((data) => {
    //     // console.log('[sendRequest res]', res);
    //     if (!data.error) {
    //       console.log('[没有错误]', data.error);
    //     } else {
    //       console.log('[有错误]', data.error);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log('[sendRequest err]');
    //   })
    // ;
  };

  sendRequestFailGet403 = () => {
    this.props.getTest('/httpError403');
    // getAxios('/httpError403')
    //   .then((data) => {
    //     // console.log('[sendRequest res]', res);
    //     if (!data.error) {
    //       console.log('[没有错误]', data.error);
    //     } else {
    //       console.log('[有错误]', data.error);
    //       // setError(error.message);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log('[sendRequest err]', err.response);
    //   })
    // ;
  };

  sendRequestFailGet404 = () => {
    this.props.getTest('/httpError404');
    // getAxios('/httpError404')
    //   .then((res) => {
    //     console.log('[sendRequest res]', res);
    //   })
    //   .catch((err) => {
    //     console.log('[sendRequest err]', err.response);
    //   })
    // ;
  };

  sendRequestFailGet500 = () => {
    this.props.getTest('/httpError500');
    // getAxios('/httpError500')
    //   .then((res) => {
    //     console.log('[sendRequest res]', res);
    //   })
    //   .catch((err) => {
    //     console.log('[sendRequest err]', err.response);
    //   })
    // ;
  };

  sendRequestFailPost = () => {
    this.props.postTest('/httpError');
    // postAxios('/httpError')
    //   .then((res) => {
    //     console.log('[sendRequest res]', res);
    //   })
    //   .catch((err) => {
    //     console.log('[sendRequest err]', err.response);
    //   })
    // ;
  };
}

const mapStateToProps = (state, props) => {
  // console.log('[mapStateToProps]', state);
  return {
    requestQuantity: getRequestQuantity(state),
    error: getError(state),
    streamStatus: getGroupStreamStatus(state, 'sd0abd9249451d0fdbf0e1406f5d9e6a'),
  }
};
const mapDispatchToProps = (dispatch) => ({
  ...bindActionCreators(appActions, dispatch),
  ...bindActionCreators(groupsActions, dispatch),
  ...bindActionCreators(testActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TestRedux);

/**
 * 问题: 推流后, status更新为true, 值提取时是undefined
 * */