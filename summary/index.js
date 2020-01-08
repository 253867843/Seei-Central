import Immutable from 'immutable';

// isFetching
const defaultState = Immutable.fromJS({
    isFetching: false, // 是否正在轮询
});

export const types = {
    START_WOWZA_FETCH: 'APP/START_WOWZA_FETCH',
    FINISH_WOWZA_FETCH: 'APP/FINISH_WOWZA_FETCH'
};

export const actions = {
    startFetching: () => ({
        type: types.START_WOWZA_FETCH
    }),
    finishFetching: () => ({
        type: types.FINISH_WOWZA_FETCH
    })
};

export default (state = defaultState, action) => {
    switch (action.type) {
        case types.START_WOWZA_FETCH:
            return state.merge({ isFetching: true }); // 简单数据类型
        case types.FINISH_WOWZA_FETCH:
            return state.merge({ isFetching: false }); // 简单数据类型
    }
};