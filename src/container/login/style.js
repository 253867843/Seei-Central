import styled from 'styled-components';
import poster from '../../images/poster.jpg';
import tube from '../../images/tube.png';

export const LoginMain = styled.div`
  background: rgba(0,0,0,0) url(${poster}) repeat scroll 0 0 ;
  background-size: auto 40%;
  color: #fff;
  font-family: '黑体', sans-serif;
  font-size: 16px;
  font-weight: lighter;
`;

export const LoginWrapper = styled.div`
  margin: 0 auto;
  width: 600px;
  // height: 100vh; // 视口高度
  overflow: hidden;
  background: rgba(0,0,0,0) url(${tube}) repeat scroll 0 0 ;
`;

export const LoginContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 320px;
  margin-bottom: 15px;
`;

export const Logo = styled.div`
  
`;

export const Title = styled.div`
  margin-top: 35px;
  margin-bottom: 15px;
  padding-bottom: 5px;
  border-bottom: 1px solid #3e424d;
`;