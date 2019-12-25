import React from 'react';

import {Icon, Button} from 'antd';

import './style.css';

class CollapseSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: ''
    };
  }

  render() {
    return (
      <div className='container-fluid'>
        <div className={`row ${this.state.collapse}`}>

          {/*侧边栏*/}
          <div className='sidebar'>

            {/*标题*/}
            <h4>这是侧边栏的标题</h4>

            {/*封面*/}
            <div className='cover'>
              <h2><img src={require('../../images/poster.jpg')} alt=""/></h2>
              <b>Hi~ hello</b>
              <p>超级管理员</p>
            </div>

            {/*菜单区域*/}
            <ul className='sidenav animated fadeInUp'>

              <li>
                <a className='withripple' href=''>
                  {/*<i className='global'></i>*/}
                  <Icon type='setting'></Icon>
                  <span className='sidespan'>首页</span>
                </a>
              </li>

              <li>
                <a className='withripple hover' href=''>
                  <Icon type='hdd'></Icon>
                  <span className='sidespan'>文章管理</span>
                </a>
              </li>

              <li>
                <a className='withripple' href=''>
                  <Icon type='setting'></Icon>
                  <span className='sidespan'>UI设计</span>
                </a>
              </li>

              <li>
                <a className='withripple' href=''>
                  <Icon type='desktop'></Icon>
                  <span className='sidespan'>Web前端</span>
                </a>
              </li>

              <li>
                <a className='withripple' href=''>
                  <Icon type='sync'></Icon>
                  <span className='sidespan'>PHP后台</span>
                </a>
              </li>

            </ul>


          </div>

          <div className='main'>
            主题内容
            <Button onClick={this.toggleSidebar}>{this.state.collapse ? '展开侧边栏' : '折叠侧边栏'}</Button>
          </div>

        </div>
      </div>
    )
  }

  // 侧边栏切换形态
  toggleSidebar = () => {
    if (this.state.collapse === 'sidebar-collapse') {
      this.setState({collapse: ''});
    } else {
      this.setState({collapse: 'sidebar-collapse'});
    }
  };
}

export default CollapseSidebar;

/**
 * 需求: 实现一个可以折叠的Sidebar
 * 1.模拟实现: https://www.cnblogs.com/zhangans/p/6180082.html, 原文可能使用了bootstrap.css
 * 这里就不使用了, 但保留项目的结构(给定<div>标签和className类名, className不实现)
 *
 * 2.正常编写
 * (1)修改sidebar宽度
 * (2)修改main的margin-left属性
 * (3)文字设置为display: none;
 *
 * 3.修改sCloudDemo2项目
 * */
