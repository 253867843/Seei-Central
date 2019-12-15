import React from 'react';
import {Route} from 'react-router-dom';

// 自定义组件
import UnitList from '../unitlist/unitlist';

// utils
import apiPrefix from '../../apiPrefix';

// styled-components
import {ThirdDashBoardLayout} from './style';

// function UnitList() {
//   return (<h1>UnitList</h1>)
// }

function UnitMultiView() {
  return (<h1>UnitMultiView</h1>)
}

function UnitFileUpload() {
  return (<h1>UnitFileUpload</h1>)
}

function UnitMap() {
  return (<h1>UnitMap</h1>)
}

class Unit extends React.Component {
  render() {
    const rootUrl = apiPrefix.rootUrl(); // 主路由
    const secondaryUrl = apiPrefix.secondaryUrl(); // 次级路由
    // 三级路由
    const unitlist = [
      {
        path: `${rootUrl}${secondaryUrl}/list`,
        text: '设备 > 设备列表',
        component: UnitList,
        hasFilter: true,
      },
      {
        path: `${rootUrl}${secondaryUrl}/multiview`,
        text: '设备 > 多画面',
        component: UnitMultiView
      },
      {
        path: `${rootUrl}${secondaryUrl}/file_upload`,
        text: '设备 > 文件上传',
        component: UnitFileUpload
      },
      {
        path: `${rootUrl}${secondaryUrl}/map`,
        text: '设备 > 地图',
        component: UnitMap,
        hasFilter: true
      }
    ];
    return (
      <ThirdDashBoardLayout>
        {
          unitlist.map((v) => (
            <Route key={v.path} path={v.path} render={() => <v.component text={v.text}/>}/>
          ))
        }
      </ThirdDashBoardLayout>
    )
  }
}

export default Unit;

/**
 * 先不考虑过滤sidebar
 * */