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

  handleClick = (record) => {
    console.log('[执行了record]', record);
    this.setState({record});
  };
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