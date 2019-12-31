import styled from 'styled-components';
import { rootColor } from '../../utils/cssConfig';

// 什么是新闻
export const NewsModal = styled.div`
  height: calc(100vh - 400px);
  min-height: 350px;
  overflow-y: auto;
  padding-right: 24px;
  background-color: ${rootColor['--bg-first-color']};
`;