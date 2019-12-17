import React from 'react';

// antd
import {Button} from 'antd';

// styled-components
import {MarginLeftAuto} from './style';

class UnitOperator extends React.Component {
  render() {
    return (
      <MarginLeftAuto>
        <Button size='large'>添加</Button>
        <Button size='large' icon='sync'/>
      </MarginLeftAuto>
    )
  }
}

export default UnitOperator;

/**
 * 右上角
 * */