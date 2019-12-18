import styled from 'styled-components';
import {rootColor} from '../../utils/cssConfig';

export const CardSideBar = styled.div`
  // overflow-y: auto;
  background-color: ${rootColor['--bg-second-color']};
  border-radius: 7px;
  width: 455px;
  will-change: width;
  transition: all .5s;
`;

export const UnitDetails = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  padding-right: 20px;
  height: 100% !important;
  
  // background-color: gold;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  max-height: 40px;
  min-height: 40px;
  border-bottom: 1px solid ${rootColor['--border-color']};
  margin-bottom: 10px;
  
  // background-color: green;
`;

export const Title = styled.span`
  display: block;
  width: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-left: 10px;
`;


export const AutoPlaceHolder = styled.span`
  margin-left: auto !important;
`;


export const IconButton = styled.div`
  width: 30px;
`;

export const Location = styled.div`
  width: 100%;
  height: 20px;
  margin-bottom: 10px;
`;

export const LocationLayout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  
  .ant-btn {
    background-color: transparent;
    color: #fff;
    border: none;
  }
  
  .ant-btn:hover {
    color: #e67157;
    transition: all .5s;
  }
`;

export const ScrollArea = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  scroll-behavior: smooth;
`;

export const StreamVideo = styled.div`
  position: relative;
  width: 100%;
  height: 170px;
  min-height: 170px;
  background-color: ${rootColor['--bg-first-color']};
  margin-bottom: 16px;
`;

export const StreamVideoDefaultImg = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  background-color: ${rootColor['--bg-first-color']};
`;

export const Setting = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 320px;
  margin-bottom: 16px;
  background-color: ${rootColor['--bg-first-color']};
`;

export const SettingLayout = styled.div`
  display: grid;
  grid-template-columns: 25% 75%;
  grid-auto-rows: 40px;
  grid-row-gap: 20px; 
  align-items: center;
  padding: 20px;
`;

export const StatusButtonLayout = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: auto !important;
  padding: 20px;
`;

export const MarginLeftAuto = styled.div`
  margin-left: auto !important;
  .ant-btn {
    width: 170px;
    height: 40px;
    background-color: ${rootColor['--bg-btn-offline']};
    color: #fff;
    border-color: transparent;
  } 
`;

export const InfoLayout = styled.div`
  display: flex;
  width: 100%;
  // height: 100%;
  height: 800px;
  background-color: blue;
`;