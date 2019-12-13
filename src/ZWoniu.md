# Redux + React Router + Node.js 全栈开发

### 1-1.课程导学
(1) 先写基本代码 >>> 再优化 >>> 抽离共用组件 >>> 可以上线的代码
(2) 了解实时应用开发方式

### 2-1.介绍React开发环境
(1) npm run eject 弹出配置文件, 可以自定义配置webpack.

### 2-2.es6常用语法
(1) let和const       
(2) 字符串模板 ``        
```
能够读取换行符
console.log(`
  aaa
  bbb
  ccc
  ddd
  eeez
`);

```
(3) 函数扩展
```
1.参数默认值
const hello = (name = 'imooc') => {
  console.log(`hello ${name}`);
};
hello(); // hello imooc
hello('woniu');// hello woniu
        
2.箭头函数
setTimeout(() => {
    console.log('xxx');
},1000)
        
3.展开运算符
const hello1 = (name1, name2) => {
  console.log(name1, name2);
};

let arr = ['imooc', 'woniu123'];
hello1(...arr);
        
```
(4) 对象扩展
```
1.Object.keys, values, entries
const obj = {name: 'imooc', course: 'React开发app'};
console.log(Object.keys(obj));
console.log(Object.values(obj));
console.log(Object.entries(obj)); // 把对象压成一个数组
// 0: (2) ["name", "imooc"]
// 1: (2) ["course", "React开发app"]
        
2.对象方法简写, 计算属性
const name = 'imooc';
const obj = {
  name: name, // 原写法
  name, // 简写
  hello: function () { // 原写法
  },
  hello1() { // 简写
  },
  [name]: 'hello' // 计算属性
};
console.log(obj);
        
3.展开运算符
作用: 合并对象
const obj = {name: '', course: 'React'};
const obj2 = {type: 'IT', name: 'woniu'};
console.log({...obj, ...obj2, date: '2019'});

```  

(5) 解构赋值
(6) 类
(7) 新数据结构:
```
1.Set, 元素不可重合
2.Map, 对象的扩展
3.Symbol, 生成不重复的变量

```

(8) 装饰器???
(9) Async/Await
(10) 导入/导出
```
// type1
export const hello1 = () => {
  console.log('[const 变量函数]');
};
        
// type2
export function hello2() {
  console.log('[function 函数]');
};
        
import {hello1, hello2} from './mod2';
hello1();
hello2();
        
----- 
        
// type1
export default function hello3() {
  console.log('[const 变量函数 export default]');
}
        
// type2
export default function hello4() {
  console.log('[function 函数 export default]');
};
               
import hello3 from './mod2';
import hello4 from './mod2';
        
hello3();
hello4();
        
----- 
import * as mod2 from './mod2';
导出mod2.js中所有函数/变量
        
mod2.hello1();
mod2.hello2();
mod2.hello3();
mod2.hello4();
        
```
(11-1) 常用的代码片段 --- 数组部分
```
// 遍历数组
[1, 2, 3].forEach((value) => {
  console.log('[遍历数组]', value);
});
        
// 映射新数组
let arr = [1, 2, 3].map(v => v * 2);
console.log(arr); // [2,4,6]
        
// 所有元素是否通过测试
let test1 = [1, 2, 3, 4].every(v => v > 3);
console.log("[所有元素是否通过测试]", test1); // false
        
// 是否有元素通过测试
let test2 = [1, 2, 3, 4].some(v => v > 3);
console.log("[是否有元素通过测试]", test2); // true
        
// 过滤数组
let test3 = [1, 2, 3, 4, 5].filter(v => v > 3);
console.log("[过滤数组]", test3); // [4,5]
        
// 查找符合条件的元素
arr = [{name: 'xiaoming', age: 18}, {name: 'xiaohua', age: 40}];
console.log("[查找符合条件的元素]", arr);
        
// 查找索引
let result = [1, 2, 3].indexOf(2);
console.log("[查找索引]", result); // 1
        
// 连接数组
let arr1 = [1, 2, 3];
let arr2 = [4, 5, 6];
let result2 = [...arr1, ...arr2];
console.log("[连接数组]", result2); // [1,2,3,4,5,6]
        
// 数组去重
let arr3 = [1, 2, 3, 4, 3, 2, 1];
let result3 = [...new Set(arr3)];
console.log("[数组去重]", result3); // [1,2,3,4]
                
```

(11-2) 常用的代码片段 --- 对象部分
```
// 获取对象的key
let keys = Object.keys({name: 'imooc', age: 1});
console.log("[获取对象的key]", keys); //  ["name", "age"]
        
// 获取对象里数据的数量
let count = Object.keys({name: 'imooc', age: 1}).length;
console.log("[获取对象里数据的数量]", count); // 2
        
// 遍历对象
let content = Object.entries({name: 'imooc', age: 1});
console.log("[遍历对象]", content);
// 0: (2) ["name", "imooc"]
// 1: (2) ["age", 1]
        
// extend功能(合并对象)
const obj = {name: 'imooc', age: 3};
const newObj = {...obj, job: 'IT', age: 18};
console.log("[extend功能(合并对象)]", newObj); // {name: "imooc", age: 18, job: "IT"}
        
// 获取列表的头和尾
const [head, ...tail] = [1, 2, 3];
const [last, ...initial] = [1, 2, 3].reverse();
console.log("[获取列表头]", head); // [获取列表头] 1
console.log("[获取列表尾]", last); // [获取列表尾] 3  
        
```


(11-3) 展开运算符用处
```
1.合并对象
const obj = {name: '', course: 'React'};
const obj2 = {type: 'IT', name: 'woniu'};
console.log({...obj, ...obj2, date: '2019'});
        
2.连接数组
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
console.log([...arr1, ...arr2]);
        
3.函数传参
const hello = (name1, name2) => {
    // ...
};
        
let arr = ['imooc', 'woniu123'];
hello([...arr]);
        
```



### 2-3.Express + mongodb基础1
(1) express + mongodb + mongoose        
(2) nodemon插件
```
npm install -D nodemon
        
nodemon server.js
```
(3) 其他特性:
```
res.send() >>> 返回文本
        
res.json() >>> 返回json
        
res.sendfile() >>> 返回文件        
```

### 2-4.Express + mongodb基础2
(1) mongodb安装 >>> 官网                       
(2) mongoose安装 >>> 通过mongoose操作mongodb, 存储的就是json     
```
npm install mongoose -D

```
(3) mongod后台启动      
```
mongod --config /usr/local/etc/mongod.conf
```
(4) express使用body-parser 支持post参数       
(5) 使用cookie-parser存储登录信息cookie     
(6) find和findOne 
```
1.find({})返回1个数组      
2.findOne({})返回1个对象
```


### 3-1.React基础知识回顾
(1) JSX实际执行的
```
function foo(props) {
    return <h2> hello, {props.name}</h2>
}

JSX实际执行的: 是一串js代码: 
function foo(props) {
    return React.createElement(
    "h2",
    null,
    " hello,"
    props.name
);
}
    
``` 

