# Client

### 1.box-shadow
```
box-shadow: 水平阴影距离 垂直阴影距离 模糊距离 颜色;
```

### 2.box-sizing: border-box;
```
padding不会撑开
例子:

div {
    width: 489px;
    padding-right: 9px;
    box-sizing: border-box;
}
因为设置了box-sizing: border-box, 所以<div>实际标签的宽度width为 489px - 9x = 480px;
设置了box-sizing: border-box; 总长不变, 放置内容区域宽度, 需要减去padding值
```

### 3.z-index
```
z-index: 数值越大, 越靠近自己, 优先级越高

同级元素z-index比较:
<Mask/>
<NavWrapper/>

1.当<Mask/> 大于 <NavWrapper/>时, <NavWrapper/>不能被点击
2.当<Mask/> 小于/等于 <NavWrapper/>时, <NavWrapper/>可以被点击

```

### 4.获取input输入框的value和placeholder
```
<Input ref={(input) => this.searchInput = input}/>
<Button onClick={() => handleClick(this.searchInput)}>

handleClick(inputElem) {
    placeholder: inputElem.placeholder 
    value: inputElem.value
}
```

### 5.打开一个新的页面
```
window.open("你要打开的地址");
```

### 6.页面获取路径参数
```
this.props 如果没有显示路由信息, 可以做如下处理:

import {withRouter} from 'react-router-dom';

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HeaderLogin));
```

### 7.横线贯穿文字
```
export const Title = styled.div`
    width: 980px;
    height: 28px;
    text-align: center;
    margin: 0 auto;
    margin-bottom: 28px;
    border-bottom: 1px solid #ddd;
    span {
        font-size: 38px;
        padding: 0 20px;
        background-color: #fff;
        height: 56px;
        line-height: 56px;
    }
`
这里可以体会下 line-height属性的含义
margin-bottom: 28px; + height === 56px;
```

### 8.左右分割线
```
分割线1:
export const Line = styled.div`
    float: left;
    border-right: 1px solid #ddd;
    height: 300px;
    margin-top: 28px;
`;

分割线2:
  em {
    display: inline-block;
    height: 10px;
    line-height: 10px;
    border-right: 1px solid #b8c0cc;
    margin: 12px 15px 0;
    vertical-align: top;
  }
```

### 9.展示图片的几种方式
```
1.<div>标签
  条件: 使用尺寸比较大的无背景图片
  div {
    background: url(${logoPic});
    background-size: contain;
  }
    
2.<img>标签
  给img指定width: 100%, 能让大图片完全显示
  大图片
  img {
    width: 100%;
  }
  
3.<div>标签
  div {
    background: url(...) no-repeat;
    background-size: cover;  
  }
        
4.<div>标签
  div {
    width: 160px;
    height: 100px;
    background-image: url(${props => props.previewImgUrl}); // 加载的预览图片
    background-repeat: no-repeat;
    background-color: #000; // 当预览图片加载失败时, 显示黑色背景
    background-size: contain;
    background-position: 50%; // 表示水平方向偏移50% 垂直方向偏移50% 那个点作为图片展示的起始点
  }  
  
  background-position + background-size 一起使用
  如果只使用background-size 在垂直方向 不是居中的.
 
```

### 10.定位
```
export const GrandParent = styled.div`
    width: 480px;
`;

export const Parent = styled.div`
    position: relative;
    width: 140px;
    height: 140px;
    margin: 0 auto;
`;

export const Child = styled.div`
    position: absolute;
    width: 480px;
    height: 192px;
    top: -50px;
    left: 50%; 
    margin-left: -240px;
