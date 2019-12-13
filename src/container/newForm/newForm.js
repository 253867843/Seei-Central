import React from 'react';
import {bindActionCreators} from "redux";
import {connect} from 'react-redux';
import {actions as rcformActions, getEmail} from "../../redux/rcform.redux";
import {createForm, createFormField} from 'rc-form';
import Form from '../form/form';

const NewFormWrapped = createForm({
  mapPropsToFields(props) {
    // console.log('[mapPropsToFields props]', props);
    // 注意props.formState.email >>> 输出Immutable.Map({}) >>> toJS(), 转成普通JS对象
    return {email: createFormField(props.formState.email.toJS())} // 注意：mapPropsToFields 里面返回的表单域数据必须使用 Form.createFormField 包装。
  },
  onFieldsChange(props, fields) {
    console.log('[onFieldsChange fields]', fields);
    // 发布更新
    props.setEmail(fields);
  }
})(Form);

const mapStateToProps = (state, props) => {
  return {
    formState: {email: getEmail(state)} // 展示的数据
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(rcformActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NewFormWrapped);

/**
 * 同步, 2个方面:
 * 1.从redux中同步数据
 * 2.数据更新同步到redux
 *
 * setEmail()格式: {email: {value: 'chaojundu@diadem-tech.cn'}}
 * */

// const NewForm = connect(
//
// *** mapStateToProps
// (state) => {
//   return {
//     formState: {
//       email: state.form.email,
//     },
//   };
// })
//
// *** WrappedComponent 组件
// (createForm
//
//  ({
//    mapPropsToFields(props) {
//       console.log('mapPropsToFields', props);
//      return {
//         email: createFormField(props.formState.email),
//       };
//     },
//    onFieldsChange(props, fields) {
//       console.log('onFieldsChange', fields);
//       props.dispatch({
//        type: 'save_fields',
//        payload: fields,
//      });
//    },
//  })
//  ***
//  (Form)
// );

// NewForm = connect(...)(...) 相当于:
// connect(mapStateToProps, mapDispatchToProps)(WrapperComponent组件);
//
// createForm 相当于 WrapperComponent组件
// import {Form} from 'antd';
// const WrappedComponent = Form.create({name: ''})(匿名组件);
// 匿名组件, 作用: 一般检查字段的验证规则和错误信息展示

// 相当于当前的Form组件(使用rc-form封装的Form组件)
// mapPropsToFields:
// 1.将props中的值value转到field中
// 2.用于redux存储/读取字段
// 参考: Antd/Form/表单数据存储于上层组件/mapPropsToFields

// onFieldsChange:
// 1.字段更改时调用
// 2.可将字段dispatch到redux, 更新字段
// 参考: Antd/Form/表单数据存储于上层组件/onFieldsChange