### 设计state容易犯的两个错误
* 以API作为设计state的依据:
```
缺点:
1.许多重复的信息
2.数组类型结构, 不便于查找, 每次查找某条记录时, 都需要遍历整个数组
3.API是基于服务端逻辑设计的, 而不是基于应用的状态设计的.
```

* 以页面UI为设计state的依据
```
缺点:
1.存在数据重复的问题
2.新增或修改一条数据时, 需要修改不止一个地方 
(1)造成存储浪费
(2)造成数据不一致的风险
```

### 合理设计state --- 领域数据
* 像设计数据那样设计state
```
1.把整个的state看作一个数据库
2.state中的每一部分状态看作数据库中的一张表
import user from './redux/user.redux';
import deviceIp from './redux/device.redux';
import auth from './redux/auth.redux';
import group from './redux/group.redux';

user表
deviceIp表
auth表
group表

3.状态中的每一个字段对应表的字段
user.redux.js 
user表

user.redux.js字段有
const defaultState = fromJS({
    id: '',
    name: ''
});
```
user表

id| name |
------------ | -------------
001 | dcj123
002 | imooc

* 设计state的三个原则: 
```
1.将这个应用状态分成若干子状态(分成几张表),
  子状态之间不能保存重复的数据(每张表中不能保存重复的数据)
2.表以键/值对存储数据, 以记录的key或id作为记录的索引, 
  记录中的其他字段都以来于索引
  记录: 表中一条数据
  posts表:
  见下面
  1234567890abcd: {
    "id": "1234567890abcd",
    "title": "大家一起来讨论react吧",
    "vote": 8,
    "updateAt": "2019-10-27",
    "author":"59e123981hj43k2j4h3j"
  }
  (1)由数组类型 >>> 以id为key的JSON对象类型
  (2)"author":"59e123981hj43k2j4h3j", 只保存id
  使得原来嵌套的数据扁平化
  (3)扁平化数据更利于扩展  
3.表中不保存, 可以通过已有字段计算而来的数据, 
  即表中的字段互不依赖
```

id | title | vote | updateAt | author
------------ | ------------- | ------------ | ------------- | ------------ |
1234567890abcd | 大家一起来讨论react吧 | 8 | 2019-10-27 | 59e123981hj43k2j4h3j


### state包括领域数据, 应用状态数据, UI状态数据
```
1.领域数据 --- 看上面
2.应用状态数据 --- 当前登录状态, 是否有API正在请求
app: {
    requestQuantity: 0,
    error: null
},
auth: {
    userId: null,
    username: null
}
3.UI状态数据 --- 对话框当前是否处于打开状态
ui: {
    addDialogOpen: false,
    editDialogOpen: false,
}
```

### 良好的模块设计对外暴露的应该是模块的接口, 而不是模块的具体结构
```
在每个xxx.redux.js文件中, 编写selectors, 用户获取xxx.redux.js中数据
```

### action和reducer之间, 不存在一对一的关系, 一个action是可以被多个模块的reducer处理的.
```
user.redux.js
const reducer = (state = defaultState, action) => {
    switch(action.type) {
        case commentTypes.FETCH_COMMENTS:
        case postTypes.FETCH_ALL_POSTS:
        return {...具体处理}
    }
};
```

### 对url进行封装

### 步骤:
1.首先分析应用状态是
* 领域数据
* 应用状态数据
* ui状态数据

2.如果是领域数据:
* 按照设计(数据库)表的思路来设计字段
* 键/值对
* id: {...}
* byPost: {id: {...}, {id: {...}}}
  byId: {id: {...}, {id: {...}}}

3.请求完成, 拿到数据后, 分析数据要分为哪几块(分析数据要存在哪些表中)
```
将请求返回数据 >>> 拆分 >>> 表1
                     >>> 表2 >>> 放在不同的表中存储
                     >>> 表3    
```
4.扁平化处理为不同的表作数据处理
5.selectors用于暴露接口