import React from 'react';
import {withRouter} from 'react-router-dom';

// 自定义组件

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
    // console.log('[UnitList]', this.props);
    return (
      <UnitListLayout>
        <UnitDetailsLayout>

          UnitList

          <UnitListPageContentTable>

          </UnitListPageContentTable>

          <Divider/>

          <UnitListPageContentCard>

          </UnitListPageContentCard>

        </UnitDetailsLayout>
      </UnitListLayout>
    )
  }
}

export default UnitList;