import styled from 'styled-components';

export const ContentLarge = styled.div`
  width: 100%;
  height: 100%;
  margin-left: 260px;
`;

export const UnitDetailLayout = styled.div`
  height: 100%;
  display: grid;
  grid-template-columns: auto 455px;
  grid-template-rows: 40px calc(100% - 50px);
  grid-column-gap: 42px;
  grid-row-gap: 20px;
  grid-template-areas: 'unit-details-header-grid unit-details-header-unit' 'unit-details-page-content unit-details-page-content'; 
  padding: 20px;
`;