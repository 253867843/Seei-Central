import React from 'react';
import SPlayer from '../splayer/splayer';

// import {Button} from 'antd';

class SPlayerContainer extends React.Component {
  render() {
    return (
      <div>
        <SPlayer
          url='http://dnionhls.seei.tv/vod/0cf0c0a2fd074164d1accafb5db2fde1.mp4/index.m3u8'
          eventOn={ // 事件监听
            {
              play: () => {
                console.log('播放');
              },
              pause: () => {
                console.log('暂停');
              }
            }
          }
          ref={(player) => this.SPlayer = player}
          posters='../../images/poster.png'
        />
        {/*<Button onClick={this.videoPlay} type='primary'>播放</Button>*/}
        {/*<Button onClick={this.videoPause}>暂停</Button>*/}
      </div>
    )
  }

  componentDidMount() {
    // this.videoPlay();
  }

  videoPlay = () => {
    this.SPlayer.video.play();
  };

  videoPause = () => {
    this.SPlayer.video.pause();
  };
}

export default SPlayerContainer;