import styled from 'styled-components';
import { rootColor } from '../../utils/cssConfig';

export const ListGroupItem = styled.div`
    position: relative;
    display: block;
    padding: 12px 20px;
    margin-bottom: -1px;
    background-color: ${rootColor['--bg-second-color']};
    border-top: 0;
    border-left: 0;
    border-right: 0;
    border-bottom: 2px solid ${rootColor['--border-color']};
    color: #fff;
`;

export const FormRow = styled.div`
    display: flex;
    flow-wrap: wrap;
    margin-left: -5px;
    margin-right: -5px;
    background-color: green;
    .row-setting {
        width: 100%;
    } 
`;