import React, {Fragment} from 'react';

// 自定义组件
import ModalForm from '../modalform/modalform';
import ModelDelForm from '../modeldelform/modeldelform';
import ModalMatchForm from '../modalmatchform/modalmatchform';

// antd
import {Button, Icon, Modal} from 'antd';

// styled-components
import {MarginLeftAuto} from './style';

// 全局context
import {UnitOperatorContext} from '../../context/unit-operator-context';

// utils 
import {createFormList} from '../../utils/formFieldList';

class UnitOperator extends React.Component {
  render() {
    // console.log('[UnitOperator this.props]', this.props);

    return (
      <MarginLeftAuto>

        <UnitOperatorContext.Consumer>
          {
            ({createGroup, deleteGroup, matchGroup, group, group_id, singleGroup}) => (
              <Fragment>

                <Button size='large' onClick={this.showMatchModal}>

                  匹配
                  <Icon type="link"/>

                </Button>

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

                {/*匹配弹窗*/}
                <ModalMatchForm
                  title='匹配'
                  ref={(modal) => this.modalMatchInstance = modal}
                  inputFormValue={(formValue) => {
                    // 匹配
                    console.log('[匹配组]', formValue);
                    matchGroup(formValue);
                  }}
                  group={group}
                  group_id={group_id}
                  dState={singleGroup.dState === 'offline' ? false : true}
                />

                {/*创建组弹窗*/}
                <ModalForm
                  title='添加组'
                  okText={'创建'}
                  formList={createFormList}
                  ref={(modal) => this.modalInstance = modal}
                  inputFormValue={(formValue) => {
                    // 创建组
                    console.log('[创建组]', formValue);
                    createGroup(formValue);
                  }}
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

  showMatchModal = () => {
    this.modalMatchInstance.showMatchModal();
  };

}

export default UnitOperator;

/**
 * 右上角
 * */