(2) 传递数据: 属性的形式, this.props 
(3) React生命周期
```
1.初始化周期
2.组件重新渲染生命周期
3.组件卸载生命周期

componentWillMount(): 组件马上就要加载了
render(): 组件正在加载了
componentDidMount(): 组件加载完毕

```
(4) antd-mobile按需加载
```
安装: 
npm install antd-mobile --save

文档:
https://mobile.ant.design/docs

全局加载:
import {Button} from 'antd-mobile';
import '../node_modules/antd-mobile/dist/antd-mobile.css';

按需加载:
1.安装react-app-rewired和customize-cra插件
npm install react-app-rewired customize-cra --save-dev

2.修改package.json文件
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test --env=jsdom",
    "eject": "react-scripts eject"
}

3.安装react-scripts插件
npm install react-scripts

4.在项目根目录下创建文件config-overrides.js

5.安装babel-plugin-import插件(用于按需加载)
npm install babel-plugin-import --save-dev

6.在config-overrides.js中添加代码
+ const { override, fixBabelImports } = require('customize-cra');
+ module.exports = override(
+   fixBabelImports('import', {
+     libraryName: 'antd-mobile',
+     style: 'css',
+   }),
+ );

7.使用antd组件
import { Button } from 'antd-mobile';

```


### 4. Redux复习
1.Redux最基本的api
```
import {createStore} from 'redux';      
        
// 创建reducer
function counter(state = 0, action) {
  switch (action.type) {
    case '加机关枪':
      return state + 1;
    case '减机关枪':
      return state - 1;
    default:
      return 10;
  }
}       
        
// 新建store
const store = createStore(counter);
        
// 初始状态
const init = store.getState();
console.log(init);
        
// 订阅一个事件
function listener() {
  const current = store.getState();
  console.log(`现在有机枪${current}把`);
}
        
store.subscrib e(listener);
        
// dispatch
store.dispatch({type: '加机关枪'});
console.log(store.getState());
store.dispatch({type: '加机关枪'});
console.log(store.getState());
store.dispatch({type: '加机关枪'});
console.log(store.getState());
store.dispatch({type: '减机关枪'});
console.log(store.getState());
        
/**
 * redux最基本的api
 * */
```

2.更进一步      
(1) 处理异步 --- redux-thunk插件      
```
import {createStore, applyMiddleware} from 'redux';
        
import thunk from 'redux-thunk';
            
import counter from './index.redux.js'; // reducer
        
const store createStore(counter, applyMiddleware(thunk));

```
(2) 调试工具 --- redux-devtools-extension插件
```
redux-devtools-extension插件使用
        
import {createStore, applyMiddleWare, compose} from 'redux';
import counter from './index.redux.js';
                
const store = createStore(counter, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f
));

```

(3) 更优雅的和react结合 --- react-redux插件      
```
1.Provider组件在应用的最外层, 传入store即可, 只用一次
2.Connect负责从外部获取组件需要的参数
3.Connect可以使用装饰器来实现

Provider使用
import { Provider, connect } from 'react-redux';
// ... 此处省略了 App组件, store创建的过程

ReactDom.render((
    <Provider store={store}>
        <App />
    </Provider>
), document.getElementbyId('root'));

connect使用
import { connect } from 'react-redux';

class App extends React.Component {
    render() {
        return (
            <div>
                <button onClick={()=>this.props.addBook}>添加1本书</button> 
                <button onClick={()=>this.props.removeBook}>删除1本书</button>  
                <button onClick={()=>this.props.addBookAsync}>等待2秒, 添加1本书</button>   
            </div>
        )
    }
}

const mapStateToProps = () => ({
    num: state // 这里state表示变量名称
});

const actionCreators = {addBook, removeBook, addBookAsync};

+本质上调用了addBook() >>> addBook()返回的{type: ''}对象, 会自动被dispatch(...)出去

export default connect(mapStateToProps, actionCreators)(App);

```
(4) 使用装饰器来写connect      
```
1. npm run eject
        
2. npm install babel-plugin-transform-decorators-legacy --save-dev 插件
        
3. 配置package.json

  "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ]
    ]
  }
    
4. 由于使用Antd-mobile, 在之前经过一些配置, 在这里对根目录下的config-overrides.js进行修改
const {
    override, 
    fixBabelImports, 
+   addDecoratorsLegacy
       } = require('customize-cra');

module.exports = override(
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: 'css'
  }),
+ addDecoratorsLegacy()
);
 
 
```

3.React Router4     
(1) BrowserRouter, 用来包裹整个应用          
(2) Router路由对应渲染的组件, 可以嵌套               
(3) Link跳转专用                
(4) 属性值:                
```
1. exact: 表示路径完全匹配
2. switch: 表示只渲染命中的第一个Route
3. Redirect组件 跳转
4. url参数, Route组件参数可以用冒号标识参数
```
(5) 冒号标识参数 + Switch 制作一个404页面           
```
<Route path='/:location' component={NotFound}/>
```
(6) Redirect和Link的区别        
```
Link: 是需要点击才能实现跳转的
Redirect: 是可以在代码中直接执行的, 最简单的例子就是可以参与三元运算符, 来实现跳转

{this.props.isAuth ? <Redirect to='/dashboard' /> : null}

```
 
4.实现简单的 '登录' 和 '页面' 的功能        
5.合并reducer --- combineReducers        
6.路由信息:        
```
1.url:'/dashboard' 表示1个实际的路由
        
2.path:'/dashboard' 表示我们定义的路由, 可能后面会带参数
```

### 5-1 需求分析:        
(1) 用户中心, 登录, 注册, 完善信息(根据身份的不同, 填写不同的信息)        
(2) 拆分路由: 
```
不要登录信息的: Login和Register页面, 不需要权限认证
需要登录信息的: 获取用户登录信息, 未登录的用户跳转login页面
```       


### 5-2.前后端联调1
### 5-3.前后端联调2     
(1)ajax无法跨域                
(2)axios发送异步请求     
(3)端口不一致, 使用proxy配置转发       
(4)axios拦截器, 统一loading处理 


### 6-1.页面文件结构
1.公用组件放在Component文件夹下面     
2.页面放在Container文件夹下面
3.页面入口处获取用户信息, 决定跳转到哪个页面

#### 开发模式:
1.基于cookie用户验证
2.cookie 类似于一张身份卡, 登录后服务器端返回, 你带着cookie就可以访问受限路由资源
3.cookie的管理浏览器会自动处理


### 6-2.登录/注册页面实现
1.路由组件: 直接可以通过路由访问到的组件     
```
路由組件:
<Route path='/login' component={Login}/>

class Login extends React.Component {
    
   ...
   register(){
        this.props.history.push('/register');
   } 
   ...
}   
有些组件只是从父组件上, 拆分下来的组件, 那么路由不能直接访问到, 就不是路由组件了

import SlideFlat from './component/SlideFlat';

class SlideWrapper extends React.Component {
    render() {
        return (
            <div> 
                ...
                <SlideFlat/>
            </div>
        )
    }
}   
SlideFlat就不是路由组件    

```
2.登录页面/路由, 注册页面/路由, Logo公用组件 
3.组件内部的数据, 不走redux


