import styled from 'styled-components';

export const MainLayout = styled.div`
  display: grid;
  width: 100vw; // 视口宽度
  height: 100vh; // 视口高度
  grid-template-columns: auto 1fr;// 列, auto: 表示根据宽度自定义
  grid-template-rows: 60px calc(100vh - 60px); // 行
  grid-template-areas: "header-logo header-navbar" "page-content page-content";
  // background: #363A45;
`;

// 项目:
/*
 *  <div style={display: flex;}> --- 采用flex布局的元素, 成为flex容器, 简称容器
 *      <div>...</div> --- 子元素, 成为容器成员, 简称项目
 *  </div>
 * 注意: grid和flex都有justify-content, align-content等属性, 不要混淆.
 * */

// logo
export const HeaderLogo = styled.div`
  grid-area: header-logo;
  display: flex !important;
  width: 260px;
  justify-content: center !important; // 项目在主轴上的对齐方式
  align-content: center !important; // 多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用
  align-items: center !important; // 项目交叉轴上如何对齐
  background: #161b21;
  img {
    height: 100%;
  }
`;

// 导航条
export const HeaderNavbar = styled.div`
  grid-area: header-navbar;
  position: relative;
  display: flex;
  flex-flow: row nowrap; // 主轴为水平方向, 左端为起点(默认值); 不换行
  justify-content: flex-start; // 项目在主轴上的对齐方式
  align-items: center; // 项目在交叉轴上的对齐方式
  ul {
    display: flex;
    flex-direction: row;
    list-style: none;
    color: #fff;
    li {
      border: 1px solid gold;
      display: flex;
      width: 110px; 
      align-items: baseline !important;
      height: 60px;
      line-height: 60px;
      text-align: center;
      justify-content: center;
    }
  }
  background: #212a35;
`;

// 内容(过滤FilterSideBar + Content)
export const PageContent = styled.div`
  grid-area: page-content;
  display: flex;
  height: 100%; // MainLayout calc(100vh - 60px)
`;

export const UnitContent = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 260px;
  background: #343a41;
`;