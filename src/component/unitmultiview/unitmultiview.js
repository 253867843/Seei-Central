/* eslint-disable no-unused-vars */
import React from 'react';

// 自定义组件
import Unitnavbar from '../unitnavbar/unitnavbar';

// styled-components
import {
  UnitMultiViewLayout,
  MultiViewNoSelect,
  MultiViewHeader,
  MultiViewContent
} from './style';

class UnitMultiView extends React.Component {
  render() {
    const {text, hasSearch} = this.props;
    return (
      <UnitMultiViewLayout>
        UnitMultiView

        {/*<MultiViewNoSelect>*/}

          {/*<MultiViewHeader>*/}

            {/*<UnitNavbar text={text} hasSearch={hasSearch}/>*/}

          {/*</MultiViewHeader>*/}

          {/*<MultiViewContent>456</MultiViewContent>*/}

        {/*</MultiViewNoSelect>*/}

      </UnitMultiViewLayout>
    )
  }
}

export default UnitMultiView;