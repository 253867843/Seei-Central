import React from 'react';

// Theme context, 默认的 theme 是 'light' 值
const ThemeContext = React.createContext('light');

// 用户登录 context,
const UserContext = React.createContext({
  name: 'Guest'
});

class MultipleConsumerApp extends React.Component {
  render() {
    // const {signInUser, theme} = this.props;
    // console.log('[this.props]', signInUser, theme);
    const signInUser = 'dcj123';
    const theme = 'dark';

    // 提供初始 context 值的 App组件
    return (
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={signInUser}>
          <Layout/>
        </UserContext.Provider>
      </ThemeContext.Provider>
    )
  }
}

function Layout() {
  return (
    <div>
      <Sidebar/>
      <Content/>
    </div>
  )
}

function Sidebar() {
  return (
    <div>这是Sidebar侧边栏</div>
  )
}

// 一个组件可能消费多个 context
function Content() {
  return (
    <ThemeContext.Consumer>
      {
        theme => (
          <UserContext.Consumer>
            {
              user => (
                <ProfilePage theme={theme} user={user}/>
              )
            }
          </UserContext.Consumer>
        )
      }
    </ThemeContext.Consumer>
  )
}

function ProfilePage({theme, user}) {
  return (
    <div>ProfilePage - {theme} - {user}</div>
  )
}

/**
 * 如果两个或者更多的 context 值经常被一起使用，那你可能要考虑一下另外创建你自己的渲染组件，以提供这些值。
 * */

export default MultipleConsumerApp;