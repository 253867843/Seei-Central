import React from 'react';

// 自定义组件
import ModalForm from '../modalform/modalform';

// utils
import {createFormList} from '../../utils/formFieldList';

// style.js
import {
  NoGroupLayout,
  GenericLayout,
  LocalHeaderGrid,
  LocalPageContent,
  PageContentGrid,
  ServicesArea,
  NoServicesText
} from './style';

// antd
import {Icon, Result, Button} from 'antd';

class NoGroupPage extends React.Component {
  render() {
    return (
      <NoGroupLayout>
        <GenericLayout>
          {/*标题*/}
          <LocalHeaderGrid>
            <span>没有创建组</span>
          </LocalHeaderGrid>

          {/*内容*/}
          <LocalPageContent>
            <PageContentGrid>
              <ServicesArea>
                <NoServicesText>
                  <Result
                    icon={<Icon type="usergroup-add"/>}
                    title='你还没有组, 快点创建组吧'
                    extra={
                      <Button type='primary' size='large' onClick={this.showModal}>
                        添加组
                      </Button>  
                    }
                  />
                  <ModalForm
                    title='添加组'
                    okText={`创建`}
                    formList={createFormList}
                    ref={(modal) => this.modalInstance = modal}
                    inputFormValue={(formValue) => {
                      // 创建组
                      this.props.createGroup(formValue);
                    }}
                  />  
                </NoServicesText>
              </ServicesArea>
            </PageContentGrid>
          </LocalPageContent>
        </GenericLayout>
      </NoGroupLayout>
    )
  }

  showModal = () => {
    // 弹出 添加组 弹窗
    this.modalInstance.showModal();
  };
}

export default NoGroupPage;