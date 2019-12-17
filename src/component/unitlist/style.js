import styled from 'styled-components';
import {rootColor} from '../../utils/cssConfig';

export const UnitListLayout = styled.div`
  width: 100%;
  height: 100%;
  // background-color: red;
`;

export const UnitDetailsLayout = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto 2px 455px;
  // grid-template-rows: 40px calc(100% - 50px);
  grid-template-rows: 100%;
  grid-column-gap: 42px;
  // grid-row-gap: 20px;
  grid-template-areas: 'unit-list-page-content-table divider unit-list-page-content-card';
  // padding: 20px; 
  // background-color: gold;
`;

// 左上角
// export const UnitDetailsHeaderGrid = styled.div`
//   grid-area: unit-details-header-grid;
//   display: flex;
//   // background-color: gold;
// `;

export const UnitListPageContentTable = styled.div`
  grid-area: unit-list-page-content-table;
  display: flex;
`;

export const Divider = styled.div`
  grid-area: divider;
  display: flex;
  width: 2px;
  height: 100%;
  background-color: ${rootColor['--border-color']};
  margin: 0;
`;

export const UnitListPageContentCard = styled.div`
  grid-area: unit-list-page-content-card;
  display: flex;
`;