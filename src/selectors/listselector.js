import { createSelector } from 'reselect';
import Immutable from 'immutable';

// selector
import { getEncodeById, getEncodeIdsByGroup } from '../redux/encode.redux';
import { getWowzaById, getWowzaIdsByGroup } from '../redux/wowza.redux';

// 1.encodes
const encodeIdsSelector = (state, props) => getEncodeIdsByGroup(state, props.location.state.group_id);
const encodeByIdSelector = (state) => (id) => getEncodeById(state, id); // 函数式编程

const encodesFilterSelector = createSelector(
  encodeIdsSelector,
  encodeByIdSelector,
  (encodeIds, filterFunc) => {
    return encodeIds ? encodeIds.map((v) => filterFunc(v)) : Immutable.List();
  }
);

// 2.wowzas
const wowzaIdsSelector = (state, props) => getWowzaIdsByGroup(state, props.location.state.group_id);
const wowzaByIdSelector = (state) => (id) => getWowzaById(state, id);

const wowzaFilterSelector = createSelector(
  wowzaIdsSelector,
  wowzaByIdSelector,
  (wowzaIds, filterFunc) => {
    return wowzaIds ? wowzaIds.map((v) => filterFunc(v)) : Immutable.List();
  }
);

const makeUnitList = () => {
  return createSelector(
    [encodesFilterSelector, wowzaFilterSelector],
    (encodesFilter, wowzasFilter) => {
      const encodesFilterRaw = encodesFilter.toJS();
      const wowzasFileterRaw = wowzasFilter.toJS();
      return [...encodesFilterRaw, ...wowzasFileterRaw];
    }
  );
};

export default makeUnitList;