import styled from 'styled-components';
import {rootColor, rootFontSize} from '../../utils/cssConfig';

// 整体页面
export const MainLayout = styled.div`
  display: grid;
  width: 100vw; // 视口宽度
  height: 100vh; // 视口高度
  grid-template-columns: auto 1fr; // 列(左边指定, 右边自适应)
  grid-template-rows: 60px calc(100vh - 60px); // 行
  grid-template-areas: 'header-logo header-navbar' 'page-content page-content';
  background-color: #212a35;
  color: #fff;
`;

// logo
export const HeaderLogo = styled.div`
  grid-area: header-logo;
  display: flex !important;
  width: 260px;
  justify-content: center; 
  align-items: center;
  align-content: center;
  border-bottom: 1px solid ${rootColor['--border-color']};
  border-top: 1px solid ${rootColor['--border-color']};
  background: ${rootColor['--bg-third-color']};
  
  img{
    height: 100%;
  }
`;

// 导航条
export const HeaderNavbar = styled.div`
  grid-area: header-navbar;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  border-top: 1px solid ${rootColor['--border-color']};
  border-bottom: 1px solid ${rootColor['--border-color']};
  padding: 16px 16px 16px 0;
  
  // 4个子菜单
  ul.ant-menu.ant-menu-dark.ant-menu-root.ant-menu-horizontal {
    display: flex;
    flex-direction: row;
    margin-bottom: 0;
    padding-left: 0;
    list-style: none;
    box-sizing: content-box;
    li {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      width: 110px !important;
      height: 58px;
      font-size: ${rootFontSize['--primary-font-size']};
      border-right: 1px solid ${rootColor['--border-color']};
      padding-right: 7px !important;
      // box-sizing: border-box;
      &:first-child {
         border-left: 1px solid ${rootColor['--border-color']};
      } 
    }
    .ant-menu-item {
      padding: 0;
    }
  }
`;

// 内容部分
export const PageContent = styled.div`
  grid-area: page-content;
  display: flex;
  height: 100%;
  background-color: ${rootColor['--bg-first-color']};
`;

// flex:
// 1.display: flex;
// 2.flex-flow(flex-direction/flex-wrap)
// 3.justify-content
// 4.align-items
// 5.width/height: 100%;