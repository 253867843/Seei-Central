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
} from './style';

import {Icon, Button} from 'antd';

class GridCard extends React.Component {
  render() {
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
            <Icon type='ellipsis' rotate={90}/>

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
              123
            </InfoLayout>
          </ScrollArea>

        </UnitDetails>
      </CardSideBar>
    )
  }
}

export default GridCard;