import styled from 'styled-components';

export const LogoHeader = styled.div`
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 90px 16px 0;
  background: url(${props => props.pic}) 50% no-repeat;
  background-size: cover;
`;