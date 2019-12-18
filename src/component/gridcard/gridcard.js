import React from 'react';

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

class GridCard extends React.Component {
  render() {
    const {TabPane} = Tabs;
    return (
      <CardSideBar>
        <UnitDetails>

          <Header>
            <Icon type='hdd'/>
            <Title>Diadem-6170</Title>

            <AutoPlaceHolder/>

            <IconButton style={{width: '30px'}}>
              <Icon type='setting' theme='filled'></Icon>
            </IconButton>
            <Icon type='more'/>

          </Header>

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
                <span>数据桥</span>
                <div></div>
                <span>网关</span>
                <div>
                  <Title>网关</Title>
                </div>
                <span>通道</span>
                <div>
                  <Title>没有通道</Title>
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
                <TabPane tab={
                  <span>
                    <Icon type='global'></Icon>
                  </span>
                } key='1'>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <TabDetails>
                      123
                    </TabDetails>
                  </div>
                </TabPane>

                <TabPane tab={
                  <span>
                    <Icon type='picture'></Icon>
                  </span>
                } key='2'>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <TabDetails>
                      123
                    </TabDetails>
                  </div>
                </TabPane>

                <TabPane tab={
                  <span>
                      <Icon type='upload'></Icon>
                    </span>
                } key='3'>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <TabDetails>
                      123
                    </TabDetails>
                  </div>
                </TabPane>

                <TabPane tab={
                  <span>
                    <Icon type='file'></Icon>
                  </span>
                } key='4'>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <TabDetails>
                      123
                    </TabDetails>
                  </div>
                </TabPane>

              </Tabs>
            </InfoLayout>
          </ScrollArea>

        </UnitDetails>
      </CardSideBar>
    )
  }
}

export default GridCard;