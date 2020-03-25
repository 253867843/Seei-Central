/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';

// antd
import { Form, Modal, Row, Col, Input, Button, Icon, Select, Checkbox } from 'antd';

import './style.css';

// utils
import { composeData } from '../../utils/utils';

class ModalForm extends React.Component {
  state = {
    visible: false,
    isForward: false,
  };

  render () {
    return (
      <GroupCreateForm
        wrappedComponentRef={this.saveCreateFormRef}
        visible={this.state.visible}
        isForward={this.state.isForward}
        OnForward={this.handleIsForward}
        onSelectChange={this.handleSelectChange}
        onCreate={this.handleCreate}
        onCancel={this.handleCancel}
        setForward={this.setForward}
        {...this.props}
      />
    )
  }

  showModal = () => {
    this.setState({ visible: true });
  };

  handleCreate = () => {
    const { form } = this.createFormRef.props;
    form.validateFields((err, values) => {
    console.log('ModalForm -> handleCreate -> values', values)
      if (err) {
        // console.log('[handleCreate err]', err);
        return;
      }

      // 清空表单
      form.resetFields();

      // 关闭Modal
      this.setState({ visible: false });

      // 打印结果
      console.log('[values]', values);

      // {
      //    group: "1"
      //    group-description: "2"
      //    encode-domain: "127.0.0.1"
      //    encode-port: 8000
      //    encode-auth: "4a0abd9249451d0fdbf0e1406f5d9e6a"
      //    encode-recvServicePort: 10000
      //    encode-protocol: "mpegts"
      //    auth: "3"
      //    encode-recvServicePort: "4"
      //    wowza-domain: "4"
      //    wowza-port: "4"
      // }
      const groups = Object.keys(values).filter((v) => (v.startsWith('group'))).map((v) => values[v]);
      const encodes = Object.keys(values).filter((v) => (v.startsWith('encode'))).map((v) => values[v]);
      const wowzas = Object.keys(values).filter((v) => (v.startsWith('wowza'))).map((v) => values[v]);

      console.log('[wowzas]', wowzas)

      // 数据处理
      let requestData = composeData(...groups)(...encodes)(...wowzas);

      // 回调给unitoperator.js
      this.props.inputFormValue(requestData);
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  saveCreateFormRef = (formRef) => { // 表示GroupCreateForm实例
    this.createFormRef = formRef;
  };

  handleIsForward = (e) => { 
    this.setState({ isForward: e.target.checked })
    if (!e.target.checked) {
      this.initForward()
    }
  }

  handleSelectChange = (value) => {}

  initForward = () =>  { 
    const { form } = this.createFormRef.props;
    form.setFieldsValue({ 'wowza-forwardAddress': '' })
    form.setFieldsValue({ 'wowza-forwardPort': '' })
  }

  setForward = (val) => { 
    this.setState({isForward: val})
  }
}

const GroupCreateForm = Form.create({ name: 'group_create_form' })(
  class extends React.Component {
    state = {
      expand: false
    };

    render() {
      const buttonItemLayout = {
        wrapperCol: { span: 14, offset: 4 },
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
              <Col span={24} style={{ textAlign: 'right' }}>
                <Form.Item  {...buttonItemLayout}>
                  <Button type='primary' style={{ marginLeft: 8 }} onClick={this.handleReset}>清空</Button>
                  {
                    this.props.formList.length > 6
                      ? (
                        <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                          切换<Icon type={this.state.expand ? 'up' : 'down'} />
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
      const count = this.state.expand ? 13 : 6;
      const { getFieldDecorator } = this.props.form;
      const children = [];
      // const { Option } = Select;
      const { form } = this.props;
      let isForward = form.getFieldValue('wowza-isForward')
      console.log('extends -> getFields -> isForward', isForward)
      if (typeof isForward === undefined || isForward == null) { 
          isForward = false
      }

      const formItemLayout = {
        labelCol: { span: 12 },
        wrapperCol: { span: 14 },
      };

      formList.forEach((v, i) => {
        children.push(
          <Col span={8} key={v.label} style={{ display: i < count ? 'block' : 'none' }}>
            {
              <Form.Item label={v.label} {...formItemLayout}>
                {
                  getFieldDecorator(v.field, {
                    rules: [{
                      required: !v.isSkip && !(v.isDisabled && !isForward),
                      message: v.message
                    }],
                    valuePropName: v.type ==='checkbox'? 'checked': 'value',
                    initialValue: defaultRecord ? defaultRecord[v.text] : null
                  })(
                    this.getFormItem(v, isForward)
                  )
                }
              </Form.Item> 
             }
          </Col>
        );
      });

      return children;
    };

    getFormItem = (v, isForward) => {
      const { Option } = Select;
      let formItem;
      
      switch (v.type) { 
        case 'select':
          formItem = (
            <Select placeholder='please select a protocol' onChange={this.props.onSelectChange}>
            <Option value='srt'>srt</Option>
            <Option value='mpegts'>mpegts</Option>
          </Select>
          )
          break;
        case 'checkbox':
          formItem = (
            <Checkbox onChange={this.props.OnForward}>
            </Checkbox>
          );
          break;
        default: 
          formItem = (
            <Input
              placeholder={v.placeholder ? v.placeholder : '请输入...'}
              disabled={v.isDisabled && !isForward}
            />
          )
          // false >>> srt >>> 禁用, disabled=true
      }   
      return formItem;
     }

    handleReset = () => {
      this.props.form.resetFields();
    };

    toggle = () => {
      const { expand } = this.state;
      this.setState({ expand: !expand });
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
