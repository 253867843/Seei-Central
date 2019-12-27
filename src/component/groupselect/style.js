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
  cursor: pointer;
`;

// 点击头像显示下拉菜单
export const DropDownMenu = styled.div`
  position: absolute;
  top: 46px;
  right: 20px;
  width: 190px;
  height: 40px;
  
  // padding: 8px auto;
  // margin-top: 2px;
  // font-size: ${rootFontSize['--primary-font-size']};
  color: #fff;
  // text-align: left;
  // list-style: none;
  background-color: #000;
  // background-clip: padding-box;
  // border: 1px solid #495057;
  // border-radius: 2px;
  // z-index: 1001;  
  // right: 0;
  // left: auto;
  // top: 46px;
  // float: none;
`;

// TODO: 继续开发
