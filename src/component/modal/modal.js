import React from 'react';
import ReactDOM from 'react-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {notification} from 'antd';
import {actions as appActions} from '../../redux/app.redux';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    // 根节点下创建一个div节点
    this.container = document.createElement('div');
    document.body.appendChild(this.container);
  }

  componentWillUnmount() {
    document.body.removeChild(this.container);
  }

  render() {
    const {type, message, description} = this.props;
    return ReactDOM.createPortal(
      <div>
        {
          this.openNotification(type, message, description)
        }
      </div>,
      this.container
    )
  }

  openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      duration: 2
    });
    // 错误提示框展示后, 清空error
    this.props.removeError();
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(appActions, dispatch)
  }
};

export default connect(null, mapDispatchToProps)(Modal);

/**
 * ReactDOM.createPortal(参数1, 参数2)
 * 1.参数1: React元素
 * 2.参数2: DOM元素, React元素将被挂载到这个DOM节点
 * */