### 6-3.(补充)
### 6-4.用户信息校验, 跳转等登录
1.解决AuthRoute不是一个路由组件
```
解决方法:
import {withRouter} from 'react-router-dom';
@withRouter // 装饰器写法. 不懂原理, 先这么写着

```
2.设置路由白名单
```
publicPath = ['/login', '/register'];
当访问的路由是白名单中的路由时, 我们跳过 "获取用户信息" 这个功能
当前路由获取方式: this.props.location.pathname
```

3.code值判断路由跳转
```
当 {code :0} 时, 表示 获取用户信息成功, 可以访问
当 {code :1} 时, 表示 获取用户信息失败, 跳转, this.props.history.push('/login');

```

### 6-5.注册(本地)交互实现
1.设置本地state变量
```
// es7写法
state = {
    "user":"",
    "pwd":"",
    "repeatPwd":"",
    "type":"genius"
}
```
2.给InputItem添加onChange事件
```
es7 + 受控组件 === 怎么写, 忘记了, 需要查询

handleChange(key, value) {
    this.setState(() => ({
        [key]: value
    }));
}
```

3.给InputItem组件添加type属性
```
<InputItem onChange={(v) => this.handleChange('', v)} type="password"></InputItem>
```

### 6-6.注册请求发送
1.创建user.redux.js
2.编写constants常量
```
const REGISTER_SUCCESS = 'user/REGISTER_SUCCESS';
const ERROR_MSG = 'user/ERROR_MSG';
```
3.编写errorMsg错误信息actionCreators
```
const errorMsg = (msg) => ({
    type: ERROR_MSG,
    msg
});
```
4.发送注册请求: '/user/register'
```
axios.post('/user/register', {user,pwd,phone,type})
    .then(res => {
        // ...
    })
    .catch(err => {
        // ...
    });
```
5.结果处理: 成功/失败
```
if(res.status === 200 && res.data.code){
    dispatch(registerSuccess(res.data.data));
}else {
    dispatch(errorMsg(res.data.msg));
}
```
6.规定(后端字段返回): 
```
正确: res.data.data
失败: res.data.msg
```
7.存放默认信息
```
isAuth: 是否登录
msg: 错误信息
user: 用户名称
pwd: 密码
phone: 手机号
type: 用户类型
```
8.判断不同的action.type
```
case REGISTER_SUCCESS:
    return state.merge({
        isAuth: true,
        msg: '',
        user: '',
        pwd: '',
        phone: '',
        type: ''
    });
case ERROR_MSG:
    return state.merge({isAuth:false,msg:action.msg});
```
9.注册成功actionCreators/registerSuccess
```
const registerSuccess = (data) => ({
    type: REGISTER_SUCCESS,
    payload: data
});
```
10.使用connect将user.redux.js连接起来
```
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux.js';

@connect(
    state => state.user,
    {register}
)

this.props.register({...});
```
11.错误在register.js页面展示
```
import {connect} from 'react-redux';

@connect(
    state => state.user,
    {}
)

render() {
    {this.props.msg ? <p style={{color: "red"}}>{this.props.msg}</p> : null}
}
```

### 6-7.数据库模型建立
1.动态创建model
```
const models = {
    user : {
        user: {type: String, required: true},
        pwd: {type: String, required: true},
        phone: {type: String, required: true},
        type: {type: String, required: true},
        avatar: {type: String},
        desc: {type: String}
    },
    chat :{},
    ...
};

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]));
}

module.exports = {
    getModel(name){
        return mongoose.model(name); // 返回一个副本
    }
}

```
2.传入参数, 获取已经创建的model
```
const model = require('./model');
const UserModel = model.getModel('user');

```
3.使用:
```
Router.get('/list', function(req,res){
    UserModel.find({}, function(err, doc){
        if (err) {
            return res.json({code: 1, msg: err});
        }
        return res.json({code: 0, data: doc});
    })

});

```


### 6-8.express注册功能实现
1.安装body-parser来解析post请求, 接收post参数
```
npm install body-parser --save-dev
```

2.安装cookie-parser来解析cookie的
```
npm install cookie-parser --save-dev
```

3.Mongodb基本命令      
https://www.jianshu.com/p/0a52c672ae78
```
show dbs: 显示数据库列表
use imooc: 切换到imooc数据库
show collections: 显示数据库中的集合
db.users.find(): 查找users集合中所有数据
db.users.drop(): 删除users集合
```

4. 注意find()和findOne()的区别
```
1.find() 返回一个数组[...]
2.findOne() 返回一个对象{...}
```

5.注册路由实现:
```
(1)接收参数
(2)用户名不能重复
(3)保存到数据库

server.js
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(cookieParser());
app.use(bodyParser.json());

users.js
const model = require('./model');
const UserModel = model.getModel('user');

Router.post('/register', function(req, res){
    const {user, pwd, phone, type} = req.body;
    UserModel.findOne({user}, function(err, doc){
        if (doc) {
            return res.json({code: 1, msg: '用户名已经存在'});
        }
        UserModel.create({use,pwd,phone,type},function(err,doc){
            if(err){
                return res.json({code:1, msg:'后台出错'});
            }
            return res.json({code:0, data:doc});
        })
    })
})

```

### 6-9登录注册-前后端联调
1.前后端联调     
2.先清除原user中的数据      

### 6-10.登录注册跳转+密码加密实现
1. 在user.redux.js中新增redirectTo字段, 用于注册成功后, 跳转目标
```
const defaultState = {
    ...
    'redirectTo': '', // 跳转目标
};

```      
2. 新增utils文件, 添加getRedirectToPath()的方法        
(1) user.type /boss /genius     
(2) user.avatar 判断用户是否完善个人信息 /bossinfo /geniusinfo      
(3) 在注册页面添加跳转逻辑 
```
utils.js 
export const getRedirectToPath = ({avatar, type}) => {
    // 根据用户类型决定 /boss 还是 /genius
    let url = (type === 'boss') ? '/boss' : '/genius';
    if(!avatar){ // 没有头像 >>> 用户信息没有完善 >>> /bossinfo 或 /geniusinfo页面
        url += 'info';
    }
    return url;
};

register.js跳转
import {Redirect} from 'react-router-dom';

render () {
    return (
        ...
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        ...
    ) 
}

```    
3. express后端对密码加密 www.cmd5.com      
(1)md5是单向的, 非对称加密      
(2)雪崩效应, 内容变化了, 密文完全变化了        
(3)utility插件
```
npm install utility --save-dev     
```
(4)utils.md5(pwd)      
(5)md5不可逆向     
(6)彩虹表 --- 保存常用md5 --- 暴力破解 --- 加盐 + 两层md5   
```
const utils = require('utility');

function md5Pwd(pwd) {
    const salt = 'diadem_adinno_1234567890~!@#$%^&*()';
    return utils.md5(utils.md5(pwd+salt));
}

使用
UserModel.create({user, pwd: md5Pwd(pwd), phone, type}, ...);

```  

