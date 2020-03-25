import { createSelector } from 'reselect';

// selector
import { getWowzaInfoById } from '../redux/wstream.redux';

const getWowzaInfoByIdSelector = (state, props) => getWowzaInfoById(state, props.recvStreamServices_id);

const makeStreamList = () => {
    return createSelector(
        [getWowzaInfoByIdSelector],
        (singleWowza) => singleWowza ? singleWowza.toJS() : {}
    );
};


export default makeStreamList;

/**
 * 输入格式为: Immutable
 * 输出格式为: 普通js类型
*/