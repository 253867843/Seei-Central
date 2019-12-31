import styled from 'styled-components';
import { rootFontSize, rootColor } from '../../utils/cssConfig';

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