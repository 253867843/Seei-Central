import styled from 'styled-components';
import {rootColor} from '../../utils/cssConfig';

export const LoadingWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    background-color: ${rootColor['--bg-second-color']};
`;

export const Article = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    // background-color: gold;

    h4 {
      margin: 0;
      padding: 0;
      margin-top: 20px;
      color: ${rootColor['--white']};
    }
`;


// loading样式
export const list = [
  {
    prop: "balls",
    name: "Balls"
  },
  {
    prop: "bars",
    name: "Bars"
  },
  {
    prop: "bubbles",
    name: "Bubbles"
  },
  {
    prop: "cubes",
    name: "Cubes"
  },
  {
    prop: "cylon",
    name: "Cylon"
  },
  {
    prop: "spin",
    name: "Spin"
  },
  {
    prop: "spinningBubbles",
    name: "SpinningBubbles"
  },
  {
    prop: "spokes",
    name: "Spokes"
  }
];