### 6-11.登录注册-登录注册实现
1.Login页面给InputItem添加onChange事件(和register页面相似) 
```
onChange={(v) => this.handleChange('user', v)}
onChange={(v) => this.handleChange('pwd', v)}

handleChange = (key, val) => {
    this.setState(() => ({
        [key]: val
    }));
};
```    
2.Login页面给Button登录按钮添加OnClick事件(和register页面相似) --- login方法
```
import {connect} from 'react-redux';
import {login} from '../../component/login/';

@connect(
    state => state.user,
    {login}
)

handleLogin = () => {
    this.props.login(this.state);
} 
```

3.导入@connect() 
```
>>> 导入state.user >>> msg字段 和 redirectToPath字段
>>> 导入login >>> 用于给Button登录按钮的onClick事件 
```
4.在user.redux.js中实现login方法(和register相似)
5.确定res.data返回值类型
```
res.data:
res.data.msg: 错误信息
res.data.data: 返回数据
```
6.在server端添加/user/login路由
```
登录失败: return res.json({code: 1, msg: '用户名或密码不对'});
登录成功: return res.json({code: 0, data: doc}); 
``` 
7.在返回字段中去除pwd字段
```
UserModel.findOne({...},{pwd:0},function(req,res){...});
```

### 6-12.登录注册-cookie保存登录状态
1.设置cookie
```
res.cookie("useid", doc._id);
```
2.在浏览器的/NetWork/Head下查看
```
set-Cookie: 查看cookie是否登录成功
```
3.在'/user/info'中, 添加cookie判断(获取cookie)
4.在find()和findOne()时, 不希望暴露 "pwd"字段, 所以我们定义一个统一的查询条件
```
const _filter = {pwd: 0, __v: 0};
```
5.在user.redux.js中添加loadData, 用于在获取用户信息成功后, 将用户信息更新到user.redux.js中       
6.@withRouter和@connect的顺序 
```
@withRouter()
@connect(...)
```
7.使用UserModel.save()代替UserModel.create()方法
```
UserModel.create()在创建后才能获取id
```
8.登录功能和注册功能, 成功后都要设置cookie
```
注册成功后返回字段: user, type, _id
```

### 7-1.完善信息-boss信息完善页面
1.选择头像, 输入你要找的工作, 你找招聘职位的信息, 等等           
2.添加完善信息的页面: /bossinfo, /geniusinfo          
3.bossinfo, geniusinfo存放在container下          
4.使用NavBar组件                
5.由于选择头像组件会在很多地方用到, 所以我们单独将它抽取成1个组件AvatarSelector       
```
/component/AvatarSelector/server.js
```       
6.InputItem: 招聘职位, 公司名称, 职位薪资, 职位简介             
7.使用TextareaItem组件, 自适应高度               
8.准备图片, 复制到/component/images下               
9.使用Grid组件, 展示图片:           
```
    <Grid>
```
10.制作图片名称列表, 按Grid组件的数据元要求, 转换成以下形式:               
```
const avatarList = 'boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'
    .split(',')
    .map((name) => ({
        icon: require(`../images/${name}.png`), // 注意, 这里使用require来加载图片
        text: name
    }));    
```
11.给Grid组件指定列数      
```
由于准备了15张图片, 所以定义成3*5列, 指定列columnNum={5}
    <Grid
        data={avatarList}
        columnNum={5} // 每行显示5列
        ...
    />
```

12.给Grid组件添加点击事件
```
AvatarSelector.js
    <Grid
        data={avatarList}
        columnNum={5}
        onClick={(el) => { // 点击事件
            this.props.selectAvatar(el.text); // 父组件传递进来的方法, 更新数据到父组件的state
        }}
    />
    
BossInfo.js
    ...
    <AvatarSelector selectorAvatar={(imgName) => {
        this.setState({
            avatar: imgName // 保存到BossInfo组件状态
        });
    }}/>   
    
```

13.AvatarSelector组件维护自己内部的状态        
```
    state = {
        icon: '',
        text: ''
    }
    
    ...
    <Grid 
        data={avatatList}
        columnNum={5}
        onClick={(el) =>{
             this.setState(()=>(el)); // AvatarSelector组件维护自身内部的状态
             this.props.selectAvatar(el.text);
        }}
    />

```

15.显示选中的头像      
```
const gridHeader = this.state.icon 
    ? (
        <div>
            <span>已选择头像:</span>
            <img style={{width:"30px"}} src={this.state.icon} alt=""/>
        </div>
    )
    : '请选择头像';

import {List} from 'antd-mobile';
<List renderHeader={() => gridHeader}>
    <Grid>
</List>
```
16.使用List组件将gridHeader包裹在renderHeader属性中                
17.使用List组件包裹Grid组件             
```
import {List} from 'antd-mobile';
<List renderHeader={() => gridHeader}>
    <Grid>
</List>
```

18.技巧: 在浏览器的f12/React/搜索当前组件bossinfo, 选择头像+输入信息后, 看到右侧React的state字段变化了, 方便调试        
19.保存boss完善信息, 实现update()函数     
```

/user/update
```
20.redirectTo跳转页面

### 7-2.完善信息-boss信息完善页面后端
1.保存boss完善信息, 实现update()函数
```
import {connect} from 'react-redux';
@connect(
    state => state.user,
    {update}
)
<Button onClick={() => {
    this.props.update(this.state); // this.state === title + company + money + desc + avatar
}}>保存</Button>

export const update = () => {
    return dispatch => {
        axios.post('/user/update', data) // 向后端/user/update路径发送更新信息
            .then(...)
    }    
};

```

2.编写后端user.js路由
```
Route.post('/update', function(req, res){
   const {userid} = req.cookies; // 需要cookies验证
   if (userid) {
        return res.json({code:1, msg:'找不到userid'});
   }
   const body = req.body;
   UserModel.findByIdAndUpdate(userid, body, function(err, doc){
        if (err) {
            return res.json({code:1, msg:'后台出错'}); 
        }
        const data = Object.assign(
        {},
        {
            user: doc.user,
            type: doc.type
        },
        body
        );
        return res.json({code:0,data: data}); // {user, type, title, desc, avatar}
   });
})

注意是findByIdAndUpdate(userid, ...)
如果是findOneAndUpdate({_id: userid}, ...)

注意: req.cookies 不要写成 res.cookies
注意: req.body 不要写成 res.body
```

3.当bossinfo信息完善后, 再次访问/bossinfo时, 应该主动跳转到/boss页面 --- 存在Bug
```

```

