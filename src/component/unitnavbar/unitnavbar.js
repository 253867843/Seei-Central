import React, {Fragment} from 'react';
import {withRouter} from 'react-router-dom';

// antd
import {Button, Icon, Radio} from 'antd';

// styled-components
import {ButtonLayout, SearchBar, SearchBox, SearchLayout, TitleLayout} from './style';
import {getRouteParams} from "../../utils/utils";

// utils
import apiPrefix from '../../apiPrefix';

@withRouter
class Unitnavbar extends React.Component {
  render() {
    // console.log('[Unitnavbar]', this.props);
    const data = this.props.data;
    const pathname = this.props.location.pathname;
    const {text, value} = data.filter((v) => v.path === pathname)[0];
    return (
      <Fragment>
        {/* 按钮 */}
        <ButtonLayout>
          <Radio.Group
            size='large'
            buttonStyle='solid'
            onChange={this.handleChange}
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

  handleChange = (v) => {
    const group_id = this.props.location.state.group_id;
    const rootUrl = apiPrefix.rootUrl();
    const nameList = this.props.nameList;
    console.log('[handleChange]', group_id, rootUrl, nameList);
    this.props.history.push(getRouteParams(nameList, group_id)(rootUrl, 'unit', v.target.value));
    // 实现点击事件
  };
}

export default Unitnavbar;

/**
 * 左上角
 * */