import React from 'react';

// antd
import { Form, Modal, Row, Col, Input, Button, Icon, Select, Radio, Checkbox } from 'antd';

import './style.css';

// utils
import { composeData } from '../../utils/utils';

class ModalForm extends React.Component {
  state = {
    visible: false,
    isForward: false,
  };

  render() {
    return (
      <GroupCreateForm
        wrappedComponentRef={this.saveCreateFormRef}
        visible={this.state.visible}
        isForward={this.state.isForward}
        OnForward={this.handleIsForward}
        onSelectChange={this.handleSelectChange}
        onCreate={this.handleCreate}
        onCancel={this.handleCancel}
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

      // console.log('[groups]', groups);
      // console.log('[encodes]', encodes);
      // console.log('[wowzas]', wowzas);

      // 数据处理
      let requestData = composeData(...groups)(...encodes)(...wowzas);
      // console.log('[requestData]', requestData);

      // 回掉给unitoperator.js
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
    const { form } = this.createFormRef.props;
    this.setState({ isForward: e.target.checked }, () => { 
      if (e.target.checked) {
        form.setFieldsValue({ 'encode-protocol': 'mpegts'})
      }else {
        form.setFieldsValue({ 'encode-protocol': 'srt' })
        this.initForward()
      }
    })
  }

  handleSelectChange = (value) => {   
    console.log('handleSelectChange -> value', value)
    const { form } = this.createFormRef.props;
    if (value === 'srt') {
      this.setState({ isForward: false })
      this.initForward()
      form.setFieldsValue({ 'wowza-isForward': false })
    } 
    
    if (value === "mpegts") { 
      this.setState({ isForward: true })
      form.setFieldsValue({ 'wowza-isForward': true })
    }
  }

  initForward = () =>  { 
    const { form } = this.createFormRef.props;
    form.setFieldsValue({ 'wowza-forwardAddress': '' })
    form.setFieldsValue({ 'wowza-forwardPort': '' })
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

      const formItemLayout = {
        labelCol: { span: 12 },
        wrapperCol: { span: 14 },
      };

      console.log('[defaultRecord]', defaultRecord);

      formList.forEach((v, i) => {
        children.push(
          <Col span={8} key={v.label} style={{ display: i < count ? 'block' : 'none' }}>
            {
              <Form.Item label={v.label} {...formItemLayout}>
                {
                  getFieldDecorator(v.field, {
                    rules: [{
                      required: !v.isRequired && !(v.isDisabled && !this.props.isForward),
                      message: v.message
                    }],
                    // initialValue: 'srt'
                    initialValue: defaultRecord ? defaultRecord[v.text] : null
                  })(
                    this.getFormItem(v)
                  )
                }
              </Form.Item>
              /* {
              v.type === 'select'
                ? (
                  <Form.Item label={v.label} {...formItemLayout}>
                    {
                      getFieldDecorator(v.field, {
                        rules: [{ required: true, message: v.message }],
                        // initialValue: 'srt'
                        initialValue: defaultRecord ? defaultRecord[v.text] : null
                      })(
                        <Select placeholder='please select a protocol'>
                          <Option value='srt'>srt</Option>
                          <Option value='mpegts'>mpegts</Option>
                        </Select>
                      )
                    }
                  </Form.Item>
                )
                : (
                  <Form.Item label={v.label} {...formItemLayout}>
                    {
                      getFieldDecorator(v.field, {
                        rules: [{ required: true, message: v.message }],
                        initialValue: defaultRecord ? defaultRecord[v.text] : null
                      })(<Input placeholder={v.placeholder ? v.placeholder : '请输入...'} />)
                    }
                  </Form.Item>
                )
            } */}
          </Col>
        );
      });

      return children;
    };

    getFormItem = (v) => {
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
              disabled={v.isDisabled && !this.props.isForward}
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

// {"status":true,"msg":"","code":"11031","info":{"type":"tip","title":"修改组信息","info":"修改成功","note":"修改成功","steps":"修改Group步骤"},"data":{"group_id":"5e7a388dcb864e2b78a1967a","group":"g1","dState":"offline","eMessage":"","encodeDevices":[{"id":"5e7a388dcb864e2b78a1967b","domain":"123","port":123,"auth":"123","protocol":"srt","videoCodeRate":50,"state":"abnormal","eMessage":""}],"recvStreamServices":[{"id":"5e7a388dcb864e2b78a1967c","domain":"45","port":6666,"isForward":0,"forwardAddress":"4444","forwardPort":3456,"state":"abnormal","eMessage":""}]}}