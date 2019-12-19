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

// TODO: Table选中第一项