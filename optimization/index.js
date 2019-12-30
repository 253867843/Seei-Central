import React, { Component } from 'react'

class App extends Component {
    constructor(props) {
        super(props);

        // 优化方式2
        this.state = {
            name: { react: 'redux' }
        }

        // 优化方式3
        this.name = { react: 'redux' };
    }
    render() {
        // 优化方式1
        const name = { react: 'redux' };
        return (
            <div>
                <p>优化前</p>
                <p>每次都生成新的对象传递, 这么写不好</p>
                <p>特别是style的写法, 我的代码中有好多, 优化</p>
                <Demo style={{ color: 'red' }} name={{ react: 'redux' }}></Demo>
                <p>优化后</p>
                <Demo style={{ color: 'red' }} name={name}></Demo>
                <Demo style={{ color: 'red' }} name={this.name}></Demo>
                <Demo style={{ color: 'red' }} name={this.state.name}></Demo>
            </div>
        )
    }
}

class Demo extends Component {
    render() {
        return (
            <div>

            </div>
        )
    }
}

/**
 * 1.React组件性能优化
 *  (1)<Demo style={{ color: 'red' }} name={{ react: 'redux' }}></Demo>
 *  (2)不要传递额外的数据给子组件
 *  (3)如果你的组件只是根据传进来的值进行渲染, 没有内部状态, 那么可以使用PureComponent来提升性能
 *  (4)手动测试, 浏览器性能, Performance/User Timing
 *  (5)为什么需要ImmutableJS
 * 2.Redux性能优化
 * 3.React同构 >>> 在Server端生成DOM结构
 *        同构 >>> 首屏采用服务端渲染出来的DOM
 *
*/