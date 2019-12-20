import React from 'react';

// antd
import {Form, Modal} from 'antd';

class ModalForm extends React.Component {
  state = {
    visible: false
  };

  render() {
    // console.log('[ModalForm]', this.props);
    return (
      <GroupCreateForm
        wrappedComponentRef={this.saveCreateFormRef}
        visible={this.state.visible}
        onCreate={this.handleCreate}
        onCancel={this.handleCancel}
        {...this.props}
      />
    )
  }

  showModal = () => {
    this.setState({visible: true});
  };

  handleCreate = () => {
    // 处理Form中的数据
    // TODO:
    const ret = {
      msg: '创建成功'
    };
    console.log('[handleCreate]', this.props);
    this.props.execAction(ret);
  };

  handleCancel = () => {
    this.setState({visible: false});
  };

  saveCreateFormRef = (formRef) => { // 表示GroupCreateForm实例
    this.createFormRef = formRef;
  };

}

const GroupCreateForm = Form.create({name: 'group_create_form'})(
  class extends React.Component {
    render() {
      return (
        <Modal
          visible={this.props.visible}
          title={this.props.title}
          onOk={this.props.onCreate}
          onCancel={this.props.onCancel}
          okText='添加'
          cancelText='取消'
          width={500}
          mast={false}
        >
          <div>
            这是弹窗内容
          </div>
        </Modal>
      )
    }
  }
);

export default ModalForm;