import React, { Fragment, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// 弹窗
import ModalForm from '../../component/modalform/modalform';

// 自定义组件
import TabInfo from '../../component/tabinfo/tabinfo';
import SPlayer from '../../component/splayer/splayer';

// utils
import { updateEncodeList, updateWowzaList } from '../../utils/formFieldList';

// reselect
import makeSingleGroup from '../../selectors/groupsingleselector';

// action creators
// import { getStreamStatus } from '../../redux/ui.redux';
import { actions as groupsActions } from '../../redux/groups.redux';

// immutable
import Immutable from 'immutable';

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
import isEmpty from 'lodash/isEmpty';

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

@withRouter
class GridCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStatus: {},
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
      {...this.props}
    />;
  }

  render() {
    const { TabPane } = Tabs;
    const record = this.props.record;
    const singleGroup = this.props.singleGroup;
    // console.log('[record]', record);
    // console.log('[singleGroup]', singleGroup);
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

          <ModalForm
            title={record.protocol ? '编码器修改' : 'S4000修改'}
            defaultRecord={record}
            formList={record.protocol ? updateEncodeList : updateWowzaList}
            ref={(modal) => this.modalInstance = modal}
            okText={'修改'}
            inputFormValue={(formValue) => {
              this.props.modifyGroupFunc(formValue);
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
              {
                this.state.currentStatus.label === 'streaming'
                  ? (
                    <SPlayer
                      posters={require(`../../images/poster.jpg`)}
                      width={'415'}
                      height={'170'}
                      url={'http://192.168.2.196:1935/live/cloud_recv_stream_v1.stream/playlist.m3u8'} // 流地址
                      eventOn={this.handleEventOn()}
                    />
                  )
                  : (
                    <StreamVideoDefaultImg>
                      <img src={require('../../images/logo.png')} alt='' />
                    </StreamVideoDefaultImg>
                  )
              }

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

  // +
  // componentWillMount() {
  //   console.log('[gridcard组件 componentWillMount]', this.props.streamStatus, this.props.singleGroup);
  //   // 如果正在推流, 执行轮询
  //   const streamStatus = this.props.streamStatus;
  //   if (streamStatus) {
  //     const { group, group_id } = this.props.singleGroup;
  //     if (!isEmpty(group) && !isEmpty(group_id)) {
  //       this.props.fetchGroupInfo({ group, group_id });
  //     }
  //   }
  // }

  // +
  startPoll = () => {
    console.log('[开始轮询 组信息]');
    const { group, group_id } = this.props.singleGroup;
    if (!isEmpty(group) && !isEmpty(group_id)) {
      this.timeout = setTimeout(() => {
        this.props.fetchGroupInfo({ group, group_id });
      }, 10000); // 间隔20s开始轮询
    }
  };

  // + 
  componentWillReceiveProps(nextProps) {
    if (!Object.is(this.props.singleGroup, nextProps.singleGroup)) {
      clearTimeout(this.timeout);

      // 你可以在这里处理你的数据
      this.setState({
        dState: nextProps.singleGroup.dState,
        status: nextProps.singleGroup.status
      });

      // if (!nextProps.isGroupInfoFetching && (nextProps.streamStatus || nextProps.singleGroup.status)) {
      if (!nextProps.isGroupInfoFetching && nextProps.singleGroup.status) {
        this.startPoll();
      }
    }
  }

  // + 
  componentWillUnmount() {
    console.log('[结束轮询 组信息]');
    clearTimeout(this.timeout);
  }

  // + 
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!Object.is(this.props.singleGroup, prevProps.singleGroup)) {
      this.setState({
        dState: this.props.singleGroup.dState,
        status: this.props.singleGroup.status
      });
    }
  }

  showUpdateModal = () => {
    this.modalInstance.showModal();
  };

  // +
  toggleButtonStatus = () => {
    const { dState, status } = this.state;
    // console.log('[dState]', dState);
    // console.log('[status]', status);
    const statusCode = {
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
    let mode = statusCode['connection'];
    // console.log('[dState, status]', dState, status);
    if (dState === 'offline') {
      // 未匹配
      mode = statusCode['offline'];
    } else if (dState === 'ready') {
      if (status) {
        // 已匹配, 正在推流
        mode = statusCode['streaming'];
      } else {
        // 已匹配, 没在推流
        mode = statusCode['ready'];
      }
    }

    return (
      <StatusButtonLayout>
        <MarginLeftAuto status={mode}>
          <Button
            type='primary'
            disabled={mode.disabled}
            onClick={this.pushFlow}
          >
            {mode.text}
          </Button>
        </MarginLeftAuto>
      </StatusButtonLayout>
    )
  };

  // + 
  pushFlow = () => {
    const { status } = this.state;
    const { group, group_id } = this.props.singleGroup;
    const [encode, wowza] = this.props.unitList;

    if (status) {
      // 正在推流, 停止推流
      this.props.finishPushStream({ group, group_id });
    } else {
      // 没在推流, 开始推流
      this.props.startPushStream({ group, group_id, encodeDevice_id: encode.id, recvStreamServices_id: wowza.id });
    }
  };
}

// +
const mapStateToProps = (state, props) => {
  // console.log('[gridcard]', state.toJS());
  const getSingleGroup = makeSingleGroup();
  return {
    singleGroup: getSingleGroup(state, props), // 当前组信息
    // streamStatus: getStreamStatus(state), // 当前推流状态(是否正在推流)
  }
};

// +
const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(groupsActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GridCard);

/**
 * 1.开始推流后修改streamStatus = true, 开始获取推流信息
 * 2.停止推流后修改streamStatus = false, 停止获取推流信息
 * 3.推流成功后, 如何获取当前的推流状态
 *
 * 4.在刷新时, componentWillMount >>> streamStatus = false, 没开启轮询
 * 5.
*/