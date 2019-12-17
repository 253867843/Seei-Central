import styled from 'styled-components';

export const ThirdDashBoardLayout = styled.div`
  width: 100%;
  height: 100%;
  // background-color: gold;
`;

// 修改主轴为y轴
export const UnitLayout = styled.div`
   display: flex;
   width: 100%;
   height: 100%;
   flex-direction: column;
   padding: 20px;
`;

export const UnitNavBarHeader = styled.div`
  height: 60px;
  display: grid;
  grid-template-columns: auto 455px;
  grid-template-rows: 40px calc(100% - 50px);
  grid-column-gap: 42px;
  grid-template-areas: 'unit-navbar-header-left unit-navbar-header-unit';
  // background-color: green;
`;

export const UnitNavBarHeaderLeft = styled.div`
  grid-area: unit-navbar-header-left;
  display: flex;
  align-items: center;
  // background-color: red;
`;

export const UnitNavBarHeaderRight = styled.div`
  grid-area: unit-navbar-header-unit;
  display: flex;
  align-items: center;
  // background-color: blue;
`;

export const UnitPageContent = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 60px);

  // background-color: cyan;
`;

