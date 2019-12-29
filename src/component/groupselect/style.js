import styled from 'styled-components';
import { rootFontSize, rootColor } from '../../utils/cssConfig';

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

// 弹窗布局
export const DropDownPopover = styled.div`
  position: absolute;
  float: none;
  top: 46px;
  right: 0px;
  left: auto;
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

// 用户信息/关于
export const AboutModal = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  pointer-events: auto;
  background-color: #343a41;
`;

export const AboutModalPic = styled.div`
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;  
  img {
    width: 329px;
    height: 57px;
    margin-bottom: 51px;
  }
`;

export const FlexJCenter = styled.div`
    display: flex;
    justify-content: center;
`;

export const AboutModalText = styled.div`
  display: flex;
  justify-content: center !important;
  align-items: center !important;
  margin-bottom: 54px;  
`;

export const WhiteLineLeft = styled.div`
  width: 70px;
  height: 2px;
  background-color: ${rootColor['--about-line-color']};
  margin-top: 4px;
  margin-right: 8px;
`;

export const WhiteLineRight = styled.div`
  width: 70px;
  height: 2px;
  background-color: ${rootColor['--about-line-color']};
  margin-top: 4px;
  margin-left: 8px;
`;

export const Version = styled.div`
  color: ${rootColor['--white']};
`;

export const NewsModal = styled.div`
  height: calc(100vh - 400px);
  min-height: 350px;
  overflow-y: auto;
  padding-right: 24px;
  background-color: ${rootColor['--bg-first-color']};
`;