import styled from 'styled-components';

export const EncodesDetails = styled.div`
  display: flex;
  flex-direction: column !important; // 主轴为垂直方向, 起点在上沿
  height: 100% !important;
  padding-left: 20px;
  padding-right: 20px;
  
  // background: red;
`;

// 头部信息
export const Header = styled.div`
  display: flex;
  align-items: center; // 在交叉轴上的对齐方式
  max-height: 40px;
  min-height: 40px;
  border-bottom: 1px solid #545860;
  margin-bottom: 10px;
  color: #fff;
  .title {
    padding-left: 10px;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  
  .auto {
    margin-left: auto !important;    
  } 
  
  // background: gold;
`;

// 滚动区域
export const ScrollArea = styled.div`
  display: flex;
  flex-direction: column !important; // 主轴为垂直方向, 起点为上沿
  overflow-y: auto;
  scroll-behavior: smooth;
`;

// 放置播放器的容器
export const VideoDiv = styled.div`
  position: relative !important;
  width: 100%;
  height: 170px;
  min-height: 170px;
  background-color: gold;
  margin-bottom: 15px;
`;

// Setting 推流参数(播放器下)
export const Setting = styled.div`
  display: flex !important;
  flex-direction: column !important;
  flex-shrink: 0; // 当主轴空间不足时, 项目不缩放
  min-height: 320px;
  margin-bottom: 15px;
  background-color: #343a41;  
`;

// Setting中的内容采用Grid布局
export const SettingLayout = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  grid-auto-rows: 40px; // 自动生成多余网格(一行中未放置的地方, 自动生成网格)
  grid-row-gap: 20px; // 行间隙
  align-items: center; // 在交叉轴上的对齐方式
  padding: 20px;
  text-align: left;
  color: #fff;
  font-weight: 400;
  font-size: 14px;
`;

// 注册布局, 弹窗
export const RegisterContentLayout = styled.div`
  display: flex;
  flex: 1 1 auto;
  // overflow-y: auto;
`;

// 注册区域, 弹窗
export const RegisterArea = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #343a41;
`;

// 修改Group信息, 弹窗标题
export const Title = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
  margin-bottom: 10px;
  font-size: 17.5px;
  color: #fff;
`;