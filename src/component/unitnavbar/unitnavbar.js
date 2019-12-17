import React, {Fragment} from 'react';
import {withRouter} from 'react-router-dom';

// context全局
import {GroupParamsContext} from '../../context/group-params-context';

// antd
import {Button, Icon, Radio} from 'antd';

// styled-components
import {ButtonLayout, SearchBar, SearchBox, SearchLayout, TitleLayout} from './style';
import {getRouteParams} from "../../utils/utils";

@withRouter
class Unitnavbar extends React.Component {
  render() {
    // console.log('[Unitnavbar]', this.props.data);
    const data = this.props.data;
    const pathname = this.props.location.pathname;
    const {text, value} = data.filter((v) => v.path === pathname)[0];
    // console.log('[text]', text, value);
    return (
      <Fragment>
        <GroupParamsContext.Consumer>
          {
            ({group_id, rootUrl, namelist}) => (
              // 按钮
              <ButtonLayout>
                <Radio.Group
                  size='large'
                  buttonStyle='solid'
                  onChange={(v) => this.handleChange(v, {group_id, rootUrl, namelist})}
                >
                  {
                    data.map((v) => (
                      <Radio.Button value={v.value} key={v.value} checked={pathname === v.path}>
                        <Icon type={v.type}/>
                      </Radio.Button>
                    ))
                  }
                </Radio.Group>
              </ButtonLayout>
            )
          }
        </GroupParamsContext.Consumer>

        {/*标题*/}
        <TitleLayout>
          <span>{text}</span>
        </TitleLayout>


        {/*搜索框*/}
        {
          !(value === 'multiview')
            ? (
              <SearchLayout>
                <SearchBar>
                  <SearchBox>

                    <Button type='primary' icon='search' size='large'/>

                  </SearchBox>
                </SearchBar>
              </SearchLayout>
            )
            : null
        }

      </Fragment>
    )
  }

  handleChange = (v, {group_id, rootUrl, namelist}) => {
    // console.log('[unitlist value]', v.target.value, group_id, rootUrl, namelist);
    this.props.history.push(getRouteParams(rootUrl, namelist, group_id, 'unit', v.target.value));
    // 实现点击事件
  };
}

export default Unitnavbar;

/**
 * 左上角
 * */