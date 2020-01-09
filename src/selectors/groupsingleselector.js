import { createSelector } from 'reselect';

import { getGroupById } from '../redux/groups.redux';

const getGroupByIdSelector = (state, props) => getGroupById(state, props.location.state.group_id);

const makeSingleGroup = () => {
  return createSelector(
    [getGroupByIdSelector],
    (singleGroup) => singleGroup ? singleGroup.toJS() : {}
  )
};

export default makeSingleGroup;

/**
 * 输入数据格式为: immutable类型
 * 输出数据格式为: 普通js类型
 * */