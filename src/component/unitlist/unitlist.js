import React from 'react';
import {withRouter} from 'react-router-dom';
// import {GroupParamsContext} from '../../container/homev2';
import {GroupParamsContext} from '../../context/group-params-context';

// antd
import {Radio, Icon, Button} from 'antd';

// styled-components
import {
  UnitListLayout,
  UnitDetailsLayout,
  UnitDetailsHeaderGrid,
  ButtonLayout,
  TitleLayout,
  SearchLayout,
  SearchBar,
} from './style';
import {getRouteParams} from "../../utils/utils";

@withRouter
class UnitList extends React.Component {
  render() {
    return (
      <UnitListLayout>
        <UnitDetailsLayout>
          {/*左上角*/}
          <UnitDetailsHeaderGrid>

            <GroupParamsContext.Consumer>
              {
                ({group_id, rootUrl, namelist}) => (
                  // 按钮
                  <ButtonLayout>
                    <Radio.Group size='large' buttonStyle='solid' defaultValue='list'
                                 onChange={(v) => this.handleChange(v, {group_id, rootUrl, namelist})}>
                      <Radio.Button value='list'>
                        <Icon type='menu'/>
                      </Radio.Button>
                      <Radio.Button value='multiview'>
                        <Icon type='form'/>
                      </Radio.Button>
                      <Radio.Button value='file_upload'>
                        <Icon type='upload'/>
                      </Radio.Button>
                      <Radio.Button value='map'>
                        <Icon type='environment' theme="filled"/>
                      </Radio.Button>
                    </Radio.Group>
                  </ButtonLayout>
                )
              }
            </GroupParamsContext.Consumer>

            {/*标题*/}
            <TitleLayout>
              <span>{this.props.text}</span>
            </TitleLayout>

            {/*搜索框*/}
            <SearchLayout>
              <SearchBar>
                <div style={{
                  display: 'flex',
                  marginLeft: '-1px',
                  backgroundColor: 'blue'
                }}>
                  <Button type='primary' icon='search' size='large'/>
                </div>
              </SearchBar>
            </SearchLayout>
          </UnitDetailsHeaderGrid>
          <div>Unit</div>
        </UnitDetailsLayout>
      </UnitListLayout>
    )
  }

  handleChange = (v, {group_id, rootUrl, namelist}) => {
    console.log('[unitlist value]', v.target.value, group_id, rootUrl, namelist);
    this.props.history.push(getRouteParams(rootUrl, namelist, group_id, 'unit', v.target.value));
    // 实现点击事件
    // this.props.history.push(getRouteParams());
    // console.log(this.props);

  };
}

export default UnitList;