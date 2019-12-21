import React from 'react';
import {Modal} from 'antd';
import {UnitOperatorContext} from '../../context/unit-operator-context';
import './style.css';

class ModelDelForm extends React.Component {
  state = {
    visible: false
  };

  render() {
    return (
      <UnitOperatorContext.Consumer>

        {
          ({group, group_id, deleteGroup}) => (<Modal
            visible={this.state.visible}
            title={`删除组`}
            wrapClassName={`customize-modal-delete-modal`}
            onOk={() => this.handleOk(group, group_id, deleteGroup)}
            onCancel={this.handleCancel}
            okText={`删除`}
            cancelText={`取消`}
          >
            <div style={{color: '#fff'}}>确定删除{group}组吗???</div>
          </Modal>)
        }

      </UnitOperatorContext.Consumer>
    )
  }

  showDelModal = () => {
    this.setState({visible: true});
  };

  handleOk = (group, group_id, deleteGroup) => {
    deleteGroup({group, group_id});
  };

  handleCancel = () => {
    this.setState({visible: false});
  };
}

export default ModelDelForm;