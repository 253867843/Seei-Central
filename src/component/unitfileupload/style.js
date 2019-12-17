import styled from 'styled-components';

export const UnitUploadLayout = styled.div`
  width: 100%;
  height: 100%;
`;

export const UnitFileUploadLayout = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: auto 2px 450px;
  grid-template-rows: 40px 90px 30px calc(100% - 210px);
  grid-row-gap: 20px;
  grid-column-gap: 20px;
  grid-template-areas: 
    'file-upload-header-grid divider file-upload-files' 
    'file-upload-page-content-grid-controller divider file-upload-files'
    'file-upload-page-content-grid-navigator divider file-upload-files'
    'file-upload-page-content-grid divider file-upload-files' 
    ;
  padding: 20px; 
`;

export const FileUploadHeaderGrid = styled.div`
  grid-area: 'file-upload-header-grid';
  display: flex;
  align-items: center; 
`;