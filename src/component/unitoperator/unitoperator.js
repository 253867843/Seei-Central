import React from 'react';

// 自定义组件
import ModalForm from '../modalform/modalform';

// antd
import {Button} from 'antd';

// styled-components
import {MarginLeftAuto} from './style';

class UnitOperator extends React.Component {
  render() {
    console.log('[this.props]', this.props);
    return (
      <MarginLeftAuto>
        <Button size='large' onClick={this.showModal}>添加</Button>
        <Button size='large' icon='sync' onClick={() => window.location.href = window.location.href}/>
        <ModalForm
          test='传递内容'
          title='添加组'
          execAction={this.props.createGroup}
          ref={(modal) => this.modalInstance = modal}
        />
      </MarginLeftAuto>
    )
  }

  showModal = () => {
    this.modalInstance.showModal();
  };
}

export default UnitOperator;

/**
 * 右上角
 * */

// 创建组/修改组都需要用到