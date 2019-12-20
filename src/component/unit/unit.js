import React from 'react';
import {bindActionCreators} from 'redux';
import {Route} from 'react-router-dom';
import {connect} from 'react-redux';

// 自定义组件
import Unitnavbar from '../unitnavbar/unitnavbar';
import UnitOperator from '../unitoperator/unitoperator';
import UnitList from '../unitlist/unitlist';
import UnitMultiView from '../unitmultiview/unitmultiview';
import UnitFileUpload from '../unitfileupload/unitfileupload';
import UnitMap from '../unitmap/unitmap';

// actions
import {actions as groupsActions} from '../../redux/groups.redux';

// utils
import apiPrefix from '../../apiPrefix';

// styled-components
import {
  ThirdDashBoardLayout,
  UnitLayout,
  UnitNavBarHeader,
  UnitNavBarHeaderLeft,
  UnitNavBarHeaderRight,
  UnitPageContent,
} from './style';

// reselect
import makeGroupList from '../../selectors/groupselector';

class Unit extends React.Component {
  render() {
    // console.log('[Unit]', this.props.groupList);
    const rootUrl = apiPrefix.rootUrl(); // 主路由
    const secondaryUrl = apiPrefix.secondaryUrl(); // 次级路由
    // 三级路由
    const unitList = [
      {
        path: `${rootUrl}${secondaryUrl}/list`,
        text: '设备 > 设备列表',
        component: UnitList,
        value: 'list',
        type: 'menu',
        hasFilter: true,
      },
      {
        path: `${rootUrl}${secondaryUrl}/multiview`,
        text: '设备 > 多画面',
        component: UnitMultiView,
        value: 'multiview',
        type: 'form',
      },
      {
        path: `${rootUrl}${secondaryUrl}/file_upload`,
        text: '设备 > 文件上传',
        component: UnitFileUpload,
        value: 'file_upload',
        type: 'upload',
      },
      {
        path: `${rootUrl}${secondaryUrl}/map`,
        text: '设备 > 地图',
        component: UnitMap,
        value: 'map',
        type: 'environment',
        hasFilter: true
      }
    ];
    return (
      <ThirdDashBoardLayout>
        <UnitLayout>
          <UnitNavBarHeader>

            {/*导航栏*/}
            <UnitNavBarHeaderLeft>
              <Unitnavbar data={unitList} nameList={this.props.groupList}/>
            </UnitNavBarHeaderLeft>

            {/*添加设备/刷新*/}
            <UnitNavBarHeaderRight>
              <UnitOperator
                createGroup={this.props.createGroup}
              />
            </UnitNavBarHeaderRight>

          </UnitNavBarHeader>

          <UnitPageContent>
            {
              unitList.map((v) => (
                <Route
                  key={v.path}
                  path={`${v.path}`}
                  component={v.component}
                />
              ))
            }
          </UnitPageContent>

        </UnitLayout>
      </ThirdDashBoardLayout>
    )
  }
}

const mapStateToProps = (state, props) => {
  const getGroupList = makeGroupList();
  return {
    groupList: getGroupList(state, props),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(groupsActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Unit);

/**
 * 先不考虑过滤sidebar
 * */