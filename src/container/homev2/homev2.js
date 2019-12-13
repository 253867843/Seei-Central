import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

// selector
import {getGroupNameList} from '../../redux/index';
import {getLoggedUser} from '../../redux/auth.redux';

// 自定义组件
import GroupSelect from '../../component/groupselect/groupselect';
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
import {setLocalStorage} from '../../utils/utils';

class HomeV2 extends React.Component {
  render() {
    const {id} = this.props.match.params;
    const {groupNameList, user} = this.props;
    const groupNameListRaw = groupNameList.toJS();
    const userRaw = user.toJS();
    console.log('[HomeV2]', id);
    return (
      <MainLayout>
        <HeaderLogo>
          <img src={require('../../images/logo.png')} alt=''/>
        </HeaderLogo>
        <HeaderNavbar>

          <ul>
            <li>设备</li>
            <li>文件</li>
            <li>管理</li>
            <li>服务</li>
          </ul>

          <GroupSelect
            id={id}
            grouplist={groupNameListRaw}
            userRaw={userRaw}
          />

        </HeaderNavbar>

        <PageContent>
          <ContentSideBar/>
          <Content/>
        </PageContent>

      </MainLayout>
    )
  }

  // <div style={{
  //   gridArea: 'page-content'
  // }}>
  // {
  //   id
  //     ? <div>展示有数据界面-{id}</div>
  //     : <div>展示没有数据界面</div>
  // }
  // </div>

  componentDidMount() {
    window.addEventListener('beforeunload', this.beforeunload);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.beforeunload);
  }

  beforeunload = () => {
    const {id} = this.props.match.params;
    setLocalStorage('selectedItem', id);
  };
}

const mapStateToProps = (state, props) => {
  return {
    groupNameList: getGroupNameList(state),
    user: getLoggedUser(state),
  }
};

export default connect(mapStateToProps, null)(HomeV2);

/**
 * 1.没有数据界面
 * 2.有数据界面, 在手动规划路由, 参考woniu/dashboard.js定义的3个路由
 * */