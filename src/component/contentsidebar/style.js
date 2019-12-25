import styled from 'styled-components';
import {rootColor, rootFontSize} from '../../utils/cssConfig';

export const SideBar = styled.div`
  position: fixed;
  width: 260px;
  height: 100%;
  background-color: ${rootColor['--bg-second-color']};
  will-change: transform;
  transition: transform .5s;
  &.content-sidebar-large {
    transform: translateX(0);
    z-index: 1001;
  } 
  &.content-sidebar-small {
    transform: translateX(-206px);
    text-align: center;
    z-index: 1001;
  }
`;

export const FilterSideBar = styled.div`
  height: 100%;
  background-color: ${rootColor['--bg-filters-color)']};  
`;

export const FilterTitle = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  height: 74px;
  padding: 12px 20px;
  margin-bottom: -1;
  background-color: ${rootColor['--bg-third-color']};
  font-size: ${rootFontSize['--primary-font-size']};
  color: #fff;
  .filter-icon-large {
    font-size: 20px;
    margin-right: 8px;
  }
  .filter-icon-small {
    margin-left: auto !important;
    font-size: 20px;    
    // margin-right: 4px;
  }
  .hidden-span {
    display: none;
  }
`;

// 大头钉📍
export const UnitFilterPin = styled.div`
  margin-left: auto !important;
  padding: 6px 12px;
  .ant-btn {
    border: none;
    background-color: ${rootColor['--bg-third-color']};
    color: #fff;
  }
  &.hidden-btn {
    display: none;
  }
`;

// 过滤内容
export const FilterSubTab = styled.div`
  font-size: ${rootFontSize['--primary-font-size']};
  background-color: ${rootColor['--bg-filters-color']};
  color: #fff;
  &.expanded {
    padding-right: 20px;
  }
`;

export const FilterFieldSet = styled.div`
  padding-top: 16px;
  margin: 0 !important;
  &.pl-16 {
    padding-left: 16px;
  }
`;

export const FilterLabel = styled.div`
  display: flex;
  justify-content: space-between !important; 
  align-items: center;
  height: 54px;
  padding-top: 18px;
  padding-bottom: 26px;
  border-bottom: 1px solid ${rootColor['--border-color']};
`;

export const FilterSubTitle = styled.div`
  display: inline-block;
  margin-bottom: 8px;
  &.sub-title-collapsed {
    display: flex;
    width: 54px;
    height: 100%;
    justify-content: center;
    margin-left: auto;
  }
`;

export const ResetButton = styled.div`
  color: #d9482f;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
  &.hidden-reset-btn {
    display: none;
  }
`;

export const Main = styled.div`
  width: 100%;
  height: 100vh;
  transition: all .5s;
  &.content-large {
    margin-left: 260px;
  }
  background-color: gold;
`;