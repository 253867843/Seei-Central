import styled from 'styled-components';
import {rootFontSize, rootColor} from '../../utils/cssConfig';

// 组选择框布局
export const GroupSelectLayout = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: auto !important;
    // 组
    span {
      margin-right: 10px;
      font-weight: 600;
    }
`;

// select选择框
export const MainGroupSelect = styled.div`
  width: 234px;
  height: 40px;
  margin-right: 20px;
  border-radius: ${rootFontSize['--btn-border-radius']};
  background-color: ${rootColor['--bg-first-color']}; 
`;

// 用户
export const UserMenu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  
  width: 40px;
  height: 40px;
  border-radius: 20px;
  border: 2px solid #fff;
  font-size: ${rootFontSize['--primary-font-size']};
`;

