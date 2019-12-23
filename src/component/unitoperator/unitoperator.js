import React, {Fragment} from 'react';

// 自定义组件
import ModalForm from '../modalform/modalform';
import ModelDelForm from '../modeldelform/modeldelform';

// antd
import {Button, Icon, Modal} from 'antd';

// styled-components
import {MarginLeftAuto} from './style';

// 全局context
import {UnitOperatorContext} from '../../context/unit-operator-context';

class UnitOperator extends React.Component {
  render() {
    // console.log('[this.props]', this.props);
    const createFormList = [
      {
        label: '组名',
        field: 'group'
      },
      {
        label: '描述',
        field: 'group-description'
      },
      {
        label: '编码器域名',
        field: 'encode-domain'
      },
      {
        label: '编码器端口',
        field: 'encode-port'
      },
      {
        label: 'auth',
        field: 'encode-auth'
      },
      {
        label: '接收wowza端口',
        field: 'encode-recvServicePort'
      },
      {
        label: 'wowza域名',
        field: 'wowza-domain'
      },
      {
        label: 'wowza端口',
        field: 'wowza-port'
      },
    ];
    return (
      <MarginLeftAuto>

        <UnitOperatorContext.Consumer>
          {
            ({createGroup, deleteGroup, group, group_id}) => (
              <Fragment>
                <Button size='large' onClick={this.showModal}>

                  添加组
                  <Icon type="usergroup-add"/>

                </Button>

                <Button size='large' onClick={this.deleteGroup}>

                  删除组
                  <Icon type="usergroup-delete"/>

                </Button>

                <Button size='large' icon='sync'
                        onClick={() => window.location.href = window.location.href}
                />

                {/*创建组弹窗*/}
                <ModalForm
                  title='添加组'
                  formList={createFormList}
                  inputFormValue={(formValue) => {
                    // 创建组
                    console.log('[创建组]', formValue);
                    createGroup(formValue);
                  }}
                  ref={(modal) => this.modalInstance = modal}
                  okText={'创建'}
                />

                {/*删除组弹窗*/}
                <ModelDelForm
                  onDeleteGroup={() => {
                    // 删除组
                    deleteGroup({group_id, group});
                  }}
                  group={group}
                  ref={(modal) => this.delModalInstance = modal}
                />
              </Fragment>
            )
          }

        </UnitOperatorContext.Consumer>
      </MarginLeftAuto>
    )
  }

  showModal = () => {
    this.modalInstance.showModal();
  };

  deleteGroup = () => {
    this.delModalInstance.showDelModal();
  };

}

export default UnitOperator;

/**
 * 右上角
 * */