`;

<GrandParent>
    <Parent>
        <Child />
        <img />
    </Parent>
</Parent>

初始状态: 
1.left: 50%; 表示 <Child> 向左偏移 <Parent> 宽度的 50%;, 此时 <Child> 的左边框border-left 正好在 <Parent> 的中线上.
2.<Parent> 采用margin: 0 auto;水平居中, 也就是说 <Parent> 和 <GrandParent> 的中线重合.
因此 <Child> 的左边框border-left 此时距离 <Parent> 的距离为 480px/2=240px;
3.margin-left: -240px; 使得 <Child> 的左边框border-left 和 <Parent> 重合.
                     也使得<Child> 的左边框border-left 和 <GrandParent>重合.
```


### 11.动画
```
1.判断是否需要使用动画
        
(1)当组件的变化是基于css的 >>> 可以使用动画
        
<Tips>的显示/隐藏 >>> 基于css的opacity
        
<NavSearch>的宽度变化 >>> 基于css的width
        
(2)当组件的变化和css属性没关系时, 就不要使用动画了
                
{focused ? <NavItem1> : <NavItem2>} --- 不同组件切换
        
2.写动画
        
(1) 使用css实现动画
        
<Tips
    className={mouseIn ? "mouseIn": ""}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
/>    
        
export const Tips = styled.div`
    opacity: 0;
    transition: opacity .5s;
    &.mouseIn {
        opacity: 1;
    }
`;
        
(2) 使用react-transition-group优化动画实现过程(进场, 退场)
        
<CSSTransition
    timeout={2000} // 动画执行时间
    in={mouseIn}
    classNames="opacity"
>
    <Tips .../>
</CSSTransition>
        
export const Tips = styled.div`
    opacity: 0;
    // ----- 最终状态由mouseIn来决定
    &.mouseIn {
      opacity: 1;
    }
    // ----- 以下只是动画执行过程
    &.opacity-enter {
      transition: opacity .5s;
    }
    &.opacity-active-enter {
      opacity: 1;
    }
    &.opacity-exit {
      transition: opacity .5s;
    }
    &.opacity-active-exit {
      opacity: 0;  
    }    
`;
```


### 12.清除immutablejs的List中所有数据
```
List([1,2,3,4]).clear();
```

### 13.在React中实现计时器
```
1.需求: 开始/暂停, 计次, 重置
        
2.在Redux中定义属性: timer, timeOn, timeCount 
        
timer: 计时器对象, 默认为空对象
        
timeOn: Boolean, 计时器是否开启
        
timeCount: Number, 计时, 已经过了几秒
        
3.思路:
        
(1)当timeOn: false时, 创建计时器, 并赋值非对象timer
  
(2)计时器派发action, 更新Store的时间         
        
(3)派发action --- 更新Store的timer对象
        
(4)派发action --- 更新Store的timeOn状态
        
代码: 
     
timer = setTimeout(function(){
    dispatch(actionCreators.changeTime()); --- (2)
} ,1000);        

dispatch(actionCreators.changeTimer()); --- (3)
dispatch(actionCreators.changeOnStatus()); --- (4)
            
(5)计次 --- 将时间追加到一个数组, 并显示出来.
        
(6)重置 --- 将timeCount设置成0.
        
(7)实战:
        
在什么时候显示 "刷新二维码" 按钮?
        
if(timeCount > 10 && !refreshIn){...} --- 在时间超过10s, 并且"刷新二维码"按钮 沒有显示时
                
          
当要重置时, 需要执行哪些操作?

第一步: 重置timeCount

第二步: refreshIn: false

第三步: 再次向server请求登录二维码          
       
```

### 14.toLocaleString()理解
```
代码总结
https://juejin.im/post/5ac7079f5188255c637b3233
```

### 15.判断对象{}是否为空
```
Object.keys({}).length
        
Object.keys({name:'dcj',age:12, color: "red"}).length
```

### 16.文字前, 小图片实现 ::before
```
1.需求: 在文字前加上图片
        
新浪微薄图片 + 新浪微薄文字
        
QQ图片 + QQ文字
        
2.使用::before 伪元素
        
export const ThirdButton = styled.div` 
    // ...       
    &::before {
        content: "";
        width: 21px;
        height: 21px;
        margin-right: 5px;
        display: inline-block;
        vertical-align: middle;
    }
