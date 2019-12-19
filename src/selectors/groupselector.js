import {createSelector} from 'reselect';

// selector
import {getGroupIds, getGroupById} from '../redux/groups.redux';

const getGroupIdsSelector = (state) => getGroupIds(state);
const getGroupByIdSelector = (state) => (id) => getGroupById(state, id);

const makeGroupList = () => {
  return createSelector(
    [getGroupIdsSelector, getGroupByIdSelector],
    (groupIds, getGroupById) => {
      return groupIds ? groupIds.map((v) => getGroupById(v)).toJS() : [];
    }
  )
};

export default makeGroupList;