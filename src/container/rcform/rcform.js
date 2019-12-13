import React from 'react';
import NewForm from '../newForm/newForm';
import Out from '../out/out';

class RcForm extends React.Component {
  render() {
    return (
      <div>
        <h2>integrate with redux</h2>
        <NewForm/>
        <Out/>
      </div>
    )
  }
}

export default RcForm;

/**
 * 集成到redux
 * 1.setEmail参数格式: {email: {value: 'chaojundu@diadem-tech.cn'}}
 *
 * 项目文件:
 * 1.form
 * 2.out
 * 3.newForm
 * */