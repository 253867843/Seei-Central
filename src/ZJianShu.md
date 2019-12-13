# 笔记

## 第5章 Redux基础
### 5-1
1. React只是一个轻量级的是视图层框架.
2. Redux数据层框架.
3. 什么是Redux?    
(1) 所有组件的数据都放在一个公用的存储空间(store)里面.   
(2) 某一个组件修改store中的数据后, 其他组件会自动感知到store中的数据变化了, 从store中取新数据.

### 5-2.工作流程
1. 术语:   
图书管理员   
(1) React Components: 借书的人      
(2) Action Creators: 你要借什么书, 说的那一句话, "我要借一本辞海"  
(3) Store: 图书馆管理员   
(4) Reducers: 记录本, 记录图书的信息  

2. 图书管理员记不住"辞海"这本书在哪, 于是查阅Reducers获取到"辞海"这本书的位置, 然后把"辞海"这本书给借书人React Components
 
3. 流程   
React Components >>> Action Creators(dispatch(action)) >>> Store(prevState, action) >>> Reducers(处理)    
Reducers(newState) >>> Store自己更新自己 >>> React Components  


### 5-3.使用Antd, React UI框架

### 5-4.创建redux中的store
1. 创建store
```javascript
import {createStore} from 'redux';  
const store = createStore(); // >>> 创建了一个公共的从存储仓库
```

2. 笔记本reducer   
(1) 纯函数, 接收2个参数: state, action  
state: 表示整个store仓库中存储的数据

3. 向store中添加数据:  
(1) 往reducer中添加默认数据 
```javascript
const defaultValue = {inputValue:"", list: []}; 
```  
(2) 将笔记本reducer添加到store仓库中, 这样store仓库中就有了数据. 
```javascript
const store = createStore(reducer); 

```   

4. 从store中取数据
(1) store.getState()获取数据    


### 5-5.Action和Reducer的编写   
(1) 在chrome浏览器中添加插件Redux DevTools Extension  
(2) 在./store/index.js中添加代码  
```javascript
const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
```
(3) 刷新页面 >>> 打开Redux >>> 选中State

#### 5-5-1.学习如何修改store中数据的一个流程:   
(1) 当<Input>框中的内容发生改变的时候, 我们要修改store中的数据    
(2) 创建action
```javascript
const action = {"type": "change_input_value"};
// !!!action用来告诉Redux, 你要做什么事情
```
(3) 如何把action传递给store >>> 使用store中的dispatch方法
```javascript
store.dispatch(action);
```
(4) Store管理员接收到action, 但是Store不知道如何取处理, 于是Store管理员需要取查询Reducer小手册   
(5) Store管理员把"当前Store中的数据"和"action"一起传给Reducer  
(6) Reducer会告诉Store管理员如何操作, 把新数据返回给Store      
(7) !!!当Store接收到action, 会自动的把"当前Store中的数据"和"action"一起传给Reducer 

#### 5-5-2.reducer修改数据流程:   
!!!reducer 可以接受state, 但绝不能修改state   
(1) 深拷贝state    
(2) 修改拷贝件   
(3) 返回拷贝件   
(4) 返回修改后的拷贝件给Store
(5) !!!Store自己更新数据

#### 5-5-3.store监听数据修改
(1) 监听store中数据改变
```javascript
store.subscribe(this.handleStoreChange);
```
(2) 组件更新数据  
```javascript
this.setState(store.getState());
```

### 5-6.使用Redux实现TodoList删除功能
(1) 从数组中删除数据:   
```javascript
[].splice(index, 1);
```

### 5-7.ActionTypes的拆分
(1) 将type写到actionTypes.js文件中去   
(2) 修改TodoList.js中的type值    
(3) 修改reducer.js中的type值     

### 5-8.使用actionCreators统一创建action
(1) 将action写到actionCreators.js文件中去   

### 5-9.Redux知识点复习补充
(1) store必须唯一.  
(2) 只有store能够改变自己的内容.   
(3) store中的数据不是reducer更新的, 而是reducer返回新数据给store, store拿到新数据, 对自己进行更新        
(4) reducer从store中提取数据 >>> 拷贝 >>> 更新数据 >>> reducer将更新后的数据返回给store >>> store自己对自己进行数据更新  
(5) reducer是一个纯函数: 给定固定的输入, 就一定会有固定的输出, 而且不会有任何的副作用. 
```javascript
// 非纯函数:
export default (state, action) => {
  switch (action.type) {
    case constants.CHANGE_INPUT_VALUE:
      return new Date(); // 时间随时都在变化, 所以
  }
  
} 
```   

## store文件夹下文件的作用:
(1) store: 公用存储空间, 所有数据都存放在里面 && 唯一 
(2) reducer: 记录本    
(3) actionTypes/constants: 说的话  
(4) actionCreators: 说这个动作   
我要说: "我想要借辞海这本书"    
我要说 === actionCreators  
"我想要借辞海这本书" === actionTypes/constants   

## 第6章 React进阶
### 6-1.UI组件和容器组件
(1) UI组件 --- 只负责显示, 没有逻辑, 傻瓜组件.
(2) 容器组件 --- 负责业务逻辑, 不管显示, 聪明组件.    
(3) ???思考: 什么样的组件需要拆分成 UI组件和容器组件.
```
容器组件:
class TodoList extends Component {
    constructor (props){
        super(props);
        // ...
        this.state = store.getState();
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        // ...
    }

    render () {
        return (
            <TodoListUI
                inputValue={this.state.inputValue}
                handleDeleteItem={this.handleDeleteItem}
                ...
            />
        )
    }
}

UI组件:
class TodoListUI extends Component {
    render () {
        <div>
            <Input value={this.props.inputValue}/>
            <ButtonDel onClick={()=>this.props.handleDeleteItem(index)}/> // 伪代码
        </div>    
    }
}

```

### 6-2.无状态组件
(1) 当一个组件只有render()函数时, 我们就可以定义当前组件为一个无状态组件.    
(2) 无状态组件是一个函数, 不执行生命周期函数.  
(3) 普通组件是一个class类, 需要执行生命周期函数.  
(4) 所以无状态组件执行的速度 > 普通组件执行的速度

### 6-3.Redux发送异步请求, 获取数据
(1) 在componentDidMount()生命周期函数中, 执行axios插件请求, 获取数据data.     
(2) actionCreators: 将type, data生成action.  
(3) store.dispatch(action);将"当前Store中的数据"和action一起发给Reducer.    
(4) Reducer处理数据, 返回给Store.  
(5) Store接收到数据, 自己更新自己. 

### 6-4.使用Redux-thunk中间件实现ajax数据请求
(1) 原来: 在TodoList组件中的componentDidMount(){异步操作...}中来请求异步数据. 
```
a.过于臃肿  
b.移到其他地方进行统一管理 
```  
(2) Redux-thunk是Redux的中间件(注意不是React的中间件)  
(3) 配置Redux-thunk        
```
1.使用reducer创建初始的数据  
2.我们的store会使用一个中间件, 是什么中间件呢?是thunk中间件   
3.我们在使用store的时候, 就使用了thunk中间件   
4.代码配置:
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducer';
import thunk from 'redux-thunk';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk),
);

const store = createStore(reducer, enhancer);
export default store;
```
(4) 使用Redux-thunk将异步代码放到action中
```
a.当使用Redux-thunk之前, actionCreators返回一个对象, return {}
例子:
export const addTodoItem = () => ({
    type: constants.ADD_TODO_ITEM // >>> 返回一个对象{}
});
b.当使用Redux-thunk之后, actionCreators可以返回函数了, return () => {函数, 执行异步操作}
例子:
export const getTodoList = () => { 
    return (dispatch) => { // >>> 返回一个函数, 该函数用来执行异步操作
        axios.get('/api/footer.json')
            .then((res) => {
                // ...
            })
            .catch((err) => {
                // ...
            });
    }
}
action === getTodoList()
当调用dispatch(action)时, 也就是getTodoList()函数返回的函数(return (dispatch) => {...})会自动被执行.
```


### 6-5.什么是Redux中间件
(1) 中间件: 到底是在谁和谁的中间
```
Action >>> dispatch >>> Store
回答: Redux中间件指的是Action和Store中间
```
(2) Redux的标准流程(没有使用中间件):     
```
1.Action会通过Store的dispatch()方法派发给Store
Action >>> Store.dispatch(Action) >>> Store
2.Store接收Action + 之前的State >>> 一起传给Reducer
3.Reducer返回一个新数据给Store
4.Store去修改自己的State
```
(3) 看图
(4) Redux中间件的作用是对dispatch()方法的升级或封装        
```
Action >>> dispatch >>> Store
没有中间件: 接收一个对象(action {}), 并把这个{}对象传递给Store. --- {}对象
使用中间件: (例如)使用redux-thunk中间件, 升级了dispatch()方法.
1.此时, 当Action是一个对象{}时, dispatch()方法直接把对象{}传给Store.
2.此时, 当Action是一个函数时, dispatch()方法已经升级了, dispatch()方法不会直接传递给Store,
它会让这个函数先执行, 执行完成后在需要调用Store的时候再调用Store.
3.使用中间件来升级dispatch(), 使得dispatch可以接收不同的参数
4.dispatch会根据参数的不同, 执行不同的操作流程
5.其他中间件: redux-logger, redux-saga
```

### 6-6.使用Redux-thunk中间件(1)
### 6-7.使用Redux-thunk中间件(2)
### 6-8.如何使用React-Redux的使用(1)
(1) React-Redux是一个第三方模块, 让我们在React中更加方便的使用Redux.    
(2) 安装react-redux
```
npm install react-redux -D
```

(3) react-redux核心API --- Provider组件
```
import {Provider} from 'react-redux';
import TodoList from './TodoList';
import store from './store';

const App = (
    <Provider store={store}>
        <TodoList/>
    </Provider>
);

ReactDOM.render(App, document.getElementById('root'));

1.Provider提供器连接了Store, 那么Provider里面所有的组件都有能力获取store里的内容了.  
2.Provider已经把store提供给它(Provider)内部所有的组件了
```

(4) react-redux核心API --- connect()方法
```
import {connect} from 'react-redux';

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default connect(null, null)(TodoList);
1.让TodoList组件和store进行连接
2.连接参数: mapStateToProps mapDispatchToProps
(1)连接规则mapStateToProps字面翻译: 把Store中的数据映射给组件, 变成组件的props.
   state指的就是Store中的数据
   const mapStateToProps = (state) => ({
        inputValue: state.inputValue
        (组件props.inputValue) : (Store中的数据inputValue)
   });
   调用: this.props.inputValue
(2)连接规则mapDispatchToProps字面翻译: 把store.dispatch()方法映射到组件props
props === store.dispatch()
this.props.handleInputChange(); === store.dispatch().handleInputChange();
```

> 当Store中的数据发生改变时, connect(mapStateToProps, mapDispatchToProps)(TodoList);        
> connect()将Store和TodoList组件做连接， 所以这是一个自动的过程.   
> 数据一旦改变, TodoList组件就会跟着变.
> 代替了原来的store.subscribe();

(5) 代码优化     
```
1.解构赋值:
const {inputValue, list, handleInputChange, handleAddTodoItem, handleDeleteItem} = this.props;
2.TodoList是一个UI组件, 当connect把UI组件和数据(mapStateToProps)/业务逻辑(mapDisaptchToProps)相结合的时候, 
connect(mapStateToProps, mapDispatchToProps)(TodoList)返回的内容实际上就是一个容器组件了.

UI组件 + 数据/业务逻辑 === 容器组件
```
       


### 6-9.如何使用React-Redux的使用(2)
### 6-10.使用React-Redux功能完成TodoList功能

### 整理:
(1) react: 视图层框架    
(2) redux: 数据层框架, 包括: constants(说的话), actionCreators(说这个动作), store(公用存储空间), reducer(数据处理)       
(3) redux-thunk: 用于异步请求, 升级dispatch, 参数可以接收对象和函数     
(4) react-redux: 在React中更加方便的使用Redux.  

<hr/>

## 第7章 Header组件开发(实战)
### 7-1.项目搭建, Styled-Components与Reset.css的结合使用
#### 7-1-1.为什么使用Styled-Components   
(1) css文件一旦在一个(js)文件中被引入了, 那么该css文件会在全局中生效.     
(2) 缺点: 会造成两个或多个(js)文件中的css冲突.     
(3) 希望: 每个(js)文件中的css是独立, 不会相互影响.       
(4) 解决: 使用第三方模块Styled-Components        
(5) 更新index.css >>> style.js, 把css放到一个js文件中. 
```
import './style.js';  
```      
#### 7-1-2.使用Reset.css 
(1) 好处: 不同浏览器的内核里面对html标签, 例如body的默认样式的设置是不同的.
(2) 在一个浏览器上, margin === 10px, 在另外一个浏览器上, margin === 8px.
(3) Reset.css的作用为了统一.


### 7-2.使用Styled-Component实现Header(1)
### 7-3.使用Styled-Component实现Header(2)
(1) 创建common文件夹 --- 存放公用模块
(2) 创建一个Styled-Components组件
```
export const HeaderWrapper = styled.div`
  height: 56px;
  background: red;
`;
1.创建一个组件叫HeaderWrapper, 其实就是一个div标签.
2.创建了一个HeaderWrapper组件并带有一定的样式.
```
(3) 使用Logo
```
  background: url(${logoPic});
  background-size: contain;
  条件: 使用尺寸比较大的无背景图片
```
(4) 不想让padding撑开
```
box-sizing: border-box; 
```
(5) input标签下的placeholder属性配置
```
选择器:
export const NavSearch = styled.input.attrs({
    placeholder: "搜索"
})
`
    &::placeholder { // >>> 
        color: #999;
    }
`
```

(6) 编写组件时, 注意抓取一些组件的共性 
```
    例如: "登录" "编写文章" 两个按钮
    共性: 
        float: right;
        line-height: 38px;
        border-radius: 19px;
        margin-top: 9px;
```     

### 7-4.使用iconfont嵌入头部图标
(1) iconfont.cn         
(2) 注册账号        
(3) 创建项目(文件夹)        
(4) 选择图标        
(5) 加入购物车       
(6) 将选中的图标添加到创建的项目中     
(7) 下载至本地       
(8) 解压缩文件, 取有效文件
```
1.iconfont.eot
2.iconfont.svg
3.iconfont.ttf
4.iconfont.woff
5.iconfont.woff2
6.iconfont.css
```
(9) 将6个文件添加到项目目录下的/statics/iconfont/文件夹里.                     
(10) 对iconfont.css的格式做一个调整.             
(11) 修改iconfont.css的路径, 添加'./'              
(12) 设置iconfont.css为全局样式处理.         
```
1.修改iconfont.css为iconfont.js
```
(13) 选择图标编码, 复制编码, 添加到组件        
```
<i className="iconfont">&#xe615;</i> --- 笔图标
<i className="iconfont">&#xe636;</i> --- Aa图标 
<i className="iconfont">&#xe60b;</i> --- 放大镜
```
(14) 放大镜布局思路:       
```
1. 创建一个<SearchWrapper>容器包裹 = <input> + <i>放大镜
2. <SearchWrapper>设置浮动布局
3. <input>: 流体布局
4. <i>放大镜: absolute布局
5. iconfont图标居中: line-height: 30px + text-align: center
```

### 7-5.搜索框动画效果实现
(1) 问题: 输入字符, 覆盖"放大镜"图标     
```
解决: 设置更大的padding-right值, 并结合box-sizing: border-box;
```
(2) 使用同一个状态来控制不同html标签的样式:      
```
<NavSearch className={this.state.focused ? "focused" : ""}/>
<i className={this.state.focused ? "focused iconfont" : "iconfont"}

NavSearch的focused样式 和 <i>标签的focused样式 并没有关系
```

(3)  鼠标移入, 移出事件  
```
<NavSearch 
    onFocus={this.handleInputFocus} --- 聚焦
    onBlur={this.handleInputBlur} --- 失焦
/>
```

(4) input框的动画效果 --- react-transition-group
```
1.目标: 给<NavSearch>添加动画效果
2.CSSTransition包裹
<CSSTransition>
    <NavSearch .../>
</CSSTransition>
3.配置CSSTransition参数:
timeout > 动画执行时间
in > 动画执行标志位
classNames > 样式前缀名称(例如: slide)
4.CSSTransition的作用: 当<NavSearch>即将被挂载到页面之前时, 会往外层组件上挂载几个Css样式
slide-enter
slide-enter-active
slide-exit
slide-exit-active
外层组件 >>> 包裹<NavSearch>组件的父组件, 挂载的样式也写在父组件里.
```

### 7-6.使用React-Redux进行应用数据管理
(1) 优化 --- 把动画样式从SearchWrapper移到NavSearch中间去        
(2) mapStateToProps中的state指的是store中的数据.
```
const mapStateToProps = (state) => ({
    // state >>> 指的是store中的数据
});
```
(3) mapStateToDispatch --- 把需要使用dispatch方法的都放在里面
```
const mapDispatchToProps = (dispatch) => ({
    // dispatch >>> 普通对象 >>> action通过dispatch方法传递给store
    // dispatch >>> 第三方中间件升级 >>> 先处理异步请求, 再根据情况传递给store
});

```
(4) 将state.focused状态记录到reducer
(5) 走流程, 修改state.focused的方法


### 7-7.使用combineReducers完成对数据的拆分管理
(1) 开发者工具使用     
(2) 拆分reducer, 成多个小手册 --- 一个js文件不超过300行
(3) header组件建立单独的小手册
```
1.在header创建store文件夹 /store/reducer.js       
        
2./src/store下的reducer.js聚合各个单独的小手册(小reducer)
        
3.修改mapStateToProps()映射结构
原: focused: state.focused
新: focused: state.header.focused
```

```
import {combineReducers} from 'redux';
import headerReducer from '.. /common/header/store/reducer';
const reducer =  combineReducers ({
    header: headerReducer
}) 
                
export default reducer;
```
(4) headerReducer的路径优化
```
import reducer from './reducer';
                
export {reducer};
```


### 7-8.actionCreators和constants的拆分
(1) 将type改为常量, 添加命名空间
```
constants.js
        
export const SEARCH_FOCUS = 'header/SEARCH_FOCUS';
export const SEATCH_BLUR = 'header/SEARCH_BLUR';
```
(2) actionCreators 
```
actionCreators.js
        
export const searchFocus = () => ({...});
export const searchBlur = () => ({...});
        
import * as actionCreators from './actionCreators';
actionCreators.searchFocus();
actionCreators.searchBlur();

```

(3) 别名的两种使用方式
```
方式一:
server.js
export {reducer};
        
import {reducer as headerReducer} from './common/header/store/';

```

```
方式二:
actionCreators.js
export const searchFocus = () => ({...});
export const searchBlur = () => ({...});
        
import * as actionCreators from './actionCreators';

```
(4) 将actionCreators添加到/store/index, 指定统一的出口
```
import * as actionCreators from './actionCreators';
export { actionCreators };
        
import { actionCreators } from '/common/header/store/'; 
```

```
import * as constants from './constants';
export {constants};

import { constants } from '/common/header/store/';
```


### 7-9.使用Immutable.js来管理store中的数据
(1) reducer中的state是不能修改的, 修改/返回的只是它的拷贝件.
(2) immutable 意思是 不可改变的对象. --- immutable对象.           
(3) state >>> immutable 对象.     
```
import { fromJS } from 'immutable';
        
const defaultState = fromJS({
    focused: false
});
```
(4) 引入immutable.js对象后, 需要修改的地方      
```
1.reducer
state.set('focused', true);
state.set('focused', false);
        
2.mapStateToProps

const mapStateToProps = (state) => ({
    focused: state.header.focused
});

改为

const mapStateToProps = (state) => ({
    focused: state.header.get('focused')
});

```
原因: immutable对象的set方法, 会结合之前immutable对象的值和设置的值, 返回一个全新的对象.
```
immutable.set()
        
全新的对象 === 之前immutable对象的值 + 设置的值

``` 


### 7-10.使用redux-immutable统一数据格式
(1) 为什么要统一格式???
```
const mapStateToProps = (state) => ({
  focused: state.header.get('focused')
});
        
1.state是一个js对象
而state.header是一个immutable对象
        
2.当我们想调用focused属性的时候, state.header.get('focused'), 它的数据行为是不统一的: 
(1)state.header 使用js对象来获取
(2)header.get('focused') 使用immutable对象来获取
        
我们希望统一, state是immutable对象, 而不是js对象
```   

(2) state初始值在哪创建的?
```
1.state的初始值实在 /src/store/reducer 这个大的reducer中创建的.
               
```

(3) 把state变为immutable对象
```
import { combineReducers } from 'redux';
        
改为
        
import { combineReducers } from 'redux-immutable';
        
这样 state 就是一个immutable对象了

const mapStateToProps = (state) => ({
  focused: state.getIn(['header', 'focused'])
});
```


### 7-11.热门搜索样式布局   
(1) 定义SearchInfo组件, 以SearchWrapper为基准:      
```
1.绝对定位, top: 56px; width: 240px;和输入框展开时宽度相同.
2.一些微调
```
(2) 定义SearchInfoTitle组件     
(3) 定义SearchInfoSwitch组件   
(4) 定义SearchInfoList组件, overflow: hidden; 为了让其中的SearchInfoItem组件全部bfc     
(5) 定义SearchInfoItem组件, a标签         
(6) 根据focused, 判断 "热门搜索样式布局" 显示/隐藏

### 7-12.Ajax获取推荐数据
(1) 安装/使用 react-redux中间件 >>> 使得actionCreators可以返回一个函数(用来执行异步操作).             
(2) 制作模拟数据: 在 /public/api/xxx.json 中写模拟数据.      
```
1.在编写完成后, 在浏览器输入 http://localhost:3000/api/headerList.json
看到结果:
{
    list: [1, 2, 3]
}
2.原因:
> create-react-app的底层也是一个node的服务器.
> 当你访问 http://localhost:3000/api/headerList.json 的时候 
> 会先到工程目录下看你有没有对应的路由
> 如果没有, 它还会到 /public/api/headerList.json 中去找这个文件
> 文件如果存在, 则会返回一些假数据
```
(3) 定义模拟数据格式
```
{
    "success": true
    "data": {
        "list": [    
            "区块链",
            "小程序",
            "vue",
            "毕业",
            "PHP",
            "故事",
            "flutter",
            "理财",
            "美食",
            "投稿",
            "手帐",
            "书法",
            "PPT",
            "穿搭",
            "打碗碗花"
        ]
    }
}
```
(4) actionCreators完成异步请求 >>> actionCreators发送普通对象, 申请修改list数据
```
// 内部actionCreators, 不用export
const changeList = (data) => ({
    type: constants.CHANGE_LIST,
    data
});

export const getList = () => {
    return (dispatch) => {
       axios.get()
        .then((res) => {
            dispatch(changeList(res.data.data.list));
        })
        .catch((err) => {
            console.log('[err]', err);
        });
    }
}
``` 
(5) reducer修改数据, 数据类型统一
```
state.set('list', action.data);
1.此时state是immutable对象
2.此时action.data是普通js对象

所以, 我们需要统一数据类型, 2种做法:
1.修改actionCreators
const changeList = (data) => {
    type: constants.CHANGE_LIST,
    data: fromJS(data)
}

2.修改reducer
> state.set('list', fromJS(action.data));

```
(6) 取出数据, 循环展示
(7) 使用redux-immutable, 使得state数据类型统一
```
import {createStore} from 'redux-immutable';

const store = createStore(reducer);
export default store;

创建公共存储仓库store >>> 也就是state
```


### 7-13.代码优化微调
(1) 在actionCreators中分类:
```
type1: 需要导出的普通对象action
export const search_focus = () => ({
    type: constants.SEARCH_FOCUS
});

type2: 需要导出的异步函数action
export const getList = () => {
    return (dispatch) => {
        axiox.get(...).then(...).catch(...);
    }
}

type3: 需要导出的普通对象action
const changeList = (data) => ({
    type: constants.CHANGE_LIST,
    data
});

```

### 7-14.热门搜索换页功能实现
(1) 当前list中存放的是所有的列表项目 >>> 改为每次只显示10个列表项目    
(2) 在reducer中指定page和totalPage属性         
```
1.page >>> 当前在第几页
2.totalPage >>> 总共页数
```
(3) 在获取数据的actionCreators这里添加totalPage属性
```
const changeList = (data) => ({
    type: constants.CHANGE_LIST,
    data,
    totalPage: Math.ceil(data.length / 10)
});

```
```
!!! Math.ceil(): 表示向上取整
Math.ceil(1.2); >>> 2 
Math.ceil(1.8); >>> 2
Math.ceil(-1.2); >>> -1
Math.ceil(-1.8); >>> -1

!!! Math.floor(): 表示向下取整
!!! Math.round(): 表示四舍五入取整

```
(4) 通过算法 + 循环, 每次显示10个SearchInfoItem标签
```
for(let i = (page - 1) * 10; i < page * 10; i++) {
    // ...
}
```
(5) immutable对象和js对象转换
```
const jsList = list.toJS();
list >>> immutable对象
jsList >>> 普通js对象
```
(6) 弹窗的显示/隐藏, 并不是完全由focused状态来决定的.
```
两方面来决定的:
1.输入框<NavSearch>的focused 能够影响 弹窗的显示/隐藏
2.弹窗的mouseEnter 和 mouseLeave 两个状态能够影响 弹窗的显示/隐藏
```

(7) mouseEnter 和 mouseLeave
```
<SearchInfo
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
>
...
</SearchInfo>

修改reducer中mouseIn属性
```

(8) 修改page页码
```
<SearchInfoSwitch onClick={() => handleChangePage(page, totalPage)}>换一批</SearchInfoSwitch>

handleChangePage(page, totalPage) {
    if (page < totalPage) {
      dispatch(actionCreators.changePage(page + 1));
    } else {
      dispatch(actionCreators.changePage(1));
    }
  }
```

(9) 优化 --- 当点击输入框时, 执行弹窗数据请求
```
const {list} = this.props;
const newList = list.toJS();

if(newList.length){ // >>> newList
    for(let i = (page - 1) * 10; i < page * 10; i++){
        pageList.push(<SearchInfoItem key={...}>{...}</SearchInfoItem>);
    }
}
```

(10) 在reducer中, 修改数据时, 注意数据格式统一.        


### 7-15.换页旋转动画效果的实现
(1) 在iconfont上找到旋转图标, 添加至购物车, 重新下载到本地, 复制6个文件替换原来的, 并修改iconfont.js
(2) 样式冲突:
```
1.原因: 放大镜下样式设计, 有代码:
export const SearchWrapper = styled.div`
  position: relative;
  float: left;
  .iconfont {
    position: absolute; // 使用了绝对定位
    right: 5px;
    bottom: 5px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 15px;
    &.focused {
      background: #777;
      color: #fff;
    }
  } 
`;
其中.iconfont使用了绝对定位 --- position: absolute;
旋转动画效果的图标也使用了<i className="iconfont">&#xe851;</i>
所以, 这个图标也会使用绝对定位 --- position: absolute;, 出现在右下方.
针对这个图标做修改.
```

(3) icon旋转的css代码:
```
  .spin {
    display: block;
    float: left;
    font-size: 12px;
    margin-right: 2px;
    transition: all .2s ease-in; // 旋转动画
    transform-origin: center center; // 确定旋转中心
  }
```
(4) ref属性获取节点, 来修改旋转角度
```
1.获取上一次旋转角度 --- replace + 正则
2.判断旋转角度是否存在 
第一次 --- 旋转角度不存在 --- 0
第二次 ~ 第n次 --- 获取上一次的旋转角度
旋转角度 + 360
```

### 7-16.避免无意义的请求发送, 提升组件性能
(1) 点击input输入框, 点击一次, 发送一次axiox异步请求.        
这样造成了许多无意义的请求发送.        
(2) 通过判断list来决定是否有需要 发送异步请求.
(3) 使用 && 来替代简单的 if语句
```
(list.size === 0) && dispatch(actionCreators.getList());
```


# -----------------------
## 第八章
### 8-1.什么是路由, 如何在React中使用路由功能
(1) 安装
```
npm install -D react-router-dom
```
(2) 使用
```
import {BrowserRouter as Router, Route} from 'react-router-dom';

<Router> 
    <Route path="/" exact render={()=><div>home~</div>}/>
    <Route path="/detail" exact render={()=><div>detail~</div>}/>
</Router>

表示在<Router>...</Router>之间的内容可以使用路由了
```


### 8-2.首页组件的拆分
(1) 思考自己的项目有几个页面: --- 创建pages文件夹存放不同的页面
```
1. common文件夹 --- 公用组件 --- header组件 和 其他公用组件
2. pages文件夹 --- 项目页面组件 
                            --- home页面 --- home组件   
                            --- detail页面 --- detail组件
```
(2) home页面划分成左右2个布局
```
<HomeWrapper>
    <HomeLeft></HomeLeft>
    <HomeRight></HomeRight>
</HomeWrapper>
```
(3) 在HomeWrapper中再划分出多个模块, 分别写成子组件 --- 创建components文件夹存放不同的子组件
```
<List/>
<Recommend/>
<Topic/>
<Writer/>
```

### 8-3.首页专题区域布局及reducer的设计
(1) 打开 /src/pages/home/components/Topic 文件             
(2) 设计页面布局              
```
同一个style.js文件
(1) 为了避免Topic组件过渡设计, 所以Topic组件的style.js样式不单独写出.
(2) 将子组件的Topic的style样式 和 home组件的样式 写在同一个style.js文件中.
```
(3) 设计一个TopicItem样式, 循环遍历出其他的.      
(4) 循环的数据应该存放在redux的reducer中, reducer为小手册, 最终合并到 /src/store/reducer中.              
(5) 创建小手册homeReducer               
```
import {reducer as headerReducer} from '../common/header/store';
import {reducer as homeReducer} from '../pages/home/store';

const reducer = combineReducers({
    header: headerReducer,
    home: homeReducer
});

export default reducer;
```
(6) 使用Provider中的store
```
<Provider store={store}>
    <Router>
        <Route path="/" exact component={Home}/>   
    </Router>
</Provider>

class Home extends Component {
    render (){
        return (
            <HomeWrapper>
                <HomeLeft>
                    <Topic />
                </HomeLeft>
                <HomeRight></HomeRight>
            </HomeWrapper>
        )
    }
}

<Provider>
    <Home>
        <Topic>
            <TopicItem>
            </TopicItem>
        </Topic>
    </Home>
</Provider>

中的组件都能使用Store, 所以TopicItem也能够使用Store, 通过react-redux
```

(7) 使用react-redux获取store中的数据    
```
import { connect } from 'react-redux';
export default connect(mapStateToProps, mapDispatchToProps)(Topic);

const mapStateToProps = (state) => ({
    topicList: state.getIn(['home', 'topicList'])
});

const { topicList } = this.props; // !!! 注意, 此时获取的topicList是immutable对象

{
    topicLost.map((item) => {
        return (
            <TopicItem key={item.get('id')}> // immutable对象, 需要使用get()
                <img 
                    src={item.get('imgUrl')}
                    alt=""
                    className="topic-pic"
                />
                {item.get('title')}
            </TopicItem>   
        )
    })
}
```

### 8-4.首页文章列表制作
(1) 打开 /src/pages/home/components/List 文件       
(2) 设计页面布局      
```
1. 样式同样写在 /home/style.js中, 避免过渡设计.  
2. 定义<ListItem> = <img>(右浮动图片) + <ListInfo>(左浮动, 文字区域)
3. 定义<ListInfo> = <h3>(标题, className="title") + <p>(描述, className="desc") 
```
(3) 使用react-redux的connect()方法获取store中的数据: articleList
```
articleList: state.getIn(['home', 'articleList'])
```
(4) 遍历articleList
```
{
    articleList.map((item) => {
        return (
            <ListItem key={item.get('id')}>
                <img
                    className="pic"
                    src={item.get('imgUrl')}
                    alt=""
                />
                <ListInfo>
                    <h3 className="title">{item.get('title')}</h3>
                    <p className="desc">{item.get('desc')}</p>
                </ListInfo>
            </ListItem>
        )
    })
}
```
(5) 优化代码: 给SearchInfo添加背景色 background-color: #fff;
(6) img标签添加alt属性
```
    <img 
        src={...} 
        alt=""
    />
```

### 8-5.首页推荐部分代码编写
(1) 打开 /src/pages/home/components/Recommend 文件      
(2) 设计页面布局  
```
1. 样式同样写在 /home/style.js中, 避免过渡设计. 
2. 定义<RecommendWrapper>
3. 定义<RecommendItem>
```
(3) 使用比较大的无背景图片
```
background: url(${itemPic});
background-size: contain;
```
(4) styled-components语法, 加载不同的背景图片
```
  <img imgUrl={item.get("imgUrl)}/>
  background: url(${(props) => props.imgUrl});
```
(5) itemPic图片资源来自 reducer
```
recommendList: [
    {"id":1, "imgUrl":"..."},
    {"id":2, "imgUrl":"..."}
    {"id":3, "imgUrl":"..."}
    {"id":4, "imgUrl":"..."}
]
```
(6) 使用react-redux的connect()方法获取store中的数据: recommendList, 遍历显示.
```
      <RecommendWrapper>
        {
          recommendList.map((item) => {
            return (
              <RecommendItem
                key={item.get("id")}
                imgUrl={item.get("imgUrl")}>
              </RecommendItem>
            )
          })
        }
      </RecommendWrapper>
```

(7) Writer组件

使用react-redux的connect()方法获取store中的数据: articleList

### 8-6.首页异步数据获取
(1) 把数据从reducer移到 /public/api/home.json中.       
(2) 复述之前异步请求的过程.        
(3) 注意在reducer中合并数据的时候, 数据类型需要转换成immutable对象.           

### 8-7.异步操作代码拆分优化
(1) 将异步请求放到actionCreators.js文件中.     
(2) 将常量放到constants.js文件中.        
(3) 修改actionCreators.js和reducer.js文件中使用到的常量.     

### 8-8.实现更多加载功能
(1) 实现 /home/components/List.js列表的 更多加载功能.
(2) 思路:
```
1.定义组件<LoadMore>        
        
2.当点击onClick事件的时候, 你想去获取新的ajax数据, 所以我们要做异步的操作.
        
3.异步操作 >>> 派发action, 让action去做异步的操作.
        
4.使用immutable的concat()方法, 来往articleList这个数组中追加内容.
        

```
(3) List 和 fromJS 数据转换的区别
```
1.List只会把[]数组的外层转换成Immutable对象, 内层的{}仍然是js对象
        
2.fromJS会把内层 + 外层 都转换成 Immutable对象
        
[ --- 外层
    { --- 内层1
        "id": 1,
        "name": "dcj"
    },
    { --- 内层2
        "id": 2,
        "name": "aaa"
    }    
]


```

(4) 错误: 加载更多 多次, key值重复 --- 使用index解决(仅本项目)     
(5) 真实情况是 对数据进行分页:      
第一页, 对应第一页的数据       
第二页, 对应第二页的数据   
```
分页思路: 
1. 添加属性articlePage --- reducer.js
2. 每次点击<LoadMore>组件时, 派发异步时, 传递额外参数(articlePage + 1)给reducer
3. reducer接收到action, 更新属性articlePage

```  

### 8-9.返回顶部功能实现 
(1) 返回顶部功能:
```
思路:
1.定义<LoadMore>组件
2.给<LoadMore>组件绑定点击事件
3.onClick点击事件实现
window.scrollTo(0, 0);
```
(2) 根据滚动的距离, 决定是否显示<LoadMore>组件
```
思路:
1.分成2步来实现
a.<LoadMore>组件的显示/隐藏
b.绑定事件, 监听滚动距离
```
(3) LoadMore组件的显示/隐藏
```
1.在reducer中定义showScroll属性
2.在 /home/index.js中定义使用showScroll属性
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
    ...,
    showScroll: state.getIn(['home', 'showScroll'])
});

export default connect(mapStateToProps, mapDispatchToProps)(home);
3.三元运算符来判断是否显示 "回到顶部" 按钮
{this.props.showScroll ? <LoadMore>顶部</LoadMore>}

```

(4) 滚动事件监听
```
1.在componentDidMount()中绑定 滚动 监听事件
window.addEventListener("scroll", this.props.changeScrollTopShow);

2.监听获取滚动值
document.documentElement.scrollTop

3.根据document.documentElement.scrollTop值的不同派发不同action, 决定<LoadMore>显示/隐藏

if(document.documentElment.scrollTop > 100) {
    dispatch(actionCreators.toggleTopShow(true));
}else {
    dispatch(actionCreators.toggleTopShow(false));
}
```
(5) 将reducer的case代码写到一个单独的函数中:
```
const changeHomeData = (state, action) => {
  return state.merge({
    topicList: fromJS(action.topicList),
    articleList: fromJS(action.articleList),
    recommendList: fromJS(action.recommendList),
    qrcode: fromJS(action.qrcode)
  })
};
   
case constants.CHANGE_HOME_DATA:
    return changeHomeData(state, action);
```

### 8-10.首页性能优化及路由跳转
(1) 为什么需要优化?
```
1.在目前的情况下, 当store中的数据变化时, 每一个组件都会被重新渲染(render()函数都会被重新执行.)
        
2.修改的数据可能和我这个组件没关系, 但是我这个组件还是渲染了, 导致组件性能不高.
```

(2) 只有当和我这个组件相关的数据发生改变的时候, render()函数执行
```
1.使用shouldComponentUpdate
当和我这个组件相关的数据发生改变的时候, shouldComponentUpdate返回true, render()函数执行.
当和我这个组件不相关的数据发生改变的时候, shouldComponentUpdate返回false, render()函数不执行.
```

(3) PureComponent --- 纯组件
```
Component 和 PureComponent 的区别?
PureComponent底层实现了shouldComponentUpdate, 自动实现, 提高了组件的性能.
```

(4) PureComponent 必须和 Immutable.js 一起使用, 来管理你的数据

(5) 首页跳转到详情页面
```
1.在List.js中使用<a>标签跳转
<a href='/detail' key={item.get("id")}>
    <ListItem .../>
</a>
有问题

2.react-router-dom是单页应用的跳转.

3.什么是单页应用的跳转?
单页应用的跳转 --- 整个网站只会加载一个html文件.
打开浏览器 >>> F12 >>> 打开network >>> Doc
第一次加载 >>> localhost >>> 加载了一次html文件
当我点击<a href="/detail" key={item.get("id")}>时 >>> detail >>> 又加载了一次html文件

这样, 每次跳转, 就会加载一次html文件, 这是比较耗性能的

4.正确的页面跳转: --- 使用<Link>
import { Link } from 'react-router-dom';

<Link to="/detail" key={item.get("id")}>
    <ListItem />
</Link>

<Link to="/">
    <Logo/>
</Link>
```


### 9-1.详情页面布局
(1) 给img指定width: 100%, 能让大图片完全显示
```
大图片
img {
    width: 100%;
}
```
### 9-2.使用redux管理详情页面数据
(1) 定义actionCreators, constants, reducer, index 以及 手册添加 { detail: detailReducer } 
(2) 定义dom字符串
```
  content: '<img src="https://upload-images.jianshu.io/upload_images/11956250-d052c1ded91dddad.png" alt=""/><p><b>后期维护成本也是问题，希望谷歌在这方面做一些改变，让 Flutter 可以更好的发展下去。</b>\n' +
    '在设计好一个视图后，可以横向纵向一层一层定义结构，行就用 Row，列就用 Colunm，使用方法就在 Flutter Go 上去查。在 Flutter 中，万物皆为Widght，可以在图中看到，即使是一个边距之类的，都会用一个 Widget 实现。\n' +
    '点击事件也是一个 Widght， 用 GestureDetector 实现。有两个参数，一个是 onTap(), 也就是点击的回调，一个是 child，也就是我们需要点击事件的 widght。这个项目中，点击事件都是跳 WebView 页，然后看下 WebView 页怎么创建。如果不需要状态管理，那么就可以正常创建一个界面，然后child用 WebviewScaffold 实现，即可实现 WebView\n' +
    '的功能。</p>'
```
(3) 使用store >>> connect() 
(4) 使dom字符串不转译
```
<Content dangerouslySetInnerHTML={{__html: this.props.content}}/>
```

### 9-3.异步获取数据
(1) 将数据写到 /api/detail/json      
(2) 执行异步请求流程, 获取数据 >>> reducer      
(3) 使用connect() 连接store, 获取数据更新组件       
(4) 没新内容, 都是之前流程的重复     

### 9-4.页面路由参数的传递
(1) 第一种: 动态路由获取路由参数 --- 进行多个页面之间的数据传递
```
例如: /detail/:id 路径传递/获取参数id 

路由设置:
<Link to={"/detail/"+item.get("id")}>

路由匹配: 
<Route path="/detail/:id" exact component={Detail}/>

获取路由参数: 
this.props.match.params.id

传递给getDetail(id), 根据不同的id, 服务端返回不同的请求页面.
componentDidMount() {
    getDetail(this.props.match.params.id);
}

getDetail(id) {
    dispatch(actionCreators.getDetail(id));
}

export const getDetail = (id) => {
    return (dispatch) => {
        axios.get("/api/detail.json?id=" + id)
            .then((res) => {
               // ...
            })
            .catch((err) => {
               // ...
            });
    }
};

这样在请求不同的详情页面时, 传递不同的参数id, 发起异步请求时, 服务端返回不同的请求页面.
```

### 9-5.登录页面布局
(1) 定义绝对布局, top: 56px, 留出header头部组件的距离      
(2) 问题:     
```
头部组件<SearchInfo>, 弹窗不出现的问题
解决:
1.添加<HeaderWrapper>的z-index: 1
2.添加<LoginWrapper>的z-index: 0
3.这样弹窗就会出现了
```
### 9-6.登录功能实现
(1) 在reducer中定义login属性, {login: false} >>> 初始状态值 
(2) 在header头部组件中, 引入login属性
```
login: state.getIn(['login', 'login'])
```       
(3) 三元运算符切换 "登录"/"退出"
```
{ login ? <NavItem>退出</NavItem> : <NavItem>登录</NavItem>}
```
(4) Link包装跳转链接:
```
{ login ? <NavItem>退出</NavItem> : <Link to="/login"><NavItem>登录</NavItem></Link>}
```
(5) 写登录页面代码:
```
1.使用ref, 获取DOM
ref={(input) => this.account = input;}
ref={(input) => this.password = input;}

2.获取到DOM值, 并派发action, 执行异步请求:
this.account >>> DOM节点 >>> 获取节点的值 >>> this.account.value
this.password >>> DOM节点 >>> 获取节点的值 >>> this.password.value

getDetail(accountElem, passwordElem) {
    dispatch(actionCreators.login(accountElem.value, passwordElem.value));
}

3.请求字符串拼接:
axios.get('/api/login.json?account='+account+"&password="+password);

4.处理结果reducer修改login属性
state.set("login", action.value); // true

5.登录成功后, 跳转到首页
<Redirect to="/"/>
```

(6) 写登出页面代码:
```
/header/server.js
1.给 "退出" 按钮绑定事件
<NavItem onClick={handleLogout}/>

2.mapDispatchToProps

import {actionCreators as loginActionCreators} from '../../pages/login/store';
handleLogout() {
    dispatch(loginActionCreators.logout()); // 注意, 这里是login页面下的actionCreators
    // 不是header下的actionCreators
}

3.处理结果reducer修改login属性
state.set("login", action.value); // false
```

### 9-7.登录鉴权及代码优化
(1) 登录鉴权
```
1.定义Write组件

2.根据reducer的login属性值, 显示Write页面/登录页面

    if (loginStatus) {
      return (
        <div>写文章页面</div>
      )
    } else {
      return <Redirect to="/login"/>
    }

3.添加write路由: 
import Write from './pages/write';
<Route path="/write" component={Write}/>

4.在 /header/server.js 中 "写文章" 按钮上, 添加<Link>
<Link to="/write">
</Link>

5.核心思想: Write的组件的显示内容会根据login属性来决定
```

### 9-8.异步组件及withRouter路由方法的使用
(0) 为什么要使用异步组件
```
所有组件的代码都存放在bundle.js中       
存在问题:       
1.当加载首页时, 其他页面Detail, Write都会加载           
2.希望        
当访问首页时, 只会加载首页的代码.    
当访问详情页面时, 采取加载详情页面. 
  
```

(1) 异步组件 --- 使用react-loadable
```
1.使用react-loadable中间件
2.路由加载修改
import Detail from './pages/detail';
改为
import Detail from './pages/detail/loadable.js';

<Router path="/detail" component={Detail}/>
```            
(2) withRouter路由方法    
```
1.当需要Detail组件需要获取传入的参数时, 导出时需要使用withRouter()
import {withRouter} from 'react-router-dom';
class Detail extends Component {
    // ...
}
export default connect(..., ...)(withRouter(Detail));

能够获取到 /detail/:id 中的参数id
```  

### 10-1.项目上线流程
后端配置:       
(1) 下载XAMPP软件       
(2) Manage Servers >>>      
(3) 启动Apache Web Server >>> localhost            
(4) 后端目录 /XAMPP/htdoc >>> 创建api文件夹      
(5) 复制 /public/api/所有json文件(模拟数据) 到 /XAMPP/htdoc/api/  目录下      
(6) 查看 /localhost/api/homeList.json         
    
前端配置:       
(1) 命令行关闭前端项目       
(1-2) 删除 /public/api 文件夹        
(2) 执行npm run build >>> build目录     
(3) 将build文件夹 给 后端的同学       

前后端结合:     
(1) 后端同学 复制 build文件夹中的"内容" 到 /XMAPP/htdoc/ 文件夹(注意, 不是build文件夹)        
(2) 访问后端的项目 localhost:80端口      
(3) 前端的代码拷贝到后端的项目中  

补充:
(1) 当开启XAMPP后, 在浏览器chrome中输入, XAMPP上的 /General/IP Address 对应的ip地址       
(2) 输入localhost表示本机的IP地址, 有可能不是 /General/IP Address 对应的ip地址         

### 10-2.React版本升级说明
### 10-3.React课程总结

### css总结
(1) 使用Logo
```
  background: url(${logoPic});
  background-size: contain;
  条件: 使用尺寸比较大的无背景图片
```
(2) 不想让padding撑开
```
box-sizing: border-box; 
```
(3) 给img指定width: 100%, 能让大图片完全显示
```
大图片
img {
    width: 100%;
}
```
(4) input标签下的placeholder属性配置
```
选择器:
export const NavSearch = styled.input.attrs({
    placeholder: "搜索"
})
`
    &::placeholder { // >>> 
        color: #999;
    }
`
```

(5) 编写组件时, 注意抓取一些组件的共性 
```
    例如: "登录" "编写文章" 两个按钮
    共性: 
        float: right;
        line-height: 38px;
        border-radius: 19px;
        margin-top: 9px;
```  
(6) styled-components语法, 加载不同的背景图片
```
  <img imgUrl={item.get("imgUrl)}/>
  background: url(${(props ) => props.imgUrl});
```

### 新东西
(1) dom字符串   
```
  content: '<img src="https://upload-images.jianshu.io/upload_images/11956250-d052c1ded91dddad.png" alt=""/><p><b>后期维护成本也是问题，希望谷歌在这方面做一些改变，让 Flutter 可以更好的发展下去。</b>\n' +
    '在设计好一个视图后，可以横向纵向一层一层定义结构，行就用 Row，列就用 Colunm，使用方法就在 Flutter Go 上去查。在 Flutter 中，万物皆为Widght，可以在图中看到，即使是一个边距之类的，都会用一个 Widget 实现。\n' +
    '点击事件也是一个 Widght， 用 GestureDetector 实现。有两个参数，一个是 onTap(), 也就是点击的回调，一个是 child，也就是我们需要点击事件的 widght。这个项目中，点击事件都是跳 WebView 页，然后看下 WebView 页怎么创建。如果不需要状态管理，那么就可以正常创建一个界面，然后child用 WebviewScaffold 实现，即可实现 WebView\n' +
    '的功能。</p>'
```

(2) 使dom字符串不转译
```
<Content dangerouslySetInnerHTML={{__html: this.props.content}}/>
```           

(3) actionCreators分三种类型写
```
1. 异步action
export const changeList = () => ({});

2. 暴露普通对象action
export const getData = () => {
    return (dispatch) => {
        axios.get(...).then(...).catch(...);
    }
};

3. 非暴露普通对象action
const changeList = () => ({});
```        

(4) reducer中case代码多, 写到一个函数中
```
const changeList = (state, action) => {...}

case constants.CHANGE_LIST:
    return changeList(state, action);
```        

(5) PureComponent, 只有当前组件中用到的数据变化时, 才会重新加载, 执行render()
```
import {PureComponent} from 'react'; --- PureComponent底层实现了shouldComponentUpdate()
PureComponent 必须和 Immutable.js 一起使用, 来管理你的数据
```       

(6) 返回顶部功能实现 & 页面滚动事件监听 & 注册 & 移除:
```
1.实现回到顶部的代码: window.scrollTo(0, 0);

2.实现滚动监听函数的绑定/解绑: 
绑定: window.addEventListener("scroll", this.props.changeScrollTopShow);
解绑: window.removeEventListener("scroll", this.props.changeScrollTopShow);

3.获取滚动值
document.documentELement.scrollTop

4.实现根据滚动距离
if(document.documentElment.scrollTop > 100) {
    dispatch(actionCreators.toggleTopShow(true));
}else {
    dispatch(actionCreators.toggleTopShow(false));
}

5.显示/隐藏
{this.props.showScroll ? <LoadMore>顶部</LoadMore>}

```

(7) Link的单页应用跳转   
```
import { Link } from 'react-router-dom';

<Link to="/detail" key={item.get("id")}>
    <ListItem />
</Link>

<Link to="/">
    <Logo/>
</Link>

单页应用的跳转 --- 整个网站只会加载一个html文件.
当我点击<a href="/detail" key={item.get("id")}>时 >>> detail >>> 又加载了一次html文件
这样, 每次跳转, 就会加载一次html文件, 这是比较耗性能的
```   
(8) 公用组件和页面组件的区分 & 页面组件的子组件划分 & 子组件样式, actionCreaetors, constants, reducer共用        
        
(9) 动态路由获取路由参数 --- 进行多个页面之间的数据传递        
```
Link传递参数 + Route匹配路径 + this.props.match.params.id获取参数 + getDetail(id)请求不同页面.
例如: /detail/:id 路径传递/获取参数id 

路由设置:
<Link to={"/detail/"+item.get("id")}>

路由匹配: 
<Route path="/detail/:id" exact component={Detail}/>

获取路由参数: 
this.props.match.params.id

传递给getDetail(id), 根据不同的id, 服务端返回不同的请求页面.
componentDidMount() {
    getDetail(this.props.match.params.id);
}

getDetail(id) {
    dispatch(actionCreators.getDetail(id));
}

export const getDetail = (id) => {
    return (dispatch) => {
        axios.get("/api/detail.json?id=" + id)
            .then((res) => {
               // ...
            })
            .catch((err) => {
               // ...
            });
    }
};

这样在请求不同的详情页面时, 传递不同的参数id, 发起异步请求时, 服务端返回不同的请求页面.
```        
(10-1) todolist删除内容 >>> [].splice(index, 1);
        
(10-2)使用immutable的concat()方法, 来往articleList这个数组中追加内容.           
         
(11-1) UI组件 --- 只负责显示, 没有逻辑, 傻瓜组件.          

(11-2) 容器组件 --- 负责业务逻辑, 不管显示, 聪明组件.  

(12) 无状态组件 --- 只有render()函数 & 没有生命周期 & 执行速度快        
 
(13) redux中间件 --- Redux中间件的作用是对dispatch()方法的升级或封装 & action和store之间     
     
(14) react-redux --- 更容易使用 redux. Provider connect          
    
(15) 使用styled-component + reset.css     

(16) onFocus/onBlur: 鼠标移入/移出事件      

(17) reducer中的数据格式统一 --- immutable.js       
       
(18) create-react-app --- 底层node服务器     
```
访问 http://localhost:3000/api/headerList.json
1.先看工程目录 
2.没有, 则看 /public/api/headerList.json --- 返回假数据
```
(19) spin旋转按钮动画实现
```
代码展开
<i className="iconfont spin" ref={(icon) => {this.spinIcon = icon;}}>&#xe851;</i>

handleSpinRotate(spin) { // 函数名字根据自己需求来修改
    let originAngle = spin.style.transform.replace(/[^0-9]/ig, "");
    if(originAngle) {
        originAngle = parseInt(originAngle, 10);
    }
    else {
        originAngle = 0;
    }
    // 顺时针旋转
    spin.style.transform = `rotate(${originAngle + 360}deg)`;
    
    // 逆时针旋转
    spin.style.transform = `rotate(${originAngle - 360}deg)`;
}

```
(20) ref获取DOM节点
```
1.获取旋转的角度值
let originAngle = spin.style.transform.replace(/[^0-9]/ig, '');
        
if(originAngle){
    originAngle = parseInt(originAngle, 10);
}
else {
    originAngle = 0;
}       

spin.style.transform = `rotate(${originAngle + 360}deg)`;

2.获取account/password的输入值
使用ref, 获取DOM
ref={(input) => this.account = input;}
ref={(input) => this.password = input;}

获取到DOM值, 并派发action, 执行异步请求:
this.account >>> DOM节点 >>> 获取节点的值 >>> this.account.value
this.password >>> DOM节点 >>> 获取节点的值 >>> this.password.value
```
(21) 避免无意义的请求 --- 点击一次input输入框, 发送一次axios请求
```
通过判断list来决定是否有需要 发送异步请求
(list.size === 0) && dispatch(actionCreators.getList());
```

(22) 路由的使用
```
import {BrowserRouter as Router, Route} from 'react-router-dom';

<Router> 
    <Route path="/" exact render={()=><div>home~</div>}/>
    <Route path="/detail" exact render={()=><div>detail~</div>}/>
</Router>
```
(23) 思考自己的项目有几个页面: --- 创建pages文件夹存放不同的页面
```
1. common文件夹 --- 公用组件 --- header组件 和 其他公用组件
2. pages文件夹 --- 项目页面组件 
                            --- home页面 --- home组件   
                            --- detail页面 --- detail组件
```
(24) 在HomeWrapper中再划分出多个模块, 分别写成子组件 --- 创建components文件夹存放不同的子组件
```
<List/>
<Recommend/>
<Topic/>
<Writer/>
```

(25) immutable获取数据
```
const {topicList} = this.props; // immutable对象
topicList.get("id");
topicList.get("title");
topicList.get("content");
```

(26) 登录/登出页面实现
```
1.在 ./pages/login/store/reducer 中定义属性login.
2.false >>> 未登录; true >>> 已经登录
3.根据属性login的值来显示 "登录"/"退出"
```

(27) 登录鉴权
```
1.定义Write组件

2.根据reducer的login属性值, 显示Write页面/登录页面

    if (loginStatus) {
      return (
        <div>写文章页面</div>
      )
    } else {
      return <Redirect to="/login"/>
    }

3.添加write路由: 
import Write from './pages/write';
<Route path="/write" component={Write}/>

4.在 /header/server.js 中 "写文章" 按钮上, 添加<Link>
<Link to="/write">
</Link>

5.核心思想: Write的组件的显示内容会根据login属性来决定
```

(28) 异步组件 --- 使用react-loadable

(29) withRouter, 解决使用react-loadable后, 参数this.props.match.params.id获取报错的问题

(30) 项目上线流程 
```
后端配置:       
(1) 下载XAMPP软件       
(2) Manage Servers >>>      
(3) 启动Apache Web Server >>> localhost            
(4) 后端目录 /XAMPP/htdoc >>> 创建api文件夹      
(5) 复制 /public/api/所有json文件(模拟数据) 到 /XAMPP/htdoc/api/  目录下      
(6) 查看 /localhost/api/homeList.json         
    
前端配置:       
(1) 命令行关闭前端项目       
(1-2) 删除 /public/api 文件夹        
(2) 执行npm run build >>> build目录     
(3) 将build文件夹 给 后端的同学       

前后端结合:     
(1) 后端同学 复制 build文件夹中的内容 到 /XMAPP/htdoc/ 文件夹        
(2) 访问后端的项目 localhost:80端口      
(3) 前端的代码拷贝到后端的项目中  
```

(31) List 和 fromJS 数据转换的区别
```
1.List只会把[]数组的外层转换成Immutable对象, 内层的{}仍然是js对象
        
2.fromJS会把内层 + 外层 都转换成 Immutable对象
        
[ --- 外层
    { --- 内层1
        "id": 1,
        "name": "dcj"
    },
    { --- 内层2
        "id": 2,
        "name": "aaa"
    }    
]
```

(3) 在写任何组件时, 可以把流程思路写下来, 然后用过代码一步一步的实现出来.
