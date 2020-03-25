/* eslint-disable no-unused-vars */
import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Route, Switch, Redirect, Link} from 'react-router-dom';

// component
import UserInfo from '../../component/userInfo/userInfo';
import FilterSideBar from '../../component/filterSideBar/filterSideBar';
import Modal from '../../component/modal/modal';
import Device from '../device/device'; // 设备Device
import Groups from '../groups/groups'; // 组信息, 暂时写在这里, 匹配使用
import Server from '../server/server'; // 服务, 暂不开通

// selector
import {actions as authActions, getLoggedUser} from '../../redux/auth.redux';
import {actions as groupsActions} from '../../redux/groups.redux';
import {actions as usersActions} from '../../redux/users.redux';
import {
  actions as uiActions,
  getDeviceStatus,
  getDeviceType,
  getSelectedItem,
  getSelectedMenuItem,
} from '../../redux/ui.redux';
import {getRedirectTo, getError, getRequestQuantity} from '../../redux/app.redux';
import {
  getGroupNameList,
  getSingleGroupBySelectedItem,
  getDetaultGroup,
  getSelectedItemToUse,
  getSelectedMenuItemToUse,
  getUseRedirectTo,
} from '../../redux';

// utils
import {setLocalStorage, removeLocalStorage} from '../../utils/utils';
import isEmpty from 'lodash/isEmpty';

// antd
import {Menu, Icon, Spin} from 'antd';

// styled-component
import {MainLayout, HeaderLogo, HeaderNavbar, PageContent, UnitContent} from './style';

class Home extends React.PureComponent {
  state = {
    current: 'device',
  };

  render() {
    const {
      user,
      groupNameList,
      deviceStatus,
      deviceType,
      setDeviceStatus,
      setDeviceType,
      clearDeviceStatus,
      clearDeviceType,
      setSelectedItem, // 设置<select>选中项
      redirectTo, // 跳转
      singleGroup,
      useSelectedItem,
      useDefaultGroup,
      useRedirectTo,
      useSelectedMenuItem,
    } = this.props;
    const rawGroupNameList = groupNameList.toJS();
    const rawUser = user.toJS();
    const rawDeviceStatus = deviceStatus.toJS();
    const rawDeviceType = deviceType.toJS();
    const rawSingleGroup = singleGroup.toJS();

    // console.log('[home.js useSelectedMenuItem]', useSelectedMenuItem);

    return (
      <MainLayout>
        {
          useRedirectTo ? <Redirect to={useRedirectTo}/> : null
        }
        {
          redirectTo ? <Redirect to={redirectTo}/> : null
        }
        <HeaderLogo>
          <img src={require("../../images/logo.png")} alt=""/>
        </HeaderLogo>
        <HeaderNavbar>
          <Menu
            mode="horizontal"
            theme='dark'
            selectedKeys={[useSelectedMenuItem]}
            onClick={this.handleClick}
          >
            <Menu.Item key="device">
              <Link to='/home/device'>
                <Icon type='appstore'/>
                设备
              </Link>
            </Menu.Item>
            <Menu.Item key='groups'>
              <Link to='/home/groups'>
                <Icon type='setting'/>
                Groups
              </Link>
            </Menu.Item>
            <Menu.Item key='server'>
              <Link to='/home/server'>
                <Icon type="cloud-server"/>
                服务
              </Link>
            </Menu.Item>
          </Menu>
          <UserInfo
            user={rawUser}
            // username={rawUsername}
            groupNameList={rawGroupNameList}
            selectedItem={useSelectedItem}
            // defaultSelectedItem={defaultSelectedItem}
            // defaultSelectedItem={defaultSelectedItemV2}
            defaultSelectedItem={useDefaultGroup}
            onSelectedItem={setSelectedItem}
            onCreateNewGroup={this.props.createGroup}
            // onRefreshGroup={this.props.fetchGroupInfo}
            onDeleteGroup={this.props.deleteGroup}
            onDeleteAllGroup={this.props.deleteAllGroup}
            onLogout={this.props.logout}
            removeLocalStorage={removeLocalStorage}
          />
        </HeaderNavbar>

        <PageContent>
          <FilterSideBar
            onSetDeviceStatus={setDeviceStatus}
            onSetDeviceType={setDeviceType}
            rawDeviceStatus={rawDeviceStatus}
            rawDeviceType={rawDeviceType}
            onClearDeviceStatus={clearDeviceStatus}
            onClearDeviceType={clearDeviceType}
          />
          <UnitContent>
            <Switch>
              <Route path='/home/device' render={() => <Device singleGroup={rawSingleGroup}/>}/>
              <Route path='/home/groups' exact render={() => <Groups group_id={useSelectedItem}/>}/>
              <Route path='/home/server' exact render={() => <Server/>}/>
            </Switch>
          </UnitContent>
        </PageContent>
      </MainLayout>
    )
  }

