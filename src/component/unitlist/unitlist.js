import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// 自定义组件
import GridTable from '../gridtable/gridtable';
import GridCard from '../gridcard/gridcard';

// actions
import { actions as groupsActions } from '../../redux/groups.redux';

// styled-components
import {
  UnitListLayout,
  UnitDetailsLayout,
  UnitListPageContentTable,
  UnitListPageContentCard,
  Divider
} from './style';

// reselect
import makeUnitList from '../../selectors/listselector';
// -
// import makeSingleGroup from '../../selectors/groupsingleselector';

// lodash
import _ from 'lodash';


class UnitList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: {}
    };
  }

  render() {
    // console.log('[UnitList]', this.props);
    return (
      <UnitListLayout>
        <UnitDetailsLayout>

          <UnitListPageContentTable>

            <GridTable
              location={this.props.location}
              unitList={this.props.unitList}
              onClick={this.handleClick}
            />

          </UnitListPageContentTable>

          <Divider />

          <UnitListPageContentCard>

            <GridCard
              record={this.state.record}
              modifyGroupFunc={this.modifyGroupFunc}
              // singleGroup={this.props.singleGroup}
              startPushStream={this.props.startPushStream}
              finishPushStream={this.props.finishPushStream}
              unitList={this.props.unitList}
              {...this.props}
            />

          </UnitListPageContentCard>

        </UnitDetailsLayout>
      </UnitListLayout>
    )
  }

  handleClick = (record) => {
    this.setState({ record });
  };

  // 修改转发流Group
  modifyGroupFunc = (formValue) => {
    const unitList = this.props.unitList;
    const group = this.props.location.state.group;
    const encodeFieldFilterList = ['domain', 'port', 'auth', 'recvServicePort'];
    const wowzaFieldFilterList = ['domain', 'port'];

    // 如果进入的是encode, 保留的是wowza
    // 如果进入的是wowza, 保留的是encode
    let retainData = unitList.filter((v) => !(v.id === this.state.record.id));

    let filteRet = {};
    if (this.state.record.hasOwnProperty('recvServicePort')) {
      // wowza保留数据, 属性过滤
      filteRet['recvStreamServices'] = Array.of(_.pick(retainData[0], wowzaFieldFilterList));
    } else {
      // encode保留数据, 属性过滤
      filteRet['encodeDevices'] = Array.of(_.pick(retainData[0], encodeFieldFilterList));
    }

    const requestData = Object.assign({}, formValue, { group, description: '' }, filteRet);
    console.log('[requestData]', requestData);

    // 发起请求
    this.props.modifyGroup(requestData);
  }
}

const mapStateToProps = (state, props) => {
  const getUnitList = makeUnitList();
  // -
  // const getSingleGroup = makeSingleGroup();
  // console.log('[getUnitList]', getUnitList(state, props));
  return {
    unitList: getUnitList(state, props),
    // -
    // singleGroup: getSingleGroup(state, props)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(groupsActions, dispatch),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitList);

/**
 * 1.获取组信息会从wowza设备跳转到encodes
 * 2.刷新页面不会轮询获取组信息
*/