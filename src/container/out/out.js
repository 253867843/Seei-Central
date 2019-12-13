import React from "react";
import {connect} from 'react-redux';
import PropTypes from "prop-types";
import {bindActionCreators} from "redux";
import {actions as rcformActions, getEmail} from "../../redux/rcform.redux";

class Out extends React.Component {
  static propTypes = {
    email: PropTypes.object,
    dispatch: PropTypes.func
  };

  setEmail = () => {
    this.props.setEmail({
      email: {
        value: 'chaojundu@diadem-tech.cn' // 点击设置固定值
      }
    });
  };

  render() {
    const {email} = this.props;
    return (
      <div style={{border: '1px solid green', padding: 10}}>
        <div>
          email: {email && email.value}
          {/*文本: {如果email存在 ? 展示email.value值}*/}
        </div>
        <button onClick={this.setEmail}>set</button>
      </div>
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    email: getEmail(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(rcformActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Out);

/**
 * 输出组件:
 * 1.从rcform.redux中获取email字段, 展示
 * 2.从rcform.redux中获取setEmail()方法, 设置固定值(固定值>>>redux>>>out)
 * */