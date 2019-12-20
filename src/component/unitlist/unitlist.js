import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Route} from 'react-router-dom';

// 自定义组件
import GridTable from '../gridtable/gridtable';
import GridCard from '../gridcard/gridcard';

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

          <Divider/>

          <UnitListPageContentCard>

            <GridCard record={this.state.record}/>

          </UnitListPageContentCard>

        </UnitDetailsLayout>
      </UnitListLayout>
    )
  }

  componentDidMount() {
    // console.log('[componentDidMount]', this.state.record);
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // console.log('[shouldComponentUpdate]', this.state.record);
    // 如果unitList变化了且this.state.record === {}, 表示第一次加载, 就更新record, 否则就不更新
    if (this.props.unitList.length !== nextProps.unitList.length && !Object.keys(this.state.record).length) {
      // console.log('[设置初始的record]', nextProps.unitList[0]);
      this.setState({record: nextProps.unitList[0]});
    }
    return true;
  }

  handleClick = (record) => {
    this.setState({record});
  };

  componentWillUnmount() {
    // console.log('[componentWillUnmount]');
  }
}

const mapStateToProps = (state, props) => {
  const getUnitList = makeUnitList();
  return {
    unitList: getUnitList(state, props)
  }
};

const mapDispatchToProps = (dispatch) => {
  return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitList);

// TODO: 切换select组时, 如果当前是 /homev2/unit/list, 只会触发shouldComponentUpdate, 不会触发componentWillUnmount
//    切换list >>> multiview/upload/map时, 会触发componentWillUnmount, 不会触发shouldComponentUpdate
//    如何修复这个bug

// 登录
// [componentDidMount]
// [shouldComponentUpdate]

// 刷新
// [componentDidMount]
// [shouldComponentUpdate]

// 一级路由切换
// [shouldComponentUpdate]

// 二级路由切换
// [componentWillUnmount]

//