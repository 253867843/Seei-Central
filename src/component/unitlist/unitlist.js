import React from 'react';
import {withRouter} from 'react-router-dom';

// 自定义组件
import GridTable from '../gridtable/gridtable';
import GridCard from '../gridcard/gridcard';

// antd
import {Radio, Icon, Button, Table} from 'antd';

// styled-components
import {
  UnitListLayout,
  UnitDetailsLayout,
  UnitListPageContentTable,
  UnitListPageContentCard,
  Divider
} from './style';

// utils

// function TableGrid() {
//   return (
//     <div>TableGrid</div>
//   )
// }

// function CardGrid() {
//   return (
//     <div>CardGrid</div>
//   )
// }

@withRouter
class UnitList extends React.Component {
  render() {
    // console.log('[UnitList]', this.props);
    return (
      <UnitListLayout>
        <UnitDetailsLayout>

          <UnitListPageContentTable>

            <GridTable/>

          </UnitListPageContentTable>

          <Divider/>

          <UnitListPageContentCard>

            <GridCard/>

          </UnitListPageContentCard>

        </UnitDetailsLayout>
      </UnitListLayout>
    )
  }
}

export default UnitList;