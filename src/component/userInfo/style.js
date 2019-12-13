import styled from 'styled-components';

// 组 + select + 名字首字母 + 添加组按钮
export const NavbarSelect = styled.div`
  display: flex !important;
  flex-direction: row !important; // 主轴为水平方向, 起点在左端
  align-items: center !important; // 在交叉轴上的对齐方式
  margin-left: auto !important;
  
  // background: gold;
  color: #fff;
  span {
    margin-right: 10px;
    font-weight: 600;
  }
`;

// select布局, 包裹antd/select
export const SelectLayout = styled.div`
  width: 234px;
  height: 40px;
  margin-right: 20px;
  background: #343a41;
  border-radius: 5px;
  
  // background: blue;
`;

export const AvatarLayout = styled.div`
  display: flex;
  align-items: center !important; // 定义项目在交叉轴上的对齐方式
  justify-content: flex-end; // 定义项目在主轴上的对齐方式方式(尾部对齐)
`;

export const UserInfoHeader = styled.div`
  float: right;
  margin-right: 28px;
  overflow: hidden;
  color: #fff;
  font-weight: 600; 
  span {  
    margin-right: 10px;
  }
`;

// 注册区域
export const RegisterContentLayout = styled.div`
  display: flex;
  flex: 1 1 auto;
  overflow-y: auto;
  width: 750px;
  height: 100%;
`;

export const RegisterArea = styled.div`
  width: 100%;
  padding: 10px;
  background-color: #343a41;
`;

export const Title = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 8px;
  margin-bottom: 10px;
  font-size: 17.5px;
  color: #fff;
`;

// 添加组'按钮'
export const AddGroupLayout = styled(AvatarLayout)``;

export const SpinWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background-color: blue;
`;