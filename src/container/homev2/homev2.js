import React, {Fragment} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link, Route, useLocation} from 'react-router-dom';

// selector
import {getGroupNameList} from '../../redux/index';
import {getLoggedUser} from '../../redux/auth.redux';
import {actions as uiActions, getSelectedMenuItem} from '../../redux/ui.redux';

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
import {setLocalStorage, getRouteParams} from '../../utils/utils';
import isEmpty from 'lodash/isEmpty';
import apiPrefix from '../../apiPrefix';

// antd
import {Icon, Menu} from 'antd';

// function Unit() {
//   return (
//     <div>Unit</div>
//   )
// }

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
            <Icon type='appstore'/>
            设备
          </Menu.Item>
          <Menu.Item key='files'>
            <Icon type='file'/>
            文件
          </Menu.Item>
          <Menu.Item key='manage'>
            <Icon type='setting'/>
            Groups
          </Menu.Item>
          <Menu.Item key='service'>
            <Icon type="cloud-server"/>
            服务
          </Menu.Item>
        </Menu>
      )
      : null
  };

  render() {
    console.log('[HomeV2]', this.props);
    const {group_id} = this.props.location.state;
    const {menu} = this.props.match.params;
    const rootUrl = apiPrefix.rootUrl();
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
          <img src={require('../../images/logo.png')} alt=''/>
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
                      <Route key={v.path} path={v.path} component={v.component}/>
                    ))
                  }
                </Fragment>
              )
              : <NoGroupPage/>
          }
        </PageContent>

      </MainLayout>
    )
  }

  componentDidMount() {
    const {group, group_id} = this.props.location.state;
    if (!isEmpty(group) && isEmpty(group_id)) {
      // this.props
    }
  }

  // 切换标签页面
  handleClick = (e) => {
    console.log('[切换二级路由]', e.key);
    const targetId = this.props.location.state.group_id;
    const grouplist = this.props.groupNameList.toJS();
    const rootUrl = apiPrefix.rootUrl();
    this.props.history.push(getRouteParams(rootUrl, grouplist, targetId, e.key));
    this.props.setSelectedMenuItem(e.key);
  };

  componentDidMount() {
    window.addEventListener('beforeunload', this.beforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.beforeunload);
  }

  beforeunload = () => {
    // const {id} = this.props.match.params;
    const {group_id} = this.props.location.state;
    const selectedMenuItem = this.props.selectedMenuItem;
    setLocalStorage('selectedItem', group_id);
    setLocalStorage('selectedMenuItem', selectedMenuItem);
  };
}

const mapStateToProps = (state, props) => {
  return {
    groupNameList: getGroupNameList(state),
    user: getLoggedUser(state),
    selectedMenuItem: getSelectedMenuItem(state),
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(uiActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeV2);

/**
 * 1.没有数据界面
 * 2.有数据界面, 在手动规划路由, 参考woniu/dashboard.js定义的3个路由
 * */

