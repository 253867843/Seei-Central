import React from 'react';
import {ThemeContext, themes} from './theme-context';
import ThemedButton from './themed-button';

function ToolBar(props) {
  return (
    <ThemedButton onClick={props.changeTheme}>
      Change Theme
    </ThemedButton>
  )
}

class DynamicApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: themes.light
    };

    this.toggleTheme = () => {
      this.setState((prevState) => ({
        theme: (prevState.theme === themes.dark ? themes.light : themes.dark)
      }));
    };
  }

  render() {
    return (
      <div>
        <div>
          {/*使用ThemeProvider的value值, 也就是组件中state.theme值*/}
          <ThemeContext.Provider value={this.state.theme}>
            <ToolBar changeTheme={this.toggleTheme}/>
          </ThemeContext.Provider>
        </div>
        <div>
          {/*使用ThemeContext中的theme值*/}
          <ThemedButton/>
        </div>
      </div>
    )
  }
}

export default DynamicApp;

/**
 * 动态Context
 * */