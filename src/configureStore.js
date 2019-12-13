// +
// step2:
import {createBrowserHistory} from 'history'; // 看作一个路由对象
import {applyMiddleware, createStore} from 'redux'; // 应用中间件, 创建store仓库

// 控制台Redux
import {composeWithDevTools} from 'redux-devtools-extension';

// reducer
import createRootReducer from './reducers';

// 中间件
import {routerMiddleware} from 'connected-react-router/immutable';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

export const history = createBrowserHistory();
export default function configureStore(preloadedState) {
  const store = createStore(
    createRootReducer(history), // 含有router state的根Reducer
    preloadedState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history), // dispatch history actions(push, replace, go, goBack, goForward)
        thunk,
        // logger,
        // ... 其他中间件
      )
    )
  );

  return store;
}

/**
 * 创建redux store
 * 1.创建history对象
 * */