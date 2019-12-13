import React from 'react';
import {withRouter} from 'react-router-dom';
import SPlayer from '../splayer/splayer';
import {Icon, Form, Modal, Input} from 'antd';
import {
  EncodesDetails,
  Header,
  ScrollArea,
  VideoDiv,
  Setting,
  SettingLayout,
  RegisterContentLayout,
  RegisterArea,
  Title
} from './style';


@withRouter
class GroupEncodeSidebar extends React.Component {
  state = {
    visible: false
  };

  render() {
    const {data, item_id} = this.props;
    const encodes = data.encodeDevices; // encode数组
    const index = encodes.findIndex((item) => item.id === item_id);
    let item = {};
    if (index > -1) {
      item = encodes[index];
    }
    // console.log('[GroupEncodeSidebar data]', item);
    return (
      <EncodesDetails>
        {/*头部*/}
        <Header>
          <Icon type='desktop'/>
          <span className='title'>{item.domain}</span>
          <span className='auto'></span>
          <Icon type='setting' theme="filled" style={{marginRight: 5}} onClick={this.showModal}/>
          <Icon type='ellipsis' rotate={90} onClick={() => console.log('icon modify')}/>
        </Header>
        {/*滚动区域*/}
        <ScrollArea>
          <VideoDiv>
            <SPlayer
              posters={require(`./img/poster.jpg`)}
              width={'425'}
              height={'170'}
              // url={'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4'} // 流地址
              eventOn={this.handleEventOn()}
            />
          </VideoDiv>
          <Setting>
            <SettingLayout>
              {/*<span>id</span>*/}
              {/*<div>{item.id ? item.id : 'null'}</div>*/}
              <span>domain</span>
              <div>{item.domain ? item.domain : 'null'}</div>
              <span>port</span>
              <div>{item.port ? item.port : 'null'}</div>
              <span>auth</span>
              <div>{item.auth ? item.auth : 'null'}</div>
              <span>recvServicePort</span>
              <div>{item.recvServicePort ? item.recvServicePort : 'null'}</div>
              <span>state</span>
              <div>{item.state ? item.state : 'null'}</div>
              <span>eMessage</span>
              <div>{item.eMessage ? item.eMessage : '没有错误'}</div>
            </SettingLayout>
          </Setting>
        </ScrollArea>
        {/*修改GroupInfo*/}
        <ModifyGroupForm
          wrappedComponentRef={this.saveModifyGroupFormRef}
          visible={this.state.visible}
          onCreate={this.handleCreate}
          onCancel={this.handleCancel}
          item={item}
        />
      </EncodesDetails>
    )
  }

  handleEventOn = () => {
    return {
      play: () => {
        // console.log('[播放]');
      },
      pause: () => {
        // console.log('[暂停]');
      }
    }
  };

  // ModifyGroupForm实例
  saveModifyGroupFormRef = (formRef) => {
    this.modifyGroupFormRef = formRef;
  };

  // 弹出修改Group弹窗
  showModal = () => {
    this.setState({visible: true});
  };

  // 弹窗'添加'按钮响应
  handleCreate = () => {
    const form = this.modifyGroupFormRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('[Receive values of form 编码器]', values);
      form.resetFields(); // 清空表单
      this.setState({visible: false}); // 隐藏弹窗
      // 发送修改Group请求
      const data = this.props.data;
      let requestData = {
        group: data.group,
        description: data.description,
        encodeDevices: [
          {
            domain: values.domain,
            port: values.port,
            auth: values.auth,
            recvServicePort: values.recvServicePort
          }
        ],
        recvStreamServices: [ // 暂时先这么写
          {
            domain: data.recvStreamServices[0].domain,
            port: data.recvStreamServices[0].port
          }
        ]
      };
      this.props.onModify(requestData);
    });
  };

  // 弹窗'取消'按钮响应
  handleCancel = () => {
    this.setState({visible: false});
  };
}

const ModifyGroupForm = Form.create({name: 'modify_group_form'})(
  class extends React.Component {
    render() {
      const {visible, onCreate, onCancel, item} = this.props;
      const {getFieldDecorator} = this.props.form;
      const formItemLayout = {
        labelCol: {
          xs: {span: 24},
          sm: {span: 4, offset: 12},
        },
        wrapperCol: {
          xs: {span: 24},
          sm: {span: 8},
        },
      };
      return (
        <Modal
          visible={visible}
          title='修改编码器'
          okText='添加'
          cancelText='取消'
          onOk={onCreate}
          onCancel={onCancel}
          width={820}
          mast={false}
          className='add-group-modal-dcj'
        >
          <RegisterContentLayout>
            <RegisterArea>
              <Form layout='vertical' {...formItemLayout}>
                <Title>编码器</Title>
                <Form.Item label='domain'
                           style={{lineHeight: '40px', textAlign: 'center !important'}}>
                  {
                    getFieldDecorator('domain', {
                      rules: [{required: true, message: 'domain is required'}],
                      initialValue: item.domain || 0
                    })(<Input placeholder='domain' size='large'/>)
                  }
                </Form.Item>
                <Form.Item label='port'
                           style={{lineHeight: '40px', textAlign: 'center !important'}}>
                  {
                    getFieldDecorator('port', {
                      rules: [{required: true, message: 'port is required'}],
                      initialValue: item.port || 0
                    })(<Input placeholder='port' size='large'/>)
                  }
                </Form.Item>
                <Form.Item label='auth'
                           style={{lineHeight: '40px', textAlign: 'center !important'}}>
                  {
                    getFieldDecorator('auth', {
                      rules: [{required: true, message: 'auth is required'}],
                      initialValue: item.auth || 0
                    })(<Input placeholder='auth' size='large'/>)
                  }
                </Form.Item>
                <Form.Item label='recvServicePort'
                           style={{lineHeight: '40px', textAlign: 'center !important'}}>
                  {
                    getFieldDecorator('recvServicePort', {
                      rules: [{required: true, message: 'recvServicePort is required'}],
                      initialValue: item.recvServicePort || 0
                    })(<Input placeholder='recvServicePort' size='large'/>)
                  }
                </Form.Item>
              </Form>
            </RegisterArea>
          </RegisterContentLayout>
        </Modal>
      )
    }
  }
);

export default GroupEncodeSidebar;