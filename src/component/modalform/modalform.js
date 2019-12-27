import React from 'react';

// antd
import {Form, Modal, Row, Col, Input, Button, Icon} from 'antd';

import './style.css';

// utils
import {composeData} from '../../utils/utils';

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
    const {form} = this.createFormRef.props;
    form.validateFields((err, values) => {
      if (err) {
        console.log('[handleCreate err]', err);
        return;
      }

      // 清空表单
      form.resetFields();

      // 关闭Modal
      this.setState({visible: false});

      // 打印结果
      console.log('[values]', values);

      // {
      //    group: "1"
      //    group-description: "2"
      //    encode-domain: "23"
      //    encode-port: "3"
      //    auth: "3"
      //    encode-recvServicePort: "4"
      //    wowza-domain: "4"
      //    wowza-port: "4"
      // }
      const groups = Object.keys(values).filter((v) => (v.startsWith('group'))).map((v) => values[v]);
      const encodes = Object.keys(values).filter((v) => (v.startsWith('encode'))).map((v) => values[v]);
      const wowzas = Object.keys(values).filter((v) => (v.startsWith('wowza'))).map((v) => values[v]);

      // 数据处理
      let requestData = composeData(...groups)(...encodes)(...wowzas);
      console.log('[requestData]', requestData);

      // 回掉给unitoperator.js
      this.props.inputFormValue(requestData);
    });
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
    state = {
      expand: false
    };

    render() {
      // console.log('[GroupCreateForm]', this.props.formList);
      const buttonItemLayout = {
        wrapperCol: {span: 14, offset: 4},
      };
      return (
        <Modal
          wrapClassName='customize-modal'
          visible={this.props.visible}
          title={this.props.title}
          onOk={this.props.onCreate}
          onCancel={this.props.onCancel}
          okText={this.props.okText}
          cancelText='取消'
          width={500}
          mast={false}
        >
          <Form className='ant-advanced-search-form'>
            <Row gutter={24}>{this.getFields()}</Row>
            <Row>
              <Col span={24} style={{textAlign: 'right'}}>
                <Form.Item  {...buttonItemLayout}>
                  <Button type='primary' style={{marginLeft: 8}} onClick={this.handleReset}>清空</Button>
                  {
                    this.props.formList.length > 6
                      ? (
                        <a style={{marginLeft: 8, fontSize: 12}} onClick={this.toggle}>
                          切换<Icon type={this.state.expand ? 'up' : 'down'}/>
                        </a>
                      )
                      : null
                  }
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      )
    }

    getFields = () => {
      const defaultRecord = this.props.defaultRecord;
      const formList = this.props.formList;
      const count = this.state.expand ? 10 : 6;
      const {getFieldDecorator} = this.props.form;
      const children = [];

      const formItemLayout = {
        labelCol: {span: 12},
        wrapperCol: {span: 14},
      };

      formList.forEach((v, i) => {
        children.push(
          <Col span={8} key={v.label} style={{display: i < count ? 'block' : 'none'}}>
            <Form.Item label={v.label} {...formItemLayout}>
              {
                getFieldDecorator(v.field, {
                  rules: [{required: true, message: 'Input something!'}],
                  initialValue: defaultRecord ? defaultRecord[v.text] : null
                })(<Input placeholder='placeholder'/>)
              }
            </Form.Item>
          </Col>
        );
      });

      return children;
    };

    handleReset = () => {
      this.props.form.resetFields();
    };

    toggle = () => {
      const {expand} = this.state;
      this.setState({expand: !expand});
    };
  }
);

export default ModalForm;

/**
 * 创建弹窗, 修改encode弹窗, 修改wowza弹窗
 * */

// 测试数据 
// 211.161.196.204
// 8000
// FFj6hRxD7Xe22di5hTKQAKxtCAFSsSbf
// 12000
// 127.0.0.1
// 8087