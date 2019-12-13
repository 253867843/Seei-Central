import styled from 'styled-components';

export const MainLayout = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 40px calc(100% - 40px - 10px); // 行高设置
  grid-template-columns: 455px 2px auto; // 列宽设置
  grid-row-gap: 20px; // 行间距
  grid-column-gap: 20px; // 列间距
  padding: 20px;
  grid-template-areas: "groups_header_1 groups_header_2 groups_header_3" 
  "groups_content_1 groups_content_2 groups_content_3"; // 2*3
`;

// 1*1
export const Header = styled.div`
  display: flex;
  grid-area: groups_header_1;
`;

// 1*2
export const Header_Divider = styled.div`
  display: flex;
  width: 2px;
  height: 100%;
  background-color: #545860;
  grid-area: groups_header_2;
`;

// 1*3
export const Header_Hidden = styled.div`
  display: flex;
  grid-area: groups_header_3;
`;

// 2*1
export const Content_Group_Info = styled.div`
  display: flex;
  grid-area: groups_content_1;
`;

// 2*2
export const Content_Group_Divider = styled.div`
  display: flex;
  width: 2px;
  height: 100%;
  background-color: #545860;
  grid-area: groups_content_2;
`;

// 2*3
export const Content_Group_Match = styled.div`
  display: flex;
  grid-area: groups_content_3;
`;

// 展示Group信息和匹配状态/2*1
export const Content_Sidebar = styled.div`
  width: 455px;
  overflow-y: auto;
  border-radius: 7px;
  background: #212a35;  
  will-change: smooth;
  transition: all .5s;
`;

export const GroupsDetail = styled.div`
  display: flex;
  flex-direction: column !important; // 主轴为垂直方向, 起点为上沿
  height: 100%;
  padding-left: 20px;
  padding-right: 20px;
  // background: gold;
`;

// Group信息标题
export const GroupsDetailHeader = styled.div`
  display: flex;
  align-items: center; // 项目在交叉轴上对齐方式
  min-height: 40px;
  max-height: 40px;
  border-bottom: 1px solid #545860;
  margin-bottom: 10px;
  color: #fff;
  .title {
    padding-left: 15px;
    width: auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .auto {
    margin-left: auto !important;
  }
`;

export const GroupDetailInfo = styled.div`
  display: flex;
  flex-direction: column !important;
  flex-shrink: 0; // 当主轴空间不足时, 不缩放
  min-height: 320px;
  margin-bottom: 15px;
  background-color: #343a41;
`;

export const GroupDetailInfoLayout = styled.div`
  display: grid;
  grid-template-columns: 30% 70%;
  grid-auto-rows: 40px; // 一行中未放置的地方, 自动生成网格
  grid-row-gap: 20px; // 行间隙
  align-items: center; // 项目在交叉轴上的定位方式
  padding: 20px;
  text-align: left;
  color: #fff;
  font-weight: 400;
  font-size: 14px;
`;

export const GroupDetailMatch = styled(GroupDetailInfo)``;

export const GroupDetailMatchLayout = styled(GroupDetailInfoLayout)``;

// 匹配按钮
export const ButtonMatch = styled.div`
  display: flex;
  align-items: center !important; // 项目在交叉轴上的定位方式
  width: 100%;
  padding: 20px;
  margin-top: auto !important;
  justify-content: flex-end;
 
  // background: gold;
`;