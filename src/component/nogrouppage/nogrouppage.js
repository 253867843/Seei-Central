import React from 'react';

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
import {Icon, Result} from 'antd';

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
                  />
                </NoServicesText>
              </ServicesArea>
            </PageContentGrid>
          </LocalPageContent>
        </GenericLayout>
      </NoGroupLayout>
    )
  }
}

export default NoGroupPage;