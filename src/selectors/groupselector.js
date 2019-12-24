import {createSelector} from 'reselect';

// selector
import {getGroupIds, getGroupById} from '../redux/groups.redux';

const getGroupIdsSelector = (state) => getGroupIds(state);
const getGroupByIdSelector = (state) => (id) => getGroupById(state, id);

const makeGroupNameList = () => {
  return createSelector(
    [getGroupIdsSelector, getGroupByIdSelector],
    (groupIds, getGroupById) => groupIds ? groupIds.map((v) => getGroupById(v)).toJS() : []
  )
};

export default makeGroupNameList;

/**
 * 输入数据为immutable类型
 * 输出数据为普通js类型
 * */