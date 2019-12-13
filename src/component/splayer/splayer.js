import React from 'react';
import PropTypes from 'prop-types';
import videojs from 'video.js';
import '../../../node_modules/video.js/dist/video-js.css'; // 导入后, 可设置width和height等属性; 不导入, 有测试界面

class SPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
  }

  static propTypes = {
    url: PropTypes.string.isRequired,
    eventOn: PropTypes.object.isRequired,
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    posters: PropTypes.string.isRequired
  };

  render() {
    return (
      <div>
        <video
          className='video-js'
          data-setup='{}'
          poster={this.props.posters}
          ref={this.player}
          autoPlay
          controls
        />
      </div>
    )
  }

  componentDidMount() {
    const {eventOn} = this.props;
    const videoNode = this.player.current;

    this.video = videojs(videoNode, {
      sources: [{
        src: this.props.url,
      }],
      width: this.props.width,
      height: this.props.height,
    });

    // 事件监听
    Object.keys(eventOn).forEach((item) => {
      this.video.on(item, () => {
        eventOn[item]();
      })
    });
  }

  componentWillUnmount() {
    if (this.video) {
      this.video.dispose();
    }
  }
}

export default SPlayer;

// 参数默认值
SPlayer.defaultProps = {
  // url: 'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
  url: '',
  width: '340px',
  height: '250px',
};

/**
 * 对video.js封装
 * 1.videojs(参数1, 参数2)
 * 参数1: 应该是一个dom节点, 通过React的ref来获取
 * 参数2: 设置播放器的参数配置
 *
 * 2.在componentWillUnmount(){}是销毁this.video
 *
 * 3.定义接口 --- 让<SPlayer/>可传入属性与参数
 * (1)传入属性值: eg: url
 * (2)事件监听:
 * videojs.on('事件名称', function(){...});
 * (3)事件监听应该从父元素传入
 *
 * 4.在父元素中操控播放器: 播放/停止按钮
 *
 * 5.videojs有picture-in-picture的小窗口播放的功能, 后续根据滚动的距离来判断是否开启小窗口播放的功能.
 *
 * 6.播放器参数设置: https://segmentfault.com/a/1190000018914486
 *
 * 7.将videojs, 以及在react中使用videojs总结到github中去
 *
 * 8.一款基于react的videojs插件: video-react
 *
 * 9.videojs的宽度/高度设置不起作用 --- 原因: 没有导入css文件
 *
 * 10.
 * */