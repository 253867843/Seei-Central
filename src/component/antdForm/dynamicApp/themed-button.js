import React from 'react';
import {ThemeContext} from './theme-context';

/**
 * 使用Context
 * */

class ThemedButton extends React.Component {
  render() {
    let props = this.props;
    let theme = this.context;
    console.log('[ThemedButton]', theme);
    return (
      <button
        {...props}
        style={{backgroundColor: theme.background}}
      >
        ThemedButton
      </button>
    )
  }
}

ThemedButton.contextType = ThemeContext; // 可以使用this.context了

export default ThemedButton;