import React, { Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

// actions/selector
import { getGroupNameList } from '../../redux/index';
import { getLoggedUser } from '../../redux/auth.redux';
import { actions as uiActions, getSelectedMenuItem } from '../../redux/ui.redux';
import { actions as groupActions } from '../../redux/groups.redux';
import { actions as authActions } from '../../redux/auth.redux';

// 自定义组件
import GroupSelect from '../../component/groupselect/groupselect';
import NoGroupPage from '../../component/nogrouppage/nogrouppage';
import Unit from '../../component/unit/unit';
import ContentSideBar from '../../component/contentsidebar/contentsidebar';
import Content from '../../component/content/content';

// styled-components
import {
  MainLayout,
  HeaderLogo,
  HeaderNavbar,
  PageContent,
} from './style.js';

//utils
import { setLocalStorage, getRouteParams, getLocalStorage } from '../../utils/utils';
import isEmpty from 'lodash/isEmpty';
import apiPrefix from '../../apiPrefix';

// antd
import { Icon, Menu } from 'antd';
import ColumnGroup from 'antd/lib/table/ColumnGroup';

function Files() {
  return (
    <div>Files</div>
  )
}

function Manage() {
  return (
    <div>Manage</div>
  )
}

function Service() {
  return (
    <div>Service</div>
  )
}

class HomeV2 extends React.Component {
  state = {
    group: '',
    group_id: '',
  };

  // 二级路由
  getNavBarMenu = (group_id, menu) => {
    return group_id
      ? (
        <Menu
          mode="horizontal"
          theme='dark'
          selectedKeys={[menu]}
          onClick={this.handleClick}
        >
          <Menu.Item key='unit'>
            <Icon type='appstore' />
            设备
          </Menu.Item>
          <Menu.Item key='files'>
            <Icon type='file' />
            文件
          </Menu.Item>
          <Menu.Item key='manage'>
            <Icon type='setting' />
            组
          </Menu.Item>
          <Menu.Item key='service'>
            <Icon type="cloud-server" />
            服务
          </Menu.Item>
        </Menu>
      )
      : null
  };

  /*
  * 进入二级路由/三级路由, group_id必不为空
  * */
  render() {
    // console.log('[HomeV2]', this.props);
    const { group_id } = this.props.location.state;
    const { menu } = this.props.match.params;
    const rootUrl = apiPrefix.rootUrl();
    const nameListRaw = this.props.nameList.toJS();
    const menuList = [
      {
        path: `${rootUrl}/unit`,
        component: Unit
      },
      {
        path: `${rootUrl}/files`,
        component: Files,
      },
      {
        path: `${rootUrl}/manage`,
        component: Manage
      },
      {
        path: `${rootUrl}/service`,
        component: Service
      }
    ];
    return (
      <MainLayout>

        <HeaderLogo>
          <div>
            <img src={require('../../images/logo_220.png')} alt='' />
          </div>
        </HeaderLogo>

        <HeaderNavbar>
          {/*二级菜单*/}
          {this.getNavBarMenu(group_id, menu)}

          {/*一级菜单*/}
          <GroupSelect
            {...this.props}
          />
        </HeaderNavbar>

        {/*二级路由*/}
        <PageContent>
          {
            group_id
              ? (
                <Fragment>
                  {
                    menuList.map((v) => (
                      <Route key={v.path} path={v.path} component={v.component} />
                    ))
                  }
                </Fragment>
              )
              : <NoGroupPage createGroup={this.props.createGroup} />
          }
        </PageContent>

      </MainLayout>
    )
  }

  // 切换标签页面
  handleClick = (e) => {
    const targetId = this.props.location.state.group_id;
    const nameListRaw = this.props.nameList.toJS();
    const rootUrl = apiPrefix.rootUrl();
    const redirectTo = getRouteParams(nameListRaw, targetId)(rootUrl, e.key);
    this.props.history.push(redirectTo);
    this.props.setSelectedMenuItem(e.key);
  };

  componentDidMount() {
    // console.log('[componentDidMount]');
    const { group, group_id } = this.props.location.state;
    if (!isEmpty(group) && !isEmpty(group_id)) {
      this.props.fetchGroupInfo({ group, group_id });
      // this.setState({group, group_id});
    }

    // 添加监听(浏览器关闭或刷新时)
    window.addEventListener('beforeunload', this.beforeunload);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { group_id: currentGroupId, group: currentGroup } = this.props.location.state; // 切换后id和name
    const { group_id: prevGroupId } = prevProps.location.state; // 切换前id
    console.log('[homeV2.js currentGroupId]', currentGroupId);
    console.log('[homeV2.js prevGroupId]', prevGroupId);
    console.log('[this.state.group_id]', this.state.group_id);
    console.log('[currentGroupId]', currentGroupId);
    if (currentGroupId !== prevGroupId && this.state.group_id !== currentGroupId) {
      this.props.fetchGroupInfo({ group: currentGroup, group_id: currentGroupId });
      this.setState({ group_id: currentGroupId });
    }
    /*
    * 刷新后, this.state重置.
    * 但this.props.location.state.group_id仍旧保存(使用了connected-react-router中间件)
    * */
  }

  componentWillUnmount() {
    // 删除监听
    window.removeEventListener('beforeunload', this.beforeunload);
  }

  beforeunload = () => {
    // const {id} = this.props.match.params;
    const { group_id } = this.props.location.state;
    const selectedMenuItem = this.props.selectedMenuItem;
    setLocalStorage('selectedItem', group_id);
    setLocalStorage('selectedMenuItem', selectedMenuItem);
  };
}

const mapStateToProps = (state, props) => {
  return {
    nameList: getGroupNameList(state),
    user: getLoggedUser(state),
    selectedMenuItem: getSelectedMenuItem(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(uiActions, dispatch),
    ...bindActionCreators(groupActions, dispatch),
    ...bindActionCreators(authActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeV2);

/**
 * 1.没有数据界面
 * 2.有数据界面, 在手动规划路由, 参考woniu/dashboard.js定义的3个路由
 * */

/**
 * homev2.js接收4个参数:
 * 1.group
 * 2.group_id
 * 3.nameList
 * 4.username
 * */

