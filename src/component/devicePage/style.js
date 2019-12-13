import styled from 'styled-components';

export const UnitDetailsLayout = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: auto 455px; // 列宽
  grid-template-rows: 40px calc(100% - 40px - 10px); // 行高, 10px是底部间隙
  grid-column-gap: 42px; // 列间隙
  grid-row-gap: 20px; // 行间隙
  grid-template-areas: "unitdetails-header-grid unitdetails-header-unit" "unitdetails-page-content unitdetails-page-content";
  padding: 20px;
`;

// 左上
export const UnitDetailsHeaderGrid = styled.div`
  grid-area: unitdetails-header-grid;
  display: flex;
  flex-flow: raw nowrap;
  justify-content: center !important;
  align-items: center !important;
  color: #fff;
  background-color: #212a35;
`;

// 右上
export const UnitDetailsHeaderUnit = styled.div`
  grid-area: unitdetails-header-unit;
  display: flex;
  flex-flow: raw nowrap;
  justify-content: center !important;
  align-items: center !important;
  color: #fff;
  background-color: #212a35;
`;

// 左下 + 右下
export const UnitDetailsPageContent = styled.div`
  grid-area: unitdetails-page-content;
  display: flex;
`;

// 表格
export const ContentGrid = styled.div`
  flex: 1 1 auto; // flex-grow, flex-shrink 和 flex-basis
  width: 1px; // 最小宽度为1px
`;

// 3个点 + 显示内容
export const GridPosition = styled.div`
  height: 100% !important;
  position: relative; // 定位组件, 给下面3个点绝对定位做基准
`;

// 3个点
export const MenuButton = styled.div`

`;

// 显示内容
export const BodyLayout = styled.div`
  height: 100%;
  color: #fff;
  border-radius: 7px;
  background: #212a35;
  overflow: hidden;
  position: relative;
`;

/*
* flex: 1 1 auto; // flex-grow, flex-shrink 和 flex-basis
* 1.优先使用这个属性: flex: 1 1 auto; / flex: 0 0 auto;
* 2.flex-grow: 项目放大比例, 作用于自身.
*   0: 表示存在剩余空间, 也不放大
*   1: 表示存在剩余空间, 等分剩余空间
* 3.flex-shrink: 项目缩小比例, 作用于自身.
*   0: 表示当空间不足时, 也不缩小
*   1: 表示当空间不足时, 等比缩小
* 4.flex-basis:
*   auto: 项目本来的大小
* */

// 分割线
export const ContentDivider = styled.div`
  width: 2px;
  height: 100%;
  margin-right: 20px;
  margin-left: 20px;
  background: #545860;
`;

// 详细信息
export const ContentSidebar = styled.div`
  width: 455px;
  overflow-y: auto;
  border-radius: 7px;
  background: #212a35;
  will-change: width;
  transition: all .5s;
`;