import styled from 'styled-components';

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

export const SearchBox = styled.div`
  display: flex;
  margin-left: -1px;
`;