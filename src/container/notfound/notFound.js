import React from 'react';
import {Result, Button} from 'antd';
// import PropTypes from 'prop-types';

class NotFound extends React.Component {
  // static propTypes = {
  //   onClick: PropTypes.func.isRequired
  // };

  render() {
    return (
      <Result
        status="warning"
        title="There are some problems with your operation."
        extra={
          <Button type="primary" key="console" onClick={this.handleClick}>
            Back Home
          </Button>
        }
      />
    )
  }

  handleClick = () => {
    this.props.history.push('/home');
  };
}

export default NotFound;