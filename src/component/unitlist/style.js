import styled from 'styled-components';
import {rootColor} from '../../utils/cssConfig';

export const UnitListLayout = styled.div`
  width: 100%;
  height: 100%;
  // background-color: red;
`;

export const UnitDetailsLayout = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: auto 455px;
  grid-template-rows: 40px calc(100% - 50px);
  grid-column-gap: 42px;
  grid-row-gap: 20px;
  grid-template-areas: 'unit-details-header-grid unit-details-header-unit' 'unit-details-page-content unit-details-page-content';
  padding: 20px; 
  // background-color: gold;
`;

// 左上角
export const UnitDetailsHeaderGrid = styled.div`
  grid-area: unit-details-header-grid;
  display: flex;
  // background-color: gold;
`;

export const ButtonLayout = styled.div`
  margin-right: 20px;
  .ant-radio-group {
    display: inline-flex;
    vertical-align: middle;
      .ant-radio-button-wrapper {
      background-color: #212a35;
      color: #fff;
      border: 0;
      // border-right: 1px solid red !important;
    }
  }
  
  .ant-radio-button-wrapper:first-child {
    border-left: 0;
  }
`;

export const TitleLayout = styled.div`
  display: flex !important;
  align-items: center !important;
  width: 100% !important;
  span {
    font-size: 16px;
    font-weight: 600;
  }
  // background-color: cyan;
`;

export const SearchLayout = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 40px;
  flex-wrap: wrap;
  align-items: stretch;
`;

export const SearchBar = styled.div`
   position: absolute;
   right: 0;
`;