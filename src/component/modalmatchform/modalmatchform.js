import React from 'react';

// styled-component
import { Form, Modal, Select, Input } from 'antd';

// css
import './style.css';

class ModalMatchForm extends React.Component {
  state = {
    visible: false
  };

  render() {
    return (
      <div>
        <GroupMatchForm
          wrappedComponentRef={this.saveMatchFormref}
          visible={this.state.visible}
          onMatch={this.handleMatch}
          onCancel={this.handleCancel}
          {...this.props}
        />
      </div>
    )
  }

  handleMatch = () => {
    const { form } = this.matchFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        console.log('[handleMatch err]', err);
        return;
      }

      // 清空表单
      form.resetFields();

      // 关闭Modal
      this.setState({ visible: false });

      // 打印结果
      console.log('[values]', values);

      // 回掉给unitoperator.js
      this.props.inputFormValue(values);
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  showMatchModal = () => {
    this.setState({ visible: true });
  };

  saveMatchFormref = (formRef) => {
    this.matchFormRef = formRef;
  }
}

const GroupMatchForm = Form.create({ name: 'group_match_form' })(
  class extends React.Component {
    render() {
      // eslint-disable-next-line no-unused-vars
      const { Option } = Select;
      const { getFieldDecorator } = this.props.form;
      const formItemLayout = {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
      };
      return (
        <Modal
          wrapClassName='customize-match-modal'
          visible={this.props.visible}
          title={this.props.title}
          onOk={this.props.onMatch}
          onCancel={this.props.onCancel}
          okText={`匹配`}
          cancelText={`取消`}
          width={500}
          mask={false}
          okButtonProps={{ disabled: this.props.dState }}
        >
          <Form>

            <Form.Item label='group' {...formItemLayout}>
              {
                getFieldDecorator('group', {
                  rules: [{ required: true, message: 'Please select your group!' }],
                  initialValue: this.props.group
                })(<Input placeholder='123' disabled={true} />)
              }
            </Form.Item>

            {/* group_id不显示 */}
            <Form.Item label='group_id' {...formItemLayout} style={{ display: 'none' }}>
              {
                getFieldDecorator('group_id', {
                  rules: [{ required: true, message: 'Please select your group_id!' }],
                  initialValue: this.props.group_id
                })(
                  <Input placeholder='123' disabled={true} />
                )
              }
            </Form.Item>

          </Form>
        </Modal>
      )
    }
  }
);


export default ModalMatchForm;