4.在'/bossinfo'页面中重定向到'/bossinfo'的错误
```
错误发生原因:
当login/register成功后, 会在 LOGIN_SUCCESS/REGISTER_SUCCESS中 
通过getRedirectToPath(头像是否设置) 来决定不同的路由.

login发生在注册成功, 没有完善信息的情况下
register完成后, 一般没有设置avatar === undefined, 
url === getRedirectToPath() >>> {redirectTo: '/bossinfo'}

进入bossinfo页面, 

bossinfo的render(){}函数中有
{redirectTo ? <Redirect to={redirectTo}/> : null}

形成在bossinfo页面中, 重定向到bossinfo的情况

*** 课程中在这里报错了, 但是我的项目中没有报错.

{redirectTo && redirectTo !== this.props.location.pathname} ? <Redirect to={redirectTo} /> : null}

```


### 7-3.完善信息 --- 牛人信息完善和组件属性类型检测
1.geniusinfo 页面大致仿照 bossinfo 页面     
2.在Redux中保存的数据, 去除pwd字段     
```
const {pwd, ...data} = obj; // 去除pwd字段, 也可以在后端处理掉

后端处理掉: 
const filter = {pwd: 0, --v: 0}; // 过滤条件
UserModel.find({_id: userid}, {filter}, function (req,res){...})

```

3.对从父组件传入的方法参数selectAvatar, 进行属性校验      
```
  import PropTypes from 'prop-types';
  
  AvatarSelector.propTypes = {
      selectAvatar: PropTypes.func.isRequired
  };
  或
  static propTypes = {
      selectAvatar: PropTypes.func.isRequired
  };
  
```

### 8-1.牛人列表 --- 应用骨架
1.编写4个页面        
```
boss页面
genius页面
me个人中心页面
msg消息列表

4个页面具有相同的骨架结构
----------
header
----------
4个页面
boss页面
genius页面
me个人中心页面
msg消息列表
----------
底部导航栏
----------

```
2.当Route不指定path属性参数时, 如果前面没有命中路由, 则会匹配最后的路由(组件)     
```
<Router>
    <Switch>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/bossinfo' component={BossInfo}/>
        <Route path='/geniusinfo' component={GeniusInfo}/>
        <Route component={DashBoard}/>
    </Switch>
</Router>
如果'/login', '/register', '/bossinfo', '/geniusinfo'路由都没有命中时, 则会渲染DashBoard组件

```
3.登录成功后, 所有页面都归DashBoard来管理, 包括 '/boss', '/genius', '/me', '/msg' 页面        
4.实现DashBoard组件     
```
在DashBoard组件中, 实现嵌套路由, 子路由包括: '/boss', '/genius', '/me', '/msg'
在DashBoard组件中, 顶部组件 --- NavBar
                  底部组件 --- TabBar --- 对TabBar做一次封装 --- NavLinkBar
```

### 8-2.导航和跳转
1.制作数据元数组
```
const navList = [
    {
        path: '/boss',
        text: '牛人',
        title: '牛人列表',
        icon: 'boss',
        component: Boss,
        hide: user.type === 'genius'
    },
    {
        path: '/genius',
        text: 'boss',
        title: 'boss列表',
        icon: 'job',
        component: Genius,
        hide: user.type === 'boss'
    },
    {
        path: '/msg',
        text: '消息',
        title: '消息列表'
        icon: 'msg',
        component: Msg
    },
    {
        path: '/me',
        text: '我',
        title: '个人中心',
        icon: 'user',
        component: Me
    }
];

```

2.使用NavBar显示顶部标题栏数据 
```
import {NavBar} from 'antd-mobile';
<NavBar>{navList.find((v) => v.path === pathname).title}</NavBar>

访问不同的页面, 得到对应的pathname
例如: 
访问 '/boss' >>> pathname === '/boss', 匹配第一项, 渲染{title: '牛人列表'}
访问 '/genius' >>> pathname === '/genius', 匹配第二项, 渲染{title: 'Boss列表'}
访问 '/msg' >>> pathname === '/msg', 匹配第三项, 渲染{title: '消息列表'}
访问 '/me' >>> pathname === '/me', 匹配第四项, 渲染{title: '个人中心'}

```

3.使用Switch和Route制作子路由
```
import {Switch, Route} from 'react-router-dom';

<Switch>
    {
        navList.map((item, index) => {
            return (
                <Route 
                    key={item.path}
                    to={item.path}
                    component={item.component}
                />
            )
        })
    }
</Switch>

```

4.对antd-mobile的组件TabBar(底部导航栏)做一次封装, 并传入data属性
```
import NavLinkBar from '../../component/navlinkbar';

<NavLinkBar data={navList}/>

```

5.NavLinkBar组件 --- 属性校验
```
import PropTypes from 'prop-types';

// 新写法
static propTypes = {
    data: PropTypes.array.isRequired
};

```

6.过滤掉navList中{hide:true}的对象
```
// 传递过来的数据
const data = this.props.data;
const navList = data.filter( v => !v.hide); // filter返回值为true的item, 取反, 过滤掉{hide:true}的数据

目的:
1.在访问以boss页面访问dashbord时, genius页面隐藏, {hide: user === '/boss'}
2.在访问以genius页面访问dashboard时, boss页面隐藏, {hide: user === '/genius'} 

```

7.将navList数据渲染到TabBar
```
<TabBar>
    {
        navList.map((item) => {
            return (
                <TabBar.Item
                    key={item.path}
                    icon={{uri: require(`./images/${item.icon}.png`)}}
                    selectedIcon={{uri: require(`./images/${item.icon}-active.png`)}}
                    selected={pathname === item.path}
                    onPress={() => {
                        this.props.history.push(item.path);
                    }}
                >
                </TabBar.Item>
            )
        })
    }
</TabBar>

由于NavLinkBar不是路由组件, 所以需要使用 withRouter
import {withRouter} from 'react-router-dom';
@withRouter
class NavLinkBar ... 

```

8.问题: TabBar添加了tabBarPosition='bottom'属性, 但是TarBar没有出现在底部
```
手动修改: 
给TabBar的外层添加一个<div>标签

<div style={{"position":"fixed", "bottom":"0", "width":"100%"}}>
    <TabBar>
    </TabBar>
</div>

```


### 8-3.牛人列表 --- 牛人列表
1.dashboard组件的NavBar组件固定在顶部     
```
<NavBar style={{"position":"fixed", "top":"0", "width":"100%"}}>
    ...
</NavBar>
```
2.实现Boss组件: /component/boss     
3.在Boss组件的componentDidMount()中发起axios请求, 保存数据到本地(后续保存到Redux中)       
```
state = {
    data: []
}

compnentDidMount() {
    axios.get('/user/list?type=genius')
        .then(res => {
            if (res.status === 200 && res.data.code === 0){
                this.setState(() => ({
                    data: res.data.data
                })); 
            }
        });
}

```
4.修改后端user.js
```
Router.get('/list', function(req, res){
    const {type} = req.query;
    UserModel.find({type}, function(err, doc){
        if (err) {
            return res.json({code: 1, msg: '后端出错'});
        }
        return res.json({code: 0, data: doc});
    })
})

post请求: req.body
get请求: req.query
```