  // 切换标签页面
  handleClick = (e) => {
    this.props.setSelectedMenuItem(e.key);
  };

  componentDidMount() {
    // 第一次渲染
    const groupNameList = this.props.groupNameList.toJS();
    // eslint-disable-next-line array-callback-return
    groupNameList.map((item) => {
      // 请求单一组信息
      this.props.fetchGroupInfo({group: item.group, group_id: item.group_id});
    });

    // 拦截判断是否离开当前页面
    window.addEventListener('beforeunload', this.beforeunload);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('[页面更新重新请求fetchGroupInfo]', this.props.groupNameList.toJS().length, prevProps.groupNameList.size);
    // 刷新页面
    const groupNameList = this.props.groupNameList.toJS();
    if (groupNameList.length !== prevProps.groupNameList.size) {
      // eslint-disable-next-line array-callback-return
      groupNameList.map((item) => {
        this.props.fetchGroupInfo({group: item.group, group_id: item.group_id});
      });
    }
  }

  componentWillUnmount() {
    // 销毁拦截判断是否离开当前页面
    window.removeEventListener('beforeunload', this.beforeunload);
  }

  beforeunload = (e) => {
    const {selectedItem, selectedMenuItem} = this.props;
    setLocalStorage('selectedItem', selectedItem);
    setLocalStorage('selectedMenuItem', selectedMenuItem);
  };
}

const mapStateToProps = (state, props) => {
  return {
    user: getLoggedUser(state), // 登录用户名
    // username: getUserName(state), // 登录用户名, 刷新页面, 从cookie里获取
    groupNameList: getGroupNameList(state), // 所有组名
    deviceStatus: getDeviceStatus(state), // 状态过滤
    deviceType: getDeviceType(state), // 种类过滤
    redirectTo: getRedirectTo(state), // 跳转
    selectedItem: getSelectedItem(state), // group_id, 刷新, 保存到localStorage
    selectedMenuItem: getSelectedMenuItem(state), // <Menu>当前选中项, 刷新, 保存到localStorage
    singleGroup: getSingleGroupBySelectedItem(state), // 单一组信息, 基于useSelectedItem
    // defaultSelectedItem: getDetaultSelectedItem(state), // 指定默认的selectedItem, group
    // defaultSelectedItemV2: getDetaultGroup(state),
    useSelectedItem: getSelectedItemToUse(state),
    useDefaultGroup: getDetaultGroup(state),
    useSelectedMenuItem: getSelectedMenuItemToUse(state),
    useRedirectTo: getUseRedirectTo(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(usersActions, dispatch),
    ...bindActionCreators(groupsActions, dispatch),
    ...bindActionCreators(uiActions, dispatch),
    ...bindActionCreators(authActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

/**
 * 所有API都已经实现
 * 1.重新树立路由
 *  (1)分为主路由:
 *    /home/device
 *    /home/groups
 *    /home/server
 *  (2)次级路由:
 *    /home/device/:group_id
 *  (3)三级路由:
 *    /home/device/:group_id/:encodeId
 *    /home/device/:group_id/:wowzaId
 *
 * 2.规划好'redirectTo'这个字段, 该字段能够决定页面加载完成后, 跳转的默认路由
 * */

/**
 * selectedItem和selectedMenuItem
 * 1.selectedMenuItem决定了展示哪个路由界面
 * 2.selectedItem决定了展示哪个组的数据
 * 3.先进路由, 在使用selectedItem进行切换
 * 也就是说, 我们先选则进入哪个路由界面, 然后在将对应组的数据展示上去
 * 顺序:
 * (1)selectedMenuItem
 * (2)selectedItem
 *
 * 4.在使用selectedItem之前, 会调用getSelectedItemToUse(), 进行处理, 生成useSelectedItem.
 * 保存到localstorage时, 使用selectedItem.
 * 数据展示或计算时, 使用useSelectedItem.
 *
 * 5.在使用selectedMenuItem之前, 会调用getSelectedMenuItemToUse(), 进行处理, 生成useSelectedMenuItem.
 * 保存到localstorage时, 使用selectedMenuItem.
 * 制作路由时, 使用useSelectedMenuItem.
 * 登录成功后, selectedMenuItem已经被设置成'device'
 * 所以只有selectedMenuItem只有2种状态:
 * (1)登录成功/创建组/删除组:
 * (2)刷新组:
 *
 * 6.登录跳转使用, redirectTo
 *   进入页面后跳转, 使用useRedirectTo
 * */

/**
 * TODO: 决定哪些请求需要 展示成功和失败消息
 * 1.登录, 登出, 修改密码, 创建组, 修改组, 删除组, 匹配组, 开始推流, 结束推流, 删除所有组
 * */



