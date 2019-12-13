import styled from 'styled-components';

export const WowzasDetails = styled.div`
  display: flex;
  flex-direction: column !important; // 主轴为垂直方向, 起点为上沿
  height: 100% !important;
  padding-left: 20px;
  padding-right: 20px;
  // background: red;
`;

// 头部
export const Header = styled.div` 
  // 不设置, 默认主轴方向是水平方向
  display: flex; 
  align-items: center; // 在交叉轴上的对齐方式
  min-height: 40px;
  max-height: 40px;
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
`;

export const PageContentSidebar = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: column !important;
  height: 100% !important;
  
  // background: red;
`;

// Setting
export const Setting = styled.div`
  display: flex;
  flex-direction: column !important; // 主轴为垂直方向, 起点为上沿
  flex-shrink: 0; // 当主轴空间不足时, 不缩放
  min-height: 320px;
  margin-bottom: 15px;
  background: #343a41;
`;

// Setting中的内容采用Grid布局
export const SettingLayout = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  grid-auto-rows: 40px; // 一行中未放置的地方, 自动生成网格
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
  flex: 1 1 auto; // 当主轴空间不足时, 缩放;当主轴空间多余时, 放大;
`;

// 注册区域, 弹窗
export const RegisterArea = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #343a41;
`;

// 标题
export const Title = styled.div`
  display: flex;
  flex-wrap: wrap; // 当轴线排不下时, 自动换到下一行
  margin-top: 8px;
  margin-bottom: 10px;
  font-size: 17.5px;
  color: #fff;
`;

// 展示wowza服务器流信息
export const WowzaInfo = styled(Setting)``;

export const WowzaInfoLayout = styled(SettingLayout)``;