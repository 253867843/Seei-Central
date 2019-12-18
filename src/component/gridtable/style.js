import styled from 'styled-components';
import {rootColor, rootFontSize} from '../../utils/cssConfig';

export const GridTableLayout = styled.div`
  flex: 1 1 auto;
  width: 1px;
  // background-color: gold;
`;

export const GridPosition = styled.div`
  position: relative;
  height: 100%;
`;

export const TableBg = styled.div`
  height: 100%;
  background-color: ${rootColor['--bg-second-color']};
  color: #fff;
  border: 1px solid transparent;
  border-radius: 7px;
  overflow-y: auto;
  
  .ant-table table {
    border-radius: 7px;
  }
  
  // 有内容
  .ant-table-content {
      .ant-table-thead > tr > th{
        color: ${rootColor['--table-thread-color']};
        background: ${rootColor['--bg-second-color']};
        border-bottom: 1px solid  ${rootColor['--border-bottom-color']};
      }
      
      .ant-table-tbody > tr > td {
        color: #fff;
        font-size: ${rootFontSize['--primary-font-size']};
        background: ${rootColor['--bg-second-color']};
        border-bottom: 1px solid  ${rootColor['--border-bottom-color']};
      }
      
      .ant-table-tbody > tr:hover > td {
        background: #000 !important;
      }
  } 
  
  // 空白
  .ant-table-placeholder {
    height: calc(100vh - 160px) !important;
    background: ${rootColor['--bg-second-color']};
    border-radius: 7px;
    border: 1px solid transparent;
    .ant-empty-normal {
      color: #fff;
    }
  }
`;
