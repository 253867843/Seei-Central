import styled from 'styled-components';

export const NoGroupLayout = styled.div`
  width: 100%;
  height: 100%;
  // background-color: gold;
  .ant-result-title {
    color: #fff;
  }
  .ant-result-info .ant-result-icon > .anticon {
    color: #fff;
}
`;

// 通用布局(2行1列)
export const GenericLayout = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: 40px calc(100% - 50px);
  grid-row-gap: 20px;
  grid-template-areas: 'local-header-grid' 'local-page-content';
  padding: 20px;
`;

export const LocalHeaderGrid = styled.div`
  grid-area: local-header-grid;
  display: flex;
  align-items: center;
  span {
    font-size: 16px;
    font-weight: 600;
  }
`;

export const LocalPageContent = styled.div`
  grid-area: local-page-content;
  display: flex;
`;

export const PageContentGrid = styled.div`
  flex: 1 1 auto;
  width: 1px;
`;

export const ServicesArea = styled.div`
  height: 100%;
  overflow-y: auto;
`;

export const NoServicesText = styled.div`
  display: flex !important;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 21px;
  width: 100%;
  height: 100%;
`;