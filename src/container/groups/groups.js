import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
  actions as groupsActions,
  getGroupMatchStatus,
  getGroupStreamStatus,
  getGroupById
} from '../../redux/groups.redux';
import {getGroupListByGroupId} from '../../redux';
import {Icon, Button} from 'antd';
import {
  MainLayout,
  Header,
  Header_Divider,
  Header_Hidden,
  Content_Group_Info,
  Content_Group_Divider,
  Content_Group_Match,
  Content_Sidebar,
  GroupsDetail,
  GroupsDetailHeader,
  GroupDetailInfo,
  GroupDetailInfoLayout,
  GroupDetailMatch,
  GroupDetailMatchLayout,
  ButtonMatch
} from './style';
import Immutable from 'immutable';

class Groups extends React.Component {
  state = {
    disabled: false
  };

  render() {
    const {completeGroup, groupMatchStatus, groupStreamStatus = false} = this.props;
    const rawCompleteGroup = completeGroup.toJS();
    // console.log('[Groups rawCompleteGroup]', rawCompleteGroup, Object.keys(rawCompleteGroup).length);
    const fieldsObj = ['group_id', 'group', 'description', 'dState', 'status', 'eMessage'];
    const fieldsArray = ['encodeDevices', 'recvStreamServices'];
    let groupInfoArray = {};
    if (!Object.keys(rawCompleteGroup).length) {
      fieldsObj.forEach((item) => {
        groupInfoArray[item] = undefined;
      });
      fieldsArray.forEach((item) => {
        groupInfoArray[item] = [];
      });
    } else {
      groupInfoArray = rawCompleteGroup;
    }
    // const test = 'false';
    // console.log('[groupStreamStatus]', groupStreamStatus);
    return (
      <MainLayout>
        <Header>
          {/*Area 1*/}
        </Header>
        <Header_Divider/>
        <Header_Hidden>
          {/*Area 3*/}
        </Header_Hidden>
        {/*Area 4*/}
        <Content_Group_Info>
          <Content_Sidebar>
            <GroupsDetail>
              {/*标题*/}
              <GroupsDetailHeader>
                <Icon type="usergroup-add"/>
                <span className='title'>Group详细信息</span>
              </GroupsDetailHeader>
              <GroupDetailInfo>
                <GroupDetailInfoLayout>
                  <span>group_id</span>
                  <div>{groupInfoArray.group_id ? groupInfoArray.group_id : 'null'}</div>
                  <span>group</span>
                  <div>{groupInfoArray.group ? groupInfoArray.group : 'null'}</div>
                  <span>description</span>
                  <div>{groupInfoArray.description ? groupInfoArray.description : 'null'}</div>
                  <span>dState</span>
                  <div>{groupInfoArray.dState ? groupInfoArray.dState : 'offline'}</div>
                  <span>status</span>
                  <div>{groupInfoArray.status === true ? 'true' : 'false'}</div>
                  <span>eMessage</span>
                  <div>{groupInfoArray.eMessage ? groupInfoArray.eMessage : 'null'}</div>
                </GroupDetailInfoLayout>
              </GroupDetailInfo>
              <GroupDetailMatch>
                <GroupDetailMatchLayout>
                  <span>Group匹配状态</span>
                  <div>{groupInfoArray.dState ? groupInfoArray.dState : 'null'}</div>
                  <span>Encode匹配状态</span>
                  <div>{groupInfoArray.encodeDevices.length ? groupInfoArray.encodeDevices[0].state : 'null'}</div>
                  <span>Wowza匹配状态</span>
                  <div>{groupInfoArray.recvStreamServices.length ? groupInfoArray.recvStreamServices[0].state : 'null'}</div>
                  <span>推流状态</span>
                  <div>{groupStreamStatus === true ? 'true' : 'false'}</div>
                </GroupDetailMatchLayout>
                <ButtonMatch>
                  <Button
                    type='primary'
                    style={{marginLeft: 'auto !important'}}
                    onClick={this.groupMatch}
                    disabled={!(groupInfoArray.group_id && groupInfoArray.group)}
                  >
                    开始匹配
                  </Button>
                  <Button
                    type='primary'
                    style={{marginLeft: 15}}
                    disabled={
                      !groupInfoArray.group_id
                      || !groupInfoArray.group
                      || !groupInfoArray.encodeDevices.length
                      || !groupInfoArray.recvStreamServices.length
                      // || Object.is(groupStreamStatus, undefined)
                      || !(Object.is(groupMatchStatus, 'ready')
                      )}
                    onClick={this.pushStream}
                  >
                    {groupStreamStatus === true ? '停止推流' : '开始推流'}
                  </Button>
                  {/*<Button>停止推流</Button>*/}
                </ButtonMatch>
              </GroupDetailMatch>
            </GroupsDetail>
          </Content_Sidebar>
        </Content_Group_Info>
        <Content_Group_Divider/>
        <Content_Group_Match>
          {/*Area 6*/}
        </Content_Group_Match>
      </MainLayout>
    )
  }

  // 匹配转发流Group
  groupMatch = () => {
    const {group, group_id} = this.props.completeGroup.toJS();
    this.props.matchGroup({group, group_id});
  };

  // 开始推流
  pushStream = () => {
    // console.log('[开始推流]', group, '***', group_id, '***', encodeDevices[0].id, '***', recvStreamServices[0].id);
    const {group, group_id, encodeDevices, recvStreamServices} = this.props.completeGroup.toJS();
    const encodeDevice_id = encodeDevices[0].id;
    const recvStreamService_id = recvStreamServices[0].id;
    const {groupStreamStatus} = this.props;

    if (groupStreamStatus) {
      // 正在推流, 调用停止推流动作
      this.props.finishPushStream({group, group_id});
    } else {
      // 开始推流
      this.props.startPushStream({group, group_id, encodeDevice_id, recvStreamService_id});
    }
  }
}

const mapStateToProps = (state, props) => {
  const group_id = props.group_id;
  // console.log('[Groups.js/group_id]', group_id);
  return {
    completeGroup: group_id ? getGroupListByGroupId(state, group_id) : Immutable.fromJS({}), // 单个组完整信息
    groupMatchStatus: group_id ? getGroupMatchStatus(state, group_id) : 'offline', // 匹配状态: group_id ? getGroupMatchStatus(state, group_id) : 'offline', // 匹配状态
    groupStreamStatus: group_id ? getGroupStreamStatus(state, group_id) : false, // 推流状态
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(groupsActions, dispatch)
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Groups);