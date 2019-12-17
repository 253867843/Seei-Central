import React from 'react';

// 自定义组件
import Unitnavbar from '../unitnavbar/unitnavbar';

// styled-components
import {
  UnitMapLayout,
  UnitDetailsLayout,
  UnitDetailsHeaderGrid
} from './style';

class UnitMap extends React.Component {
  render() {
    const {text} = this.props;
    return (
      <UnitMapLayout>
        UnitMap
        {/*<UnitDetailsLayout>*/}
          {/*<UnitDetailsHeaderGrid>*/}

            {/*<UnitNavbar text={text}/>*/}

          {/*</UnitDetailsHeaderGrid>*/}
        {/*</UnitDetailsLayout>*/}
      </UnitMapLayout>
    );
  }
}

export default UnitMap;