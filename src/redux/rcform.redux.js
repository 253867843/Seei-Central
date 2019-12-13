import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
  email: {
    value: 'x@gmail.com'
  }
});

// action types
export const types = {
  SAVE_FIELDS: 'rcform/SAVE_FIELDS',
};

// action creators
export const actions = {
  setEmail: (payload) => ({
    type: types.SAVE_FIELDS,
    payload
  }),
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case types.SAVE_FIELDS:
      return state.merge(Immutable.fromJS(action.payload));
    default:
      return state;
  }
};

// selectors
export const getEmail = (state) => state.getIn(['rcform', 'email']);

/**
 * payload格式: {email: {value: 'chaojundu@diadem-tech.cn'}, name: {value: 'dcj123'}}
 * */