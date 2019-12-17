import styled from 'styled-components';

export const UnitMultiViewLayout = styled.div`
  width: 100%;
  height: 100%;
  // background-color: green;
`;

export const MultiViewNoSelect = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  padding: 10px 14px 14px;
`;

export const MultiViewHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 60px;
  padding-left: 54px;
  user-select: none; // 是否允许用户选中文本
  // background-color: red;
`;

export const MultiViewContent = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100% - 60px);
  padding: 0 44px;
  user-select: none;
`;