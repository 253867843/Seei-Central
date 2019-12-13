import {getAxios, postAxios} from '../utils/request';
import Immutable from 'immutable';

// action creators
export const actions = {
  getTest: (url) => {
    return (dispatch) => {
      getAxios(url, dispatch)
        .then(res => {
          console.log('[test.redux.js]', res);
        });
    }
  },
  postTest: (url) => {
    return (dispatch) => {
      postAxios(url, {}, dispatch)
        .then(res => {
          console.log('[test.redux.js]', res);
        });
    }
  }
};

// reducer
export default (state = Immutable.fromJS({}), action) => {
  switch (action.type) {
    default:
      return state;
  }
};