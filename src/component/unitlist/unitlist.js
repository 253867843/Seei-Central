import React from 'react';

// antd
import {Radio, Icon} from 'antd';

// styled-components
import {
  UnitListLayout,
  UnitDetailsLayout,
  UnitDetailsHeaderGrid,
  ButtonLayout,
  TitleLayout,
  SearchLayout
} from './style';

class UnitList extends React.Component {
  render() {
    return (
      <UnitListLayout>
        <UnitDetailsLayout>
          {/*左上角*/}
          <UnitDetailsHeaderGrid>
            {/*按钮*/}
            <ButtonLayout>
              <Radio.Group size='large' buttonStyle='solid' defaultValue='a'>
                <Radio.Button value='a'>
                  <Icon type='menu'/>
                </Radio.Button>
                <Radio.Button value='b'>
                  <Icon type='form'/>
                </Radio.Button>
                <Radio.Button value='c'>
                  <Icon type='upload'/>
                </Radio.Button>
                <Radio.Button value='d'>
                  <Icon type='environment' theme="filled"/>
                </Radio.Button>
              </Radio.Group>
            </ButtonLayout>
            {/*标题*/}
            <TitleLayout>
              <span>{this.props.text}</span>
            </TitleLayout>

            {/*搜索框*/}
            <SearchLayout>

            </SearchLayout>
          </UnitDetailsHeaderGrid>
        </UnitDetailsLayout>
      </UnitListLayout>
    )
  }
}

export default UnitList;