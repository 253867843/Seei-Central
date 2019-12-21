import React, {Fragment} from 'react';

// 弹窗
import ModelForm from '../../component/modalform/modalform';

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

import {Icon, Button, Tabs} from 'antd';

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
  render() {
    const {TabPane} = Tabs;
    const record = this.props.record;
    // console.log('[record]', record);
    const updateEncodeList = [
      {
        label: '域名',
        field: 'encode-domain'
      },
      {
        label: '端口',
        field: 'encode-port'
      },
      {
        label: 'auth',
        field: 'encode-auth'
      }, {
        label: '接收wowza端口',
        field: 'encode-recvServicePort'
      }
    ];
    const updateWowzaList = [
      {
        label: '域名',
        field: 'wowza-domain'
      },
      {
        label: '端口',
        field: 'wowza-port'
      }
    ];
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
            <Icon type='hdd'/>
            <Title>{record.domain}</Title>

            <AutoPlaceHolder/>

            <IconButton style={{width: '30px'}} onClick={() => this.modalInstance.showModal()}>
              <Icon type='setting' theme='filled'></Icon>
            </IconButton>
            <Icon type='more'/>

          </Header>

          <ModelForm
            formList={record.recvServicePort ? updateEncodeList : updateWowzaList}
            ref={(modal) => this.modalInstance = modal}
            okText={'修改'}
          />

          <Location>
            <LocationLayout>
              <Title>
                地理位置: Xietu Road, Xuhui, Xuhui District, Shanghai, 200030, China
              </Title>

              <Button style={{marginLeft: 'auto !important'}}>
                <Icon type='sync'></Icon>
              </Button>

            </LocationLayout>
          </Location>

          <ScrollArea>
            <StreamVideo>
              <StreamVideoDefaultImg>
                <img src={require('../../images/logo.png')} alt=''/>
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
                {
                  record.auth ? (
                    <Fragment>
                      <span>认证</span>
                      <div>
                        <Title>{record.auth}</Title>
                      </div>
                    </Fragment>
                  ) : null
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

              <StatusButtonLayout>
                <MarginLeftAuto>
                  <Button>离线</Button>
                </MarginLeftAuto>
              </StatusButtonLayout>
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
                        <v.component/>
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
}

export default GridCard;