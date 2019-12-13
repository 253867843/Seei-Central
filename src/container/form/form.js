import React from "react";
import {formShape} from "rc-form";

class Form extends React.Component {
  static propTypes = {
    form: formShape,
  };

  render() {
    const {getFieldProps, getFieldError} = this.props.form;
    const errors = getFieldError('email');
    return (
      <div style={{border: '1px solid red', padding: 10}}>
        <div>email:</div>
        <div>
          <input {...getFieldProps('email', {
            rules: [{type: 'email'}]
          })}/>
        </div>
        <div>
          {(errors) ? errors.join(',') : null}
        </div>
      </div>
    )
  }
}

export default Form;


/**
 * 使用rc-form, 创建原生Form(类似antd的Form)
 * 1.Form具有email类型校验功能
 * */