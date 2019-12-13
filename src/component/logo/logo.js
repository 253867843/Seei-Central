import React from 'react';
import {LogoHeader} from './style.js';

class Logo extends React.Component {
  render() {
    return (
      <LogoHeader
        pic={require(`../../images/logo.png`)}
      />
    )
  }
}

export default Logo;