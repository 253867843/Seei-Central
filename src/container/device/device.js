import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getGroupNameList} from '../../redux';
import {actions as groupsActions} from '../../redux/groups.redux';
import isEmpty from 'lodash/isEmpty';
import {Result, Icon} from 'antd';
import DevicePage from '../../component/devicePage/devicePage';
import {actions as wstreamActions} from '../../redux/wstream.redux';
import {getRequestQuantity} from '../../redux/app.redux';
import {getSingleGroupWowzaStreamInfo} from '../../redux/';
import {ResultWrapper} from './style';

import './style.css';

class Device extends React.Component {
  render() {
    const {singleGroup, modifyGroup, fetchWowzaInfo, wowzaStreamInfo, requestQuantity} = this.props;
    return (
      <div
        style={{height: '100%'}}
        id='device'
      >
        {
          isEmpty(singleGroup)
            ?
            <ResultWrapper>
              <Result
                icon={<Icon type="usergroup-add"/>}
                title='你还没有组, 快点创建组吧'
              />
            </ResultWrapper>
            : <DevicePage
              singleGroup={singleGroup}
              onModify={modifyGroup}
              onFetchWowzaInfo={fetchWowzaInfo}
              wowzaStreamInfo={wowzaStreamInfo}
              requestQuantity={requestQuantity}
            />
        }
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    groupNameList: getGroupNameList(state), // 所有组名
    wowzaStreamInfo: getSingleGroupWowzaStreamInfo(state), // 获取指定group_id下的wowza流信息
    requestQuantity: getRequestQuantity(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(groupsActions, dispatch),
    ...bindActionCreators(wstreamActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Device);

/**
 * 执行顺序:
 * 1.mapStateToProps
 * 2.render
 * 3.componentDidMount
 * */

// TODO: 制作子路由