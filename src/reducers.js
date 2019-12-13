// -
// import {combineReducers} from 'redux-immutable';
// import app from './redux/app.redux';
// import vcode from './redux/vcode.redux';
// import auth from './redux/auth.redux';
// import groups from './redux/groups.redux';
// import encodes from './redux/encode.redux';
// import wowzas from './redux/wowza.redux';
// import wstream from './redux/wstream.redux';
// import ui from './redux/ui.redux';
// import response from './redux/response.redux';
//
// // 测试
// import rcform from './redux/rcform.redux';
//
// export default combineReducers({
//   app, vcode, auth, groups, encodes, wowzas, wstream, ui, response,
//   rcform, // 测试
// });

// +
import {combineReducers} from 'redux-immutable';
import {connectRouter} from 'connected-react-router/immutable';
import app from './redux/app.redux';
import vcode from './redux/vcode.redux';
import auth from './redux/auth.redux';
import groups from './redux/groups.redux';
import encodes from './redux/encode.redux';
import wowzas from './redux/wowza.redux';
import wstream from './redux/wstream.redux';
import ui from './redux/ui.redux';
import test from './redux/test.redux';

/*
* import {createBrowserHistory} from 'history'; // 来自react-router-dom
* history >>> const history = createBrowserHistory();
* */
const createRootReducer = (history) => combineReducers({
  router: connectRouter(history), // 可以把它当作将react-router-dom的history对象保存在router中
  app,
  vcode,
  auth,
  groups,
  encodes,
  wowzas,
  wstream,
  ui,
  test
  // ... 其他reducer
});

export default createRootReducer;


// step1:
// createRootReducer: 接收1个history作为参数, 返回一个根reducer
// 给根reducer里面添加一个router reducer, 这个reducer值为给connectRouter传递一个history参数