## splayer组件对videojs封装
### 1.安装
```
npm install video.js --save-dev

import videojs from 'video.js';
```
### 2.创建video.js
```
1.<video>标签 + data-setup='{}'属性

2.<video>标签 + className='video-js' >>> 使用video.js样式
```

### 3.使用js来创建video.js
```
videojs('播放器DOM_ID', 播放器设置, 响应函数) 

播放器DOM_ID === <video id='xxx'>
```

### 4.事件
```
this.video = videojs('播放器DOM', 播放器设置, 响应函数);

this.video.on('play', () => { 
    console.log('play');
});

this.video.on('pause', () => {
    console.log('pause');
})

this.video.on('ended', () => {
    console.log('ended'); // 影片播放结束
});

等等, 还有一些其他事件
```

### 5.实战: 使用React来封装一个videojs组件
#### 5-1.定义组件
```
import React from 'react';
import videojs from 'video.js';
import '../../../node_modules/video.js/dist/video-js.css'; // 必须导入
import PropTypes from 'prop-types';

class SPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.player = React.createRef();
    }

    static propTypes = {
        url: PropTypes.string.isRequired,
        width: PropTypes.string.isRequired,
        height: PropTypes.string.isRequired
    };

    render() {
        return (
            <video
                className='video-js'
                data-setup='{}'
                ref={this.player}
                autoplay // 自动播放
                controls // 显示控制条
            />        
        )
    }

    componentDidMount() {
        const videoNode = this.player.current;
        const {eventOn} = this.props;
        this.video = videojs(videoNode, {
            sources: [{
                src: this.props.url
            }],
            width: this.props.width
            height: this.props.height
        });

        // 事件监听
        Object.keys(eventOn).forEach((item) => {
            this.video.on(item, () => {
                eventOn[item]
            });
        });
    }

    componentWillUnmount() {
        if(this.video) {
            this.video.dispose();
        }
    }
}

export default SPlayer;
// src, width, height属性的值, 都通过父级元素传递进来

// 也可以为这些属性指定默认值
SPlayer.defaultProps = {
    url: '', 
    width: '',
    height: ''
};
```
##### 补充1.videojs(参数1, 参数2, 参数3);
- [x] 参数1: 使用React.createRef()来获取播放器的dom节点
- [x] 参数2: 设置播放器的参数配置

##### 补充2.组件卸载时, 销毁videojs播放器
##### 补充3.必须导入videojs库的css文件
- [x] 导入后, 设置videojs宽/高, 起作用
- [ ] 不导入, 设置videojs宽/高, 不起作用, 并显示一些测试空间


#### 5-2.定义接口
* 也就是SPlayer的配置参数通过属性传递进来
```
使用prop-types + 定义传入videojs属性 
例如: 上面的url, width, height

// 定义
static propTypes = {
    url: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired
};

// 使用
const videoNode = this.player.current();
this.video = videojs(videoNode, {
    sources: [{
        src: this.props.url
    }],
    width: this.props.width,
    height: this.props.height
},'回调函数');

// 设置默认值
SPlayer.defaultProps = {
    url: '',
    width: '',
    height: '',
    ...
    定义其他字段
};

```

#### 5-3.事件监听
```
    定义时: 
    {
        事件名称: function() {...}
    }

    最终:
    .on(事件名称, function() {...})
```
* 实现
```
<SPlayer 
   ... 值是一个对象{}
    eventOn={
        {
            play: () => {
                console.log('play');
            },
            pause: () => {
                console.log('pause');
            }
        }
    }
/>

componentDidMount() {
    ...
    const {eventOn} = this.props;
    // 监听事件
    Object.keys(eventOn).forEach((item) => {
        this.video.on(item, () => {
            eventOn[item]
        });
    })
}
```


#### 5-4.在父元素操控播放器组件
```
<div>
    <SPlayer
        ...
        ref={player => this.SPlayer = player}    
    />
    <button onClick={this.videoPlay}>播放</button>
    <button onClick={this.videoPause}>暂停</button>
</div>

ref: 表示获取到了SPlayer组件的DOM


this.videoPlay = () => {
    this.SPlayer.video.play();
};

this.videoPause = () => {
    this.SPlayer.video.pause();
};

```


## 
