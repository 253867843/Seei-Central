import React, { Fragment, Component } from 'react';

// 弹窗
import ModelForm from '../../component/modalform/modalform';

// 自定义组件
import TabInfo from '../../component/tabinfo/tabinfo';

// utils
import { updateEncodeList, updateWowzaList } from '../../utils/formFieldList';

import {
  CardSideBar,
  UnitDetails,
  Header,
  Title,
  AutoPlaceHolder,
  IconButton,
  Location,
  LocationLayout,
  ScrollArea,
  StreamVideo,
  StreamVideoDefaultImg,
  Setting,
  SettingLayout,
  StatusButtonLayout,
  MarginLeftAuto,
  InfoLayout,
  TabDetails
} from './style';

import { Icon, Button, Tabs } from 'antd';

function Global() {
  return (<div>Global</div>)
}

function Picture() {
  return (<div>Picture</div>)
}

function Upload() {
  return (<div>Upload</div>)
}

function File() {
  return (<div>File</div>)
}

class GridCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      currentStatus: {},
    };

    this.statusCode = {
      offline: {
        color: '--bg-btn-offline',
        text: '匹配异常',
        disabled: true,
        label: 'offline'
      },
      ready: {
        color: '--bg-btn-online',
        text: '推流',
        disabled: false,
        label: 'ready'
      },
      connection: {
        color: '--warning-label',
        text: '连接中...',
        disabled: false,
        label: 'connection'
      },
      streaming: {
        color: '--danger-color',
        text: '停止推流',
        disabled: false,
        label: 'streaming'
      }
    };
  }

  // 包装<TabInfo>组件
  wrappedTabInfo = (WrappedComponent, record, singleGroup) => {
    const group = singleGroup.group || '';
    const group_id = singleGroup.group_id || '';
    const recvStreamServices_id = record.id || '';
    return <WrappedComponent
      recvStreamServices_id={recvStreamServices_id}
      group={group}
      group_id={group_id}
    />;
  }

  render() {
    const { TabPane } = Tabs;
    const record = this.props.record;
    const singleGroup = this.props.singleGroup;
    // console.log('[record]', record);
    const tabList = [
      {
        key: 'info',
        icon: 'info',
        component: this.wrappedTabInfo(TabInfo, record, singleGroup)
      },
      {
        key: 'picture',
        icon: 'picture',
        component: <Picture />
      },
      {
        key: 'upload',
        icon: 'upload',
        component: <Upload />
      },
      {
        key: 'file',
        icon: 'file',
        component: <File />
      }
    ];
    return (
      <CardSideBar>
        <UnitDetails>

          <Header>
            <Icon type='hdd' />
            <Title>{record.domain}</Title>

            <AutoPlaceHolder />

            <IconButton style={{ width: '30px' }} onClick={this.showUpdateModal}>
              <Icon type='setting' theme='filled'></Icon>
            </IconButton>
            <Icon type='more' />

          </Header>

          <ModelForm
            title={record.protocol ? '编码器修改' : 'S4000修改'}
            defaultRecord={record}
            formList={record.protocol ? updateEncodeList : updateWowzaList}
            ref={(modal) => this.modalInstance = modal}
            okText={'修改'}
            inputFormValue={(formValue) => {
              this.props.modifyGroup(formValue);
            }}
          />

          <Location>
            <LocationLayout>
              <Title>
                地理位置: Xietu Road, Xuhui, Xuhui District, Shanghai, 200030, China
              </Title>

              <Button style={{ marginLeft: 'auto !important' }}>
                <Icon type='sync'></Icon>
              </Button>

            </LocationLayout>
          </Location>

          <ScrollArea>
            <StreamVideo>
              <StreamVideoDefaultImg>
                <img src={require('../../images/logo.png')} alt='' />
              </StreamVideoDefaultImg>
            </StreamVideo>

            <Setting>
              <SettingLayout>
                <span>端口</span>
                <div>
                  <Title>
                    {record.port}
                  </Title>
                </div>
                {/* 不显示auth */}
                {/* {
                  record.auth ? (
                    <Fragment>
                      <span>认证</span>
                      <div>
                        <Title>{record.auth}</Title>
                      </div>
                    </Fragment>
                  ) : null
                } */}
                {
                  record.protocol ?
                    <Fragment>
                      <span>协议</span>
                      <div>
                        <Title>{record.protocol}</Title>
                      </div>
                    </Fragment>
                    : null
                }
                {
                  record.recvServicePort ?
                    <Fragment>
                      <span>接收wowza端的端口</span>
                      <div>
                        <Title>{record.recvServicePort}</Title>
                      </div>
                    </Fragment>
                    : null
                }
                <span>状态</span>
                <div>
                  <Title>{record.state}</Title>
                </div>
                <span>异常信息</span>
                <div>
                  <Title>{record.eMessage ? record.eMessage : '无异常信息'}</Title>
                </div>
              </SettingLayout>

              {

                record.auth
                  ? (
                    this.toggleButtonStatus()
                  )
                  : null
              }

            </Setting>


            {
              !record.protocol
                ? (
                  <InfoLayout>
                    <Tabs type='card'>

                      {
                        tabList.map((v) => (
                          <TabPane
                            key={v.key}
                            tab={
                              <span>
                                <Icon type={v.icon}></Icon>
                              </span>
                            }
                          >
                            <TabDetails>
                              {v.component}
                            </TabDetails>
                          </TabPane>
                        ))
                      }

                    </Tabs>
                  </InfoLayout>
                )
                : null
            }
          </ScrollArea>

        </UnitDetails>
      </CardSideBar>
    )
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[singleGroup]', this.props.singleGroup);
    if (this.props.singleGroup !== prevProps.singleGroup) {
      const singleGroup = this.props.singleGroup;
      let ret;
      if (singleGroup.dState === 'offline') {
        ret = this.statusCode['offline'];
      } else {
        if (singleGroup.status) {
          ret = this.statusCode['streaming'];
        } else {
          ret = this.statusCode['ready'];
        }
      }

      this.setState({ currentStatus: ret });
    }
  }

  showUpdateModal = () => {
    this.modalInstance.showModal();
  };

  toggleButtonStatus = () => {
    const status = this.state.currentStatus;
    return (
      <StatusButtonLayout>
        <MarginLeftAuto status={status}>
          <Button
            type='primary'
            disabled={status.disabled}
            onClick={this.pushFlow}
            loading={this.state.loading}
          >
            {status.text}
          </Button>
        </MarginLeftAuto>
      </StatusButtonLayout>
    )
  };

  pushFlow = () => {
    const { group, group_id } = this.props.singleGroup;
    const [encode, wowza] = this.props.unitList;
    if (this.state.currentStatus.label === 'ready') {
      this.setState({
        currentStatus: this.statusCode['streaming']
      });
      // 开始推流
      // console.log('[开始推流]', group, group_id, encode.id, wowza.id);
      this.props.startPushStream({ group, group_id, encodeDevice_id: encode.id, recvStreamServices_id: wowza.id });
    } else if (this.state.currentStatus.label === 'streaming') {
      this.setState({
        currentStatus: this.statusCode['ready']
      });
      // 停止推流
      this.props.finishPushStream({ group, group_id });
    }
  };
}

export default GridCard;

/**
 * 1.开始推流后修改streamStatus = true, 开始获取推流信息
 * 2.停止推流后修改streamStatus = false, 停止获取推流信息
 * 3.
*/