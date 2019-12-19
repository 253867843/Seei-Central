import {createSelector} from 'reselect';
import Immutable from 'immutable';

// selector
import {getEncodeById} from '../redux/encode.redux';
import {getWowzaById} from '../redux/wowza.redux';

// 1.encodes
const encodeIdsSelector = (state, props) => state.getIn(['encodes', 'byGroup', props.location.state.group_id]);
const encodeByIdSelector = (state) => (id) => getEncodeById(state, id);

const encodesFilterSelector = createSelector(
  encodeIdsSelector,
  encodeByIdSelector,
  (encodeIds, filterFunc) => {
    return encodeIds ? encodeIds.map((v) => filterFunc(v)) : Immutable.List();
  }
);

// 2.wowzas
const wowzaIdsSelector = (state, props) => state.getIn(['wowzas', 'byGroup', props.location.state.group_id]);
const wowzaByIdSelector = (state) => (id) => getWowzaById(state, id);

const wowzaFilterSelector = createSelector(
  wowzaIdsSelector,
  wowzaByIdSelector,
  (wowzaIds, filterFunc) => {
    return wowzaIds ? wowzaIds.map((v) => filterFunc(v)) : Immutable.List();
  }
);

export const makeUnitList = () => {
  return createSelector(
    [encodesFilterSelector, wowzaFilterSelector],
    (encodesFilter, wowzasFilter) => {
      console.log('[encodesFilter]', encodesFilter.toJS());
      console.log('[wowzasFilter]', wowzasFilter.toJS());
    }
  );
};

/*
* 目的: 创建一份数据
* encodes: {}, 加上类型unit_type: 1
* wowzas: {}, 加上类型unit_type: 2
* 用作排序用
* */

