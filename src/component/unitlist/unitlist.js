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

@withRouter
class UnitList extends React.Component {
  render() {
    console.log('[UnitList]', this.props);
    return (
      <UnitListLayout>
        <UnitDetailsLayout>

          <UnitListPageContentTable>

            <GridTable location={this.props.location}/>

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