5.使用Card组件(antd-mobile)将后端请求到的数据, render()渲染到页面
```
const Header = Card.Header;
const Body = Card.Body;
const Footer = Card.Footer;

判断用户头像avatar是否存在?
return (
    this.state.data.map((item, index) => {
        return (
            item.avatar 
                ? (
                    <Card key={item._id}>
                        <Card.Header>...</Card.Header>
                        <Card.Body>...</Card.Body>
                        <Card.Footer>...</Card.Footer>
                    </Card>
                )
                : null
        )
    })
)

```

6.对Card.Body内容的换行显示     
```
<Card.Body>
    {
        item.desc.split('\n').map((d,index) => {
            return (
                <div key={index}>{d}</div>
            )
        })
    }
</Card.Body>
```

8-4.牛人列表 --- 使用redux管理牛人列表      
1.创建chat.redux.js, 将数据移植到redux中     
```
import {connect} from 'react-redux';
import {getUserList} from '../../redux/chatuser.redux.js';
@connect(
    state => state.chat,
    {getUserList}
)    
修改:
{
    this.props.userList.map(...)
}
修改:
componentDidMount() {
    this.props.getUserList('genius'); // boss页面请求的是牛人genius列表
}

```
2.创建getUserList, 并传入参数'genius'来获取genius牛人列表
```
export const getUserList = (type) => {
    return dispatch => {
        axios.get('/user/list?type='+ type)
            .then(res => {
                if(res.status === 200 && res.data.code === 0){
                    dispatch(userList(res.data.data));
                }else {
                    dispatch(userList(res.data.msg));
                }
            });
    }
};  
```
3.合并reducer, chatuser.redux.js
```
import {combineReducers} from 'redux';
import chat from '../../redux/chatuser.redux.js';
export default combineReducers({..., chat});

```


### 9-1.boss列表和组件优化
1.Genius仿照Boss页面来写      
2.对antd-mobile的<Card>组件做封装 --- UserCard     
```
1.属性校验

2.当type === 'boss'时, 显示公司和薪水信息
牛人 >>> 请求的是boss信息 >>> boss信息的type字段{type: 'boss'}
牛人能够看见boss标注的薪水情况和薪水信息

```

### 9-2.个人中心信息展示1
### 9-3.个人中心信息展示2
1.所有信息都已经存放在Redux中, 取出来显示, 注意: 不要pwd字段      
2.注销/退出登录 按钮  
```
impot {List} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;
<List>
    <Item>退出登录</Item>
</List>
```      
3.高阶组件 简单优化组件       
4.实现User --- 个人中心页面
```
1.三元运算符 (props.user ? '个人中心页面' : null)
    render(
        props.user 
                ? (
                    <Result 
                        img={显示头像}
                        title={用户名}
                        message{如果type==='boss', 显示公司信息}
                    />
                ) 
                : null 
    )
```     
5.使用antd-moblie的Result组件  
```
使用<Result>组件图像
<Result 
    img={<img src={require(`../images/${props.avatar}.png`)} alt=''/>}
    ... 
/>

这个图像的加载方式比较绕, 要记一下

```       
7.使用List, List.Item, Brief组件  
```
import {List} from 'antd-mobile';

const Item = List.Item;
const Brief = Item.Brief;
...
```      
8.List.Item的多行设置 >>> 当标题很长的时候, 不会在结尾使用 '...'(截取多余部分来显示...)
```
设置multipleLine属性
<Item multipleLine>
    ...
</Item>
```      
### 9-4.清除cookie登录状态
1.介绍cookie
(1)name: userid >>> cookie名字
(2)val: 12dip13jlkdhao >>> cookie值
(3)Domain: 当前cookie只在domain(localhost)域名下有用
(4)path: 在哪个路径下, 设置cookie
(5)expires: session表示过期时间是由后端来定的
(6)size: cookie的大小
(7)SameSite: csrf防御
2.安装cookie管理库
```
npm install browser-cookies --save-dev

清除coookie
import browserCookie from 'browser-cookies';
browserCookie.erase('userid');
```
3.给'退出登录'绑定事件 + 使用antd-mobile来制作弹窗Modal对话框组件
```
<Item onClick={() => this.logout()}>退出登录</Item>

import {Modal} from 'antd-mobile';
import browserCookie from 'browser-cookies';
logout = () => {
    const alert = Modal.alert;
    alert('注销', '确认退出登录吗???', [
        {text:'取消', onPress: () => console.log('取消')},
        {text:'确认', onPress: () => browserCookie.erase('userid')} // 删除浏览器端的cookie
    ])
}

```

### 9-5.注销时清空redux数据
1.目的: 清除redux, 并跳转到正确的页面  
```
在redux中实现actionCreators, 这里没有请求数据
import {logoutSubmit} from '../../redux/user.redux.js';
@connect(
    state => state.user,
    {logoutSubmit}
)

... 
{
    text:'确认', onPress: () => {
    browserCookie.erase('userid'); // 删除cookie
    this.props.logoutSubmit();
    }
}

```         
2.reducer中使用初始状态defaultState, 并修改redirectTo:'/login'
```
case LOGOUT_SUBMIT:
    return {...defaultState, redirectTo: '/login'};
```

3.警告
```
当设置redirectTo: '/login'时, 所有用到rediectTo的页面都会跳转
但有1个特殊情况, 就是login页面
login页面也有用到redirectTo, 这个redux中的数据.
会造成在login页面中跳转'/login'的错误.

解决方法:
在login页面中加1个判断

(this.props.redirectTo !== '/login' && ...) ? "..." : "...";

```


### 9-6.使用高阶组件完善登录流程 --- 概念理解 - 函数式编程
1.login.js登录页面和register.js注册页面都拥有共有函数:
```
handleChange(key, val) {
    this.setState(() => ({
        [key]: vale
    }));
}

重复代码, 有没有更好的表现方式, 思考???

```

2.概念理解 --- !!!非常重要
```
(1)函数可以作为参数
(2)函数可以当返回值

```

3.高阶函数 --- 传递进来一个函数, 返回另一个函数 --- 装饰器模式
```
let hello = () => {
    console.log('hello world I love React');
}

const WrapperHello = (fn) => {
    return () => {
        console.log('before hello world');
        fn();
        console.log('after hello world');
    }
}

hello = WrapperHello(hello);
hello();

打印结果:
before hello world
server.js:10 hello world I love react
server.js:18 after hello world

```

### 9-7.简单的高阶组件demo
1.高阶组件: 传递进来一个组件, 返回一个新的组件
```
function WrapperHello(Comp) {
    class WrapComp extends React.Component {
        render(){
            return (
                <div>
                    <p>这是HOC高阶组件的特有元素</p>
                    <Comp {...this.props}/>
                </div>
            )
        }
    }
    
    return WrapComp;
}

class Hello extends React.Component {
    render(){
        return (
            <div>hello imooc | I love React&Redux</div> 
        )
    }
}

Hello = WrapperHello(Hello);

```

2.高阶组件的'@'简写方式:
```
function WrapperHello(Comp) {
    class WrapComp extends React.Component{
        render(){
            return (
                <div>
                    <p>这是HOC高阶组件的特有元素</p>
                    <Comp {...this.props}/>
                </div>
            )
        }   
    };
    
    return WrapComp;
}

@WrapperHello

class Hello extends React.Componente {
    render() {
        return (<div>hello imooc | I love React&Redux</div>)
    }
}

```

3.高阶组件分为2个部分:               
(1)属性代理: 上面的WrapperHello高阶组件 就属于 属性代理
(2)反向继承:        

### 9-8.使用imoocFrom高阶组件优化代码
1.属性代理: 给原有组件(组件作为参数传递进来)        
(1)添加其他属性: name='text'      
(2)添加其他元素: p
```
const WrapperHello = (Comp) => {
    class WrapComp extends React.Component {
        render() {
            return (
                <div>
                    <p>这是HOC高阶组件的特有元素</p> --- 添加其他元素
                    <Comp {...this.props} name='text'/> --- 添加其他属性
                </div>
            )
        }
    }
    return WrapComp;
};

```
2.反向继承:     
(1)返回的新组件不继承 extends React.Component{...}      
(2)继承最为参数传递进来的组件 extends Comp{...}
```
const WrapperHello = (Comp) => ({
    class WrapComp extends Comp { --- 反向继承
        componentDidMount() {
            console.log('高阶组件新增的生命周期, 加载完成');
        }
        render() {
            return (<Comp/>)
        }
    }
});
```

3.高阶组件的作用:      
(1)代码复用     
(2)逻辑抽象     

4.编写imooc-form高阶组件, 对表单封装, 封装对象:        
(1)handleChange
(2)this.state
```

```
5.{...this.props} --- 属性穿透              
6.在register.js中, 需要指定默认的注册类型type, 是boss还是genius
```
register.js

import imoocForm from '../../component/imooc-form';

@imoocForm
componentDidMount() {
    this.props.handleChange('type', 'genius');
}

```

### 10-1.socket.io简介
1.socket.io是什么?             
(1) 基于事件的实时双向通信库        
(2) 基于websocket协议 (ajax基于http协议)        
(3) 前后端通过事件进行双向通信       
(4) 配合express, 快速开发一个实时应用       

2.socket.io和ajax的区别     
(1) Ajax --- 基于http协议 --- 单向 --- 如果需要获取实时数据 --- 只能通过轮训来实现       
(2) Socket.io --- 基于websocket双向通信协议 --- 后端可以主动推送数据      
(3) 现代浏览器都支持websocket协议     
  
3.后端API
```
const io = require('socket.io')(http);
io.on(...); // 监听事件
io.emit(...); // 触发事件

```

4.前端API
```
import io from 'socket.io-client';
io.on(...); // 监听事件
io.emit(...); // 触发事件

```

5.插件安装
```
npm install socket.io --save-dev
npm install socket.io-client --save-dev
```

6.添加聊天chat路由
```
import Chat from '../component/Chat';
<Route path='/chat/:user' component={Chat}/>
user: 表示你要聊天的目标
```

7.新建Chat组件
```
路径: /component/Chat


```

8.给userCard.js添加点击事件, 实现跳转到聊天页面
```
usercard/server.js
usercard不是路由组件:
import {withRouter} from 'react-router-dom';

@withRouter
...

<Card
    onClick={this.handleClick()}
/>

handleClick = () => {
    this.props.history.push('/chat/:user');
}

```


### 10-2.socket.io前后端联调
1.修改后端代码:
```
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', function(socket){
    console.log('[user login]');
});

socket: 表示当前连接的socket
io: 表是全局的socket

最后修改, 不要忘记, 否则还是会报跨域的错误
将
app.listen(9093, function(){...});
改为
server.listern(9093, function(){...});

```

2.修改前端代码:
```
import io from 'socket.io-client';

componentDidMount() {
    const socket = io('ws://localhost:9093');
}

```

3.后端看到打印信息'[user login]', 表示连接成功.


### 10-3.前后端实时显示信息
1.制作本地消息发送组件, List + InputItem
```
import {List, InputItem} from 'antd-mobile';
<List>
    <InputItem
        placeholder='请输入消息'
        value={this.state.text}
        onChange={(v) => {
            this.setState(() => ({
                text: v
            }))
        }}
        extra={<span onClick={() => this.handleSubmit()}>发送</span>}
    />
</List>
```
2.通过socket.io-client, 将获取到的消息发送到后端
```
import io from 'socket.io-client';
const socket = io('ws://localhost:9093'); // 有跨域的问题, 所以这样写
```

3.发送完成, 清空state
```
handleSubmit = () => {
    socket.emit('sendMsg', this.state);
    this.setState(() => ({
        text: ''
    }));
}
```

4.后端监听'sendmsg'事件
```
socket.on('sendMsg', function(data){
    console.log(data);
})
```

5.广播接收到的消息
```
socket.on('sendMsg', function(data){
    io.emit('recv', data); // data: {text: '输入的文本内容'}
});

```

6.前端, 将socket.on监听移到componentDidMount(), 并修改this指向(箭头函数)
```
componentDidMount() {
    socket.on('recv', (data) => {
        // ...
    });
}
```

7.模拟展示列表(将监听到的消息, 存放到一个数组中去), 并展示
```
comonentDidMount() {
    socket.on('recv', (data) => {
        this.setState((prevState) => ({
            msg: [...prevState.msg, data.text]
        }));
    })
}

<div>
    {
        this.state.msg.map((item) => (
           <p key={item}>{item}</p>  
        ))
    }
</div>

```


### 10-4.聊天页面redux链接
1.后端定义 每条消息 保存到mongodb数据库的字段
```
注意: create_time字段定义
{
...
create_time: {type: Number, default: new Date().getTime()} // 消息发送时间戳
}

后续补上...

```
2.定义chat.redux.js保存 消息 的数据和操作
```

```
3.将chat.redux.js暴露给全局的reducer
```

```

4.在/component/chat.js中使用chat.redux.js
```
(1)将socket.io的代码先注释掉, 后续会移到chat.redux.js中
(2)
@connect(
    state => state, 
    {getMsgList}
)

调用属性: this.chat.props.xxx
        this.user.props.xxx

调用方法:
        this.props.getMsgList
!!!注意, 不要写成:
        this.chat.props.getMsgList


```
5.express后端写路由, 查询from是我这个userid + to是我这个userid 的消息
```
$or mongodb
$or: [ { <expression1> }, { <expression2> }, ... , { <expressionN> } ] }

const {userid} = req.cookies;
UserModel.find({'$or': [{from: userid}, {to: userid}]})

```
### 10-5.聊天功能实现 --- 上
1.usercard修改路由参数params, user >>> userid
```
usercard的handleClick事件
handleClick(item){
    this.props.history.push(`/chat/${item.user}`);
}
改为
handleClick(item){
    this.props.history.push(`/chat/${item._id}`);
}
```
2.修改chat发送事件
```
传递3个参数: from, to, text
const from = this.props.user._id;
const to = this.props.match.params.userid;
const text = this.state.text;
this.props.sendMsg({from, to, text});
```
3.在chat.redux.js中实现sendMsg()方法
```
将socket.io的
socket.io.on(...)监听 和 socket.io.emit(...)发送 都移植到redux中
而且都使用function 将它们都包裹起来, 再由外面的chat.js来使用这些function
```

4.express后端接收到消息
```
(1)制作from和to聊天的唯一id >>> chat_id
(2)将消息保存到mongodb数据库
(3)保存成功后, 将消息广播出去
```

5.前端chat.js使用redux的recvMsg函数监听广播
```
chat.redux.js
export const recvMsg = () => {
    return dispatch => {
        socket.on('recvMsg', function(data){
            dispatch(msgRecv(data));
        });
    }
};
... 

chat.js
import {recvMsg} from '../../redux/chat.redux';
@connect(
    ...
    {..., recvMsg}
)
componentDidMount(){
    ...
    this.props.recvMsg();
}


```
### 10-6.聊天功能实现 --- 下
1.redux接收到新消息, unread未读消息数 + 1
```

```
2.清空聊天数据
```
ChatModel.find({}, function(err, doc){
    if(err){
        return console.log('清空聊天数据失败');
    }
    return console.log('清空聊天数据成功');
});
```
3.展示聊天信息
```

```

4.使用antd-mobile的NavBar制作导航栏
```
```

5.使用antd-mobile的List制作展示列表(左,右区分开来)
```
import {List} from 'antd-mobile';

const Item = List.Item;
<List key={...}>
    <Item 
        thumb={左边头像}
    >
        {v.content}
    </Item>
</List>

<List>
    <Item 
       extra={右边头像}
    >
        {v.content}
    </Item>
</List>

```
6.不要在开2个chrome进行测试, 使用两种不同的浏览器进行测试

### 10-7.聊天未读数实时展示
1.将获取消息列表的redux函数 和 socket.io监听'sendMsg'事件 放到dashboard.js的生命周期内
```
dashboard.js

@connect(
    ...
    {getMsgList, recvMsg}
)
componentDidMount(){
    this.props.getMsgList();
    this.props.recvMsg();
}


```

2.修改TabBar.Item添加badge属性:
```
        <NavBar
          mode='dark'
          icon={<Icon type='left'/>}
          onLeftClick={() => {
            this.props.history.goBack(); // 回退到之前的页面
          }}
        >
          {/*{this.props.match.params.userid}*/}
          {users[userid].name}
        </NavBar>
```
3.给TabBar.Item添加过滤事件
```

```

### 10-8.聊天头像显示
1.把NavBar的id, 转换成用户名  
```
(1)在执行聊天查询dashboard.js的componentDidMount()下的
this.props.getMsgList();
>>> express 后端路由时, 添加UserModel字段, 将所有的用户书都都返回


(2)修改chat.redux.js中getMsgList()请求的字段, 添加字段users, 用于保存所有用户信息

(3)解析刷新chat.js页面时, chatMsg[]为空的bug
原因: 因为chatMsg获取聊天数组的方法this.getMsgList()只在dashboard.js中调用了一次
在chat.js中并没有加上, 所以在chat.js的componentDidMount()中加上这个方法

加一个简单的判断, 就是判断chatMsg这个数组是否为空


(4)从chat.redux.js的users数组中取出用户名:
因为第一次加载的时候, users:{}是一个空对象
直接访问users[userid].name时, 会报错
所以, 在render()展示前面, 先加上一个判断
const userid = this.props.match.params.userid;
const users = this.props.chat.users;

if(![users[userid]]){
    return null;
}


```      
2.制作goBack回退按钮 --- 修改NavBar
```
this.props.history.goBack();
```
3.显示头像 --- 先定义头像路径
```
const avatar = require(`../images/${users[v.from].avatar}.png`);
左边:
<Item 
    thumb={avatar}
    ...
/>
右边:  
<Item
    extra={<img src={avatar} alt=''/>}
> 

from表示消息来源
to表示消息目的
```        

### 10-9.修正未读消息数量
1.对数据做过滤 --- 消息只显示对应的用户     
2.使用chat_id字段来实现过滤    
```
export const getChatId = (userId, targetId) => {
    return [userId, targetId].sort().join('_');
};

```   
3.在chat.js中使用getChatId(), 生成chat_id, 对chatMsg进行过滤
```
const chat_id = getChatId(this.props.user._id, this.props.match.params.userid);
const chatMsg = this.props.chat.chatMsg.filter((v) => {
    return v.chat_id === chat_id;
});
```

4.只有目标to===当前用户id时, unread属性 + 1:
```
修改chat.redux.js 
```
### 10-10.发送emoji表情
1.支持用户输入emoji标签         
```
https://emojipedia.org
复制过来, 不知道是怎么复制过来的????
```
2.emoji当作变量来使用
```
const emoji = '';
```
3.使用antd-mobile的Grid组件来显示emoji表情
```

```
4.解决Grid只显示1行emoji表情的bug
```
fixCarousel(){
    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    } ,0);
}
```

5.在 '发送' 按钮边上添加一个 '😀' 显示和隐藏 emoji表情框
```

```

6.给'😀'按钮添加点击事件onClick, 切换this.state.showEmoji的值(默认为false)
```

```


### 11-1.聊天信息根据用户分组
1.以一个用户为单位, 将这个信息统计出来
```

```

2.创建Msg组件
```

```

3.创建字典msgGroup

### 11-2.聊天列表展示
1.通过create_time字段, 值最大的, 就是最近的1条消息
```

```
2.取出对话框1[]值, 对话框2[]值
```
Object.values(msgGroup)
```

2.使用antd-mobile的List, Item ,Brief构建msg基本架构
```

```

3.编写函数getLast(arr), 获取最后的一个数据 --- 为了获取最后1条聊天记录
```

```

##### 获取左边的用户名和icon
4.确定targetId(难理解) --- targetId是最后这条消息是谁发的
```
1.如果v.from === userid, 消息来源当前登录的用户, 表示最后1条消息是我发的.
那么目标targetId === v.to(我发的, 消息是我发给别人的)
2.如果v.from !== userid, 消息来源不是当前登录的用户, 表示以后1条消息不是我发的.
那么目标targetId === v.from(别人发的, 消息是别人发给我的)
```

5.三元运算符, 判断当userinfo[targetId]存在时, 获取它的用户名和头像
```

```

6.将头像写在Item标签的thumb属性中
```

```