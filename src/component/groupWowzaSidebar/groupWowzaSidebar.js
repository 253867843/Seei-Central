import React, {Fragment} from 'react';
import {Form, Icon, Modal, Input} from 'antd';
import {
  WowzasDetails,
  Header,
  Setting,
  SettingLayout,
  RegisterContentLayout,
  RegisterArea,
  Title,
  WowzaInfo,
  WowzaInfoLayout
} from './style';

class GroupWowzaSidebar extends React.Component {
  state = {
    visible: false
  };

  render() {
    const {data, item_id, wowzaStreamInfo} = this.props;
    const wowzas = data.recvStreamServices;
    const rawWowzaStreamInfo = wowzaStreamInfo.toJS(); // 返回的是一个List, 数组
    // const rawWowzaStreamInfoObj = rawWowzaStreamInfo[0]; // 当前数组中只有1个wowza信息, 暂时先这么写
    const index = wowzas.findIndex((item) => item.id === item_id);
    let item = {};
    if (index > -1) {
      item = wowzas[index];
    }
    // console.log('[GroupWowzaSidebar rawWowzaStreamInfo]', rawWowzaStreamInfo);
    return (
      <WowzasDetails>
        {/*头部*/}
        <Header>
          <Icon type='database'/>
          <span className='title'>{item.domain}</span>
          <span className='auto'></span>
          <Icon type='setting' theme='filled' style={{marginRight: 5}} onClick={this.showModal}/>
          <Icon type='ellipsis' rotate={90} onClick={() => console.log('保留')}/>
        </Header>
        <Setting>
          <SettingLayout>
            {/*<span>id</span>*/}
            {/*<div>{item.id ? item.id : 'null'}</div>*/}
            <span>domain</span>
            <div>{item.domain ? item.domain : 'null'}</div>
            <span>port</span>
            <div>{item.port ? item.port : 'null'}</div>
            <span>state</span>
            <div>{item.state ? item.state : 'null'}</div>
            <span>eMessage</span>
            <div>{item.eMessage ? item.eMessage : '没有错误'}</div>
          </SettingLayout>
        </Setting>
        {/*修改GroupInfo*/}
        <ModifyGroupForm
          wrappedComponentRef={this.saveModifyGroupFormRef}
          visible={this.state.visible}
          onCreate={this.handleCreate}
          onCancel={this.handleCancel}
        />
        <WowzaInfo>
          <WowzaInfoLayout>
            {
              rawWowzaStreamInfo.map((item) => (
                <Fragment key={item.id}>
                  <span>bytesIn</span>
                  <div>{item.bytesIn} 字节</div>
                  <span>bytesInRate</span>
                  <div>{item.bytesInRate} 字节/秒</div>
                  <span>totalConnections</span>
                  <div>{item.totalConnections}</div>
                  <span>bytesOut</span>
                  <div>{item.bytesOut} 字节</div>
                  <span>bytesOutRate</span>
                  <div>{item.bytesOutRate} 字节/秒</div>
                </Fragment>
              ))
            }
          </WowzaInfoLayout>
        </WowzaInfo>
      </WowzasDetails>
    )
  }

  componentDidMount() {
    console.log('[GroupWowzaSidebar componentDidMount]');
    const {group, group_id, recvStreamServices} = this.props.data;
    const recvStreamServices_id = recvStreamServices[0].id;
    this.props.onFetchWowzaInfo({group, group_id, recvStreamServices_id});
  }

  // ModifyGroupForm实例
  saveModifyGroupFormRef = (formRef) => {
    this.modifyGroupFormRef = formRef;
  };

  // 显示弹窗
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
      console.log('[Receive values of form Wowza]', values);
      form.resetFields(); // 清空表单
      this.setState({visible: false}); // 隐藏弹窗
      // 发送修改Group请求
      const data = this.props.data;
      const requestData = {
        group: data.group,
        description: data.description,
        encodeDevices: [
          {
            domain: data.encodeDevices[0].domain,
            port: data.encodeDevices[0].port,
            auth: data.encodeDevices[0].auth,
            recvServicePort: data.encodeDevices[0].recvServicePort
          }
        ],
        recvStreamServices: [
          {
            domain: values.domain,
            port: values.port
          }
        ]
      };
      console.log('[GroupWowzaSidebar 修改后的数据]', requestData);

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
      const {getFieldDecorator} = this.props.form;
      const {visible, onCreate, onCancel} = this.props;
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
          title='修改wowza'
          okText='添加'
          cancelText='取消'
          onOk={onCreate}
          onCancel={onCancel}
          width={820}
          mask={false}
          className='add-group-modal-dcj'
        >
          <RegisterContentLayout>
            <RegisterArea>
              <Form layout='vertical' {...formItemLayout}>
                <Title>Wowza</Title>

                {/* 1 */}
                <Form.Item label='domain'>
                  {
                    getFieldDecorator('domain', {
                      rules: [{required: true, message: 'domain is required'}]
                    })(<Input placeholder='domain' size='large'/>)
                  }
                </Form.Item>

                {/* 2 */}
                <Form.Item label='port'>
                  {
                    getFieldDecorator('port', {
                      rules: [{required: true, message: 'port is required'}]
                    })(<Input placeholder='port' size='large'/>)
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

export default GroupWowzaSidebar;