`
        
这里没有将共同部分抽取, 放在了一起

3.在文字加上图标
(1)从IconFont上下载需要的图片: play.png/danmu.png
(2)代码:
import play from '../../static/images/play.png';
import danmu from '../../static/images/danmu.png';

span.play {
    &::before {
        content: "";
        display: inline-block;
        width: 12px;
        height: 12px;
        background: url(${play}) no-repeat;
        background-size: cover;
        vertical-align: top;
        margin-right: 5px;
    }
}

span.danmu {
    &::before {
        content: "";
        display: inline-block;
        width: 12px;
        height: 12px;
        background: url(${danmu}) no-repeat;
        background-size: cover;
        vertical-align: top;
        margin-right: 5px;
    }
}

有重复的代码, 提取
        
```

### 17.互斥按钮, styled-component实现
```
1.找出两个按钮 不同的css样式
        
2.不同样式 对应的值 使用 props 传入
        
3.JSX代码
        
    <ButtonWrapper>
        <LocalLoginButton login>登录</LocalLoginButton>
        <LocalLoginButton>注册</LocalLoginButton>
    </ButtonWrapper>
        
4.styled-components实现css代码:
        
export const LocalLoginButton = styled.div`
  // 相同部分
  display: inline-block;
  width: 184px;
  height: 36px;
  line-height: 38px; // border-top + border-bottom
  border: 1px solid #ddd;
  background-color: #D9482F;
  border-radius: 2px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  text-align: center;
        
  // 不同部分
  border: 1xp solid ${props => props.login ? "#ddd" : "#D9482F"};
  color: ${props => props.login ? "#fff" : "#D9482F"};
  background-color: ${props => props.login ? "#D9482F" : "#fff"};
  margin-left: ${props => props.login ? "" : "34px"}
`;
        
5.找出互斥按钮的 相同css属性 和 不同css属性
        
(1)相同的css属性写在一起     
        
(2)不同的css属性, 通过props属性传递进来(这里只适用于2个按钮)
        
```


### 18.线性渐变颜色:
```
线性渐变: 
background: linear-gradient(transparent,rgba(0,0,0,.1) 20%,rgba(0,0,0,.2) 35%,rgba(0,0,0,.6) 65%,rgba(0,0,0,.9));
```

### 19.打断换行单词
```
1.多余部分不显示
word-break: break-all;
word-wrap: break-word;
+ 通常和
overflow: hidden;
一起使用 
用于模块的标题超出部分 合理的打断/超出部分隐藏

2.多余部分使用 ... 代替
当宽度足够时, 可以修改width的宽度来手动形成 "宽度不足, 隐藏多余部分" 的效果
width: 47%;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
// ellipsis单词表示省略的意思

3.触发条件
(1)width: 47%;
(2)max-width: 135px;
```

### 20.推荐Item, 悬停出现弹窗思路
```
1.定义主题结构:
样式描述: 图片 + 标题在图片底部 + 当hover时, 完全展示
<RecommendItem>
    <img/> --- 背景图片
    <MarkWrapper> --- 悬停布局
        <p></p> --- 标题
        <p></p> --- 作者
        <p></p> --- 播放次数
    </MarkWrapper>
    <WatchLater/> --- 稍后观看
</RecommendItem>
                
2.<MarkWrapper>布局:
(1)采用绝对定位 position: absolute;
        
(2)top: 68px; 只将<MarkWrapper>的 "标题" 部分露出, 
其他部分 "作者" "播放次数" 通过<MarkWrapper>的overflow: hidden;隐藏
        
(3)给<RecommentItem>绑定事件
handleRecommendItemEnter(index) >>> 设置showDetail标志位为true + 保存索引index
handleRecommendItemLeave() >>> 设置showDetail标志位为false + 保存索引-1
        
(4)三元运算切换样式:
<MarkWrapper className={(showDetail && selected === index) ? "showDetail" : ""}>
<WatchLater className={(showDetail && selected === index) ? "showDetail" : ""}>
                
MarkWrapper: showDetail样式包括:
top: 68px; >>> top: 0; 显示完整的<MarkWrapper>布局中的内容
height: 20px; >>>> height: 100%;(父元素<RecommendItem>高度: 100px)
background: 线性渐变颜色 >>> background: rgba(0,0,0,0.7);       
                
WatchLater: showDetail样式包括:
display: none; >>> display: block;        
        
```

### 21.布局流水线1
```
1.确定内容部分 --- ContentWrapper     
export const ContentWrapper = styled.div`
    width: 980px;
    margin: 0 auto;
`;
        
2.确定子内容模块 --- RecommendWrapper/PopularizeWrapper/LiveVideoWrapper
(1)padding-bottom: 15px; // 和下一个子内容模块 拉开 距离.
(2)清除浮动: 
&::before {
    content: "";
    display: table;
}

&::after {
    content: "";
    display: table;
    overflow: hidden;
    clear: both;
}
这是清除浮动的其中一种方式, 可用于不能使用overflow: hidden;的情况下使用.

3.布局1:
------------------------------------------
|   title-left         |    title-right  |
------------------------------------------
|                      |                 |
|   content-left       |   content-right |
|                      |                 |   
|----------------------------------------|

浮动 + 指定宽度
(1)float:left; + width: 720px;
(2)float:right; + width: 260px;
        
左浮动标题: 
(1)padding-bottom: 15px; // 和左浮动内容之间距离
(2)对每个模块进行详细设计 --- width && height
(3)必要的尺寸计算
        
4.布局2
------------------------------------------
|                      |                 |
|   content-left       |   content-right |
|                      |                 |   
|----------------------------------------|

左浮动内容
(1)直接指定width && height
(2)每个模块进行详细设计 --- width && height
(3)必要的尺寸计算

```

### 22.具体模块精确设计
```
1.推荐部分
2.推广部分
3.直播部分
```

### 22.图片懒加载(当没有图片时, 会展示默认的图片)
```
export const LiveLeftPicBox = styled.div`
  position: relative;
  width: 160px;
  height: 100px;
  border-radius: 4px;
  overflow: hidden;
  text-align: center;
`;

export const LazyImg = styled.div`
  width: 100%;
  height: 100%;
  background: url(${imgLoading}) 50% no-repeat; // 50% 50% 表示起始点是图片中心点
  img {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

1.定义一个div容器, 用于给定width和height
2.给定一个div容器, 用于给定懒加载默认图片的背景显示
3.给定一个img标签, 用于显示有内容时的图片
```

### 23.background-position
```
Mask组件
1.指定的位置 相对于 左上角 的偏移距离
```

### 24.transition属性, 分开写
```
transition: .2s;
transition-property: border, color;
```

### 25.下滑线, 三角箭头
```
方式一:
    content: "";
    width: 0;
    height: 0;
    border: 3px dashed #D9482F;
    border-bottom-style: solid;
    border-top: none; 
    border-left-color: #19f90d00;
    border-right-color: transparent;
    margin-left: 10px;
    
方式二:
    content: "";
    // display: none;
    position: absolute;
    left: 50%;
    margin-left: -3px;
    bottom: 0;
    width: 0;
    height: 0;
    border-bottom: 3px solid #00a1d6;
    border-top: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;        
```

### 26.选项卡下标思路:
```
export const LiveTabItem = styled.div`
  float: left;
  position: relative;
  height: 20px; // 24px = 20px + border-bottom(1px) + padding: 1px 0 2px 
  line-height: 20px;
  padding: 1px 0 2px;
  border-bottom: 1px solid transparent; // 选中后, 改变颜色
  cursor: pointer;
  // 动画
  transition: .2s;
  transition-property: color, border;

  text-align: center;
  font-size: 12px;
  margin-left: 10px;
  &:first-child {
    margin-left: 0;
  }
  &:hover {
    color: #D9482F;
  }
  &::before {
    // 实现"三角"效果
    content: "";
    // display: none;
    position: absolute;
    width: 0;
    height: 0;
    border-bottom: 3px solid #D9482F;
    border-top: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid transparent;
    
    // 调位置
    left: 50%;
    bottom: 0;
    margin-left: -3px;
  }
  &.on {
    color: #D9482F;
    border-color: #D9482F;
    background-color: transparent;
  }
  &.on::before {
    display: block;
  }
  &.liveTab-enter {
    transition: .2s;
    transition-property: color, border;
  }
  &.liveTab-enter-active {
    color: #D9482F;
    border-color: #D9482F;
    background-color: transparent;
  }
  &.liveTab-exit {
    transition: .2s;
    transition-property: color, border;
  }
  &.liveTab-exit-active {
    color: #222;
    border-color: transparent;
    background-color: transparent;
  }
`;
1.<LiveTabItem>表示选项卡
2.左浮动排列
3.高度计算动画属性
4.设置动画属性
transition-property: color, border;
当选项卡切换时, color属性变化, border属性变化(从transition透明转换成#D9482F)
5.选项卡底部"三角箭头"制作, 不明白为什么要这么写.

思路
```

### 27.总结"正在直播"右侧, "直播排行"的css书写
```
正在直播, 右侧, "排行榜", 思路整理(不会完全复述代码, 只梳理出关键部分)
(1) 指定整个布局宽度
(2) 指定整个布局中的 每一项 item 的位置(item 和 item之间的间隔) + overflow: hidden(item中的内容会使用到float)
(3) 懒加载实现
<div> --- 使用左浮动 + 确定容器 宽度/高度 + overflow:hidden (隐藏多余部分) 
    <div> --- 继承父元素的 宽度/高度 + 设置"默认"背景 background: url(${...}) 50% no-repeat;
        <img src="..." alt=""/>  --- display: block; + 继承父元素的 宽度/高度
    </div>
</div>
(4) 内容实现 --- 使用左浮动 + 指定宽度
(5) 第一层, 指定高度 + overflow: hidden(作者+观看人数都使用 float:left 左浮动)
(6) 作者: 使用左浮动 + 指定字体颜色 + 文本过长处理(max-width+overflow/white-space/text-overflow)
(7) 观看人数: 使用右浮动 + 指定字体颜色 + 文本过长处理 
(8) 第二层, 指定高度 + 指定字体颜色 + 指定字体大小 + 文本过长处理 + 和第一层的距离
```

### 28.写文本时, 考虑文本是否会过长, 需要采取 "打断" 或 使用"..."来代替
```
1.具体参考第19条
```

### 29.使用装饰器@connect
```
一种新写法, 还没搞明白为什么要这么写
```

### 30.line-height实战总结(不清楚理论上是怎么样的)
```
(1)有代码:
{
    font-size: 12px;
    border-bottom: 1px solid transparent;
    padding: 1px 0 2px;
    height: 20px;
    line-height: 20px;
}
1.实际测下来的间距是上,下各6px;
2.内容区域content-area的高度是: 12px; --- font-size
3.间距: [20px(line-height/height) + 1px(border-bottom) + 1px(padding) + 2px(padding) - 12px] / 2 = 6px;

结论: 
[line-height + padding-top + padding-bottom + border-bottom] / 2 - font-size = 半行间距
需要将padding和其他影响高度的元素 计算进去

(2)height和line-height之间的关系该如何理解?
height: 表示当前元素的高度
line-height: 表示 内容在line-height中时的位置, 并将这个位置体现在 高度为height的容器中

所以在位置上会有偏差

```

### 31.右侧"三日/一周"的悬停后, 以不到选项的问题
```
1.可能是z-index的问题
// "三日"/"一周" 待切换选项卡
export const RightSwitchItemWrapper = styled.div`
  position: absolute;
  width: 100%; // 继承RightDropDownWrapper的width
  top: 22px;
  left: -1px;
  border: 1px solid #cdd0d7;
  border-top: 0;
  border-radius: 0 0 4px 4px;
  display: none;
  // background-color: #fff;
  background-color: red;
  z-index: 10; // 关键
  &.show {
    display: block;
  }
`;

(1)逻辑上这么写, 没有错误, 但是可能z-index不够, 造成当移到下面去的时候, 首先捕捉的是其他的z-index,
造成了以不到display: block;上的情况

(2)以后遇到移不到, display:block;上时, 可以考虑z-index的数值问题

```

### 32.番剧
```
(1)当指定width: 100%;
margin-right: 20px;会不起作用,
解决办法是: 不要设置width: 100%;即可 

(2)css选择第1个元素
&:first-child {}

(3)css选择第2,3个元素, 第n个元素
&:nth-child(2) {}
&:nth-child(3) {}
&:nth-child(4) {}
```

### 33.-webkit-line-clamp下多行文字溢出点点点...
```
CSS代码：
.box {
    width: 400px; 
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
HTML代码：
<div class="box">
    【大众点评与美团网合并 王兴张涛担任联席CEO】大众点评网与美团网今天联合发布声明，宣布达成战略合作，双方已共同成立一家新公司。新公司将实施Co-CEO制度，美团CEO王兴和大众点评CEO张涛将同时担任联席CEO和联席董事长，重大决策将在联席CEO和董事会层面完成。
</div>
```

### 34.不是所有的参数都要从redux中获取的, 比如一些子组件需要的参数 可以 从父组件这边传入

### 35.如何摆脱React Router的Link组件的下划线???
```
1.在使用styled-components的情况下
2.对Link进行样式封装
import styled from 'styled-components';
const StyledLink = styled(Link)`
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

// 无状态组件
function test(props){
    return (
        <StyledLink {...props}/>
    )
}

export default test;

// 简化写法 --- 匿名组件
export default (props) => <StyledLink {...props}/> 

// >>> 可以将这个组件写成公用组件
```

### 36.CSS3 pointer-events:none应用举例及扩展
```
1.url: https://www.zhangxinxu.com/wordpress/2011/12/css3-pointer-events-none-javascript/

2.简单理解就是: pointer-events:none的作用：对鼠标事件Say GoodBye!!

```

### 37.动态加载图片
```
<img src={require(item.imgUrl + '')} alt=""/>
```

### 38.React中this.setState(() => ({});不能马上更新state的情况
1. 因为只有render()时, 才会刷新state中的值
2. 解决方案:
```
this.state = {
    name: 'dcj123'
};

this.setState(() => ({
    name: 'xxx123'
}));
console.log(this.state.name); // 此时name值没有变化

可在render(){}中加入代码:
render() {
    return (
        <div>
            ...
            <div>{this.state.name}</div>
        </div> 
    ) 
}
会监听到this.state.name变化了 >>> render()重新加载 >>> this.state.name更新 
```


### 39.解决Immutable.List中是Immutable.Map数据类型, 取值报错的问题
```
List [Map, Map, Map, ...]

const list = List [Map, Map, Map, ...]; // 伪代码
list.valueSeq().get(0); // 直接获取值
或
list.valueSeq().map((item, index) => {...}); // 遍历循环

```

### 40. 底部栏 --- 好看的背景颜色设置
```
background: -webkit-linear-gradient(transparent, rgba(0,0,0,.5));
```

### 41.平移当前组件的宽度
```
transform: translate3d(100%,0,0); // 100%表示当前p的宽度width
```


## 解决方案: 
用来解决嵌套路由 https://juejin.im/post/5a9d171cf265da23766ac646 

## react-router-dom 文档