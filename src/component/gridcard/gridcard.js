import React, { Fragment } from 'react';

// 弹窗
import ModelForm from '../../component/modalform/modalform';

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

  render() {
    const { TabPane } = Tabs;
    const record = this.props.record;
    // console.log('[record]', record);      
    // console.log('[singleGroup]', this.props.singleGroup);
    const tabList = [
      {
        key: 'global',
        icon: 'global',
        component: Global
      },
      {
        key: 'picture',
        icon: 'picture',
        component: Picture
      },
      {
        key: 'upload',
        icon: 'upload',
        component: Upload
      },
      {
        key: 'file',
        icon: 'file',
        component: File
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
            title={record.recvServicePort ? '编码器修改' : 'S2000修改'}
            defaultRecord={record}
            formList={record.recvServicePort ? updateEncodeList : updateWowzaList}
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
                        <v.component />
                      </TabDetails>
                    </TabPane>
                  ))
                }

              </Tabs>
            </InfoLayout>
          </ScrollArea>

        </UnitDetails>
      </CardSideBar>
    )
  }


  componentDidUpdate(prevProps, prevState, snapshot) {
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
    console.log('[this.state.currentStatus.label]', this.state.currentStatus.label);
    const { group, group_id } = this.props.singleGroup;
    const [encode, wowza] = this.props.unitList;
    // console.log('[group]', group);
    // console.log('[group_id]', group_id);
    // console.log('[encode]', encode.id);
    // console.log('[wowza]', wowza.id);
    if (this.state.currentStatus.label === 'ready') {
      this.setState({
        currentStatus: this.statusCode['streaming']
      });
      // 开始推流
      this.props.startPushStream({ group, group_id, encodeDevice_id: encode.id, recvStreamService_id: wowza.id });
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