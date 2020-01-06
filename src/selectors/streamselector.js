import { createSelector } from 'reselect';
import Immutable from 'immutable';

// selector
import { getWowzaStreamInfoByGroup } from '../redux/wstream.redux';

// 
const makeStreamList = () => {
    return createSelector(
        [],
        () => { }
    );
};
