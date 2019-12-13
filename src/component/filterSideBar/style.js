import styled from 'styled-components';

export const FilterLayout = styled.div`
  position: fixed;
  width: 260px;
  height: 100%;
  background: #212a35;
`;

export const FilterExpandLayout = styled.div`
  padding-right: 20px;
  height: calc(100% - 74px);
  background: rgb(9, 11, 12);
`;

// 过滤标签
export const FilterTitle = styled.div`
  color: #fff;
  padding: 0 0 7px;
  font-size: 14px;
  margin-bottom: 17px;
`;

export const FilterLabel = styled.div`
  padding-top: 18px;
  padding-bottom: 26px;
  height: 54px;
  border-bottom: 1px solid rgb(66,70,78);
  text-align: left;
  span {
    float: right;
    cursor: pointer;
    color: rgb(57,134,251);
  } 
`;