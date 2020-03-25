import React from 'react';
import {withRouter, Route, Redirect} from 'react-router-dom';
import GroupEncodeSidebar from '../groupEncodeSidebar/groupEncodeSidebar'; // encode详情
import GroupWowzaSidebar from '../groupWowzaSidebar/groupWowzaSidebar'; // wowza详情
import {Icon, Table} from "antd";
import {
  UnitDetailsLayout,
  UnitDetailsHeaderGrid,
  UnitDetailsHeaderUnit,
  UnitDetailsPageContent,
  ContentGrid,
  ContentDivider,
  ContentSidebar,
  GridPosition,
  MenuButton,
  BodyLayout
} from './style';
import './style.css';

@withRouter
class DevicePage extends React.Component {
  render() {
    const match = this.props.match;
    const singleGroup = this.props.singleGroup; // 普通js对象类型
    const wowzaStreamInfo = this.props.wowzaStreamInfo;
    const encodes = singleGroup.encodeDevices;
    const wowzas = singleGroup.recvStreamServices;
    const encodesWrapper = this.addComponentToArray(encodes, GroupEncodeSidebar);
    const wowzasWrapper = this.addComponentToArray(wowzas, GroupWowzaSidebar);
    const mergeData = [...encodesWrapper, ...wowzasWrapper];
    return (
      <UnitDetailsLayout>
        <UnitDetailsHeaderGrid>
          设备 > 设备列表
        </UnitDetailsHeaderGrid>
        <UnitDetailsHeaderUnit>
          添加/刷新设备
        </UnitDetailsHeaderUnit>
        <UnitDetailsPageContent>
          {/*左侧*/}
          <ContentGrid>
            <GridPosition>
              <MenuButton/>
              {/*使用Table, 展示数据*/}
              <BodyLayout id='device-page-table'>
                <Table
                  columns={this.getColumnList()}
                  dataSource={mergeData}
                  pagination={false}
                  rowKey={record => record.id}
                  // loading={requestQuantity ? true : false}
                  onRow={record => {
                    return {
                      onClick: (event) => {
                        this.props.history.push(`${match.url}/${record.id}`);
                      }
                    }
                  }}
                  style={{height: '100% !important'}}
                />
              </BodyLayout>
            </GridPosition>
          </ContentGrid>
          {/*分割线*/}
          <ContentDivider/>
          {/*右侧*/}
          <ContentSidebar>
            {
              mergeData.map((item) => {
                return (
                  <Route
                    key={item.id}
                    path={`${match.url}/${item.id}`}
                    render={() => {
                      return (
                        <item.component
                          data={singleGroup}
                          item_id={item.id}
                          onModify={this.props.onModify}
                          onFetchWowzaInfo={this.props.onFetchWowzaInfo}
                          wowzaStreamInfo={wowzaStreamInfo}
                        />
                      )
                    }}/>
                )
              })
            }
          </ContentSidebar>
          {/*默认: /home/device*/}
          {
            mergeData.length ? <Redirect from='/home/device' to={`/home/device/${mergeData[0].id}`}/> : null
          }
        </UnitDetailsPageContent>
      </UnitDetailsLayout>
    )
  }

  addComponentToArray = (array, component) => {
    return array.map((item) => {
      return {...item, component}
    });
  };

  // Table的列表头
  getColumnList = () => {
    return [
      {
        title: '类型', dataIndex: 'icon', key: 'icon',
        render: (text, record) => (
          <span>
            {
              record.recvServicePort
                ? (<Icon type='desktop'/>)
                : (<Icon type='database'/>)
            }
          </span>
        ),
      },
      {title: '域名', dataIndex: 'domain', key: 'domain'},
      {title: '端口', dataIndex: 'port', key: 'port'},
      {title: '接收wowza端的端口', dataIndex: 'recvServicePort', key: 'recvServicePort'},
      {title: '匹配状态', dataIndex: 'state', key: 'state'},
      {title: '异常信息', dataIndex: 'eMessage', key: 'eMessage',}
    ];
  }
}

export default DevicePage;