import React from 'react';
import {Modal} from 'antd';
import './style.css';

class ModelDelForm extends React.Component {
  state = {
    visible: false
  };

  render() {
    return (
      <Modal
        visible={this.state.visible}
        title={`删除组`}
        wrapClassName={`customize-modal-delete-modal`}
        onOk={this.props.onDeleteGroup}
        onCancel={this.handleCancel}
        okText={`删除`}
        cancelText={`取消`}
      >
        <div style={{color: '#fff'}}>确定删除{this.props.group}组吗???</div>
      </Modal>
    )
  }

  showDelModal = () => {
    this.setState({visible: true});
  };

  handleCancel = () => {
    this.setState({visible: false});
  };
}

export default ModelDelForm;