import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {actions as uiActions, getDeviceStatus, getDeviceType} from '../../redux/ui.redux';

// styled-component
import {
  SideBar,
  FilterSideBar,
  FilterTitle,
  UnitFilterPin,
  FilterSubTab,
  FilterFieldSet,
  FilterColFormLabel,
  FilterLabel,
  FilterSubTitle,
  ResetButton,
  CustomControlsStacked,
  Main
} from './style';

// antd
import {Icon, Button, Form, Checkbox, Row, Col} from 'antd';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1113810_o3p2w2mc6i.js'
});

class ContentSideBar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapse: false
    };

    this.filterStateList = [
      {text: '传送中', value: 'transmission', color: 'red', type: 'icondian1'},
      {text: '在线', value: 'online', color: 'green', type: 'icondian1'},
      {text: '离线', value: 'offline', color: 'white', type: 'icondian1'}
    ];
    this.filterTypeList = [
      {text: '编码器设备', value: 'encode', color: 'white', type: 'icondiannao'},
      {text: '接收端wowza', value: 'wowza', color: 'white', type: 'iconshebei'}
    ];
  }

  render() {
    const {deviceStatus, deviceType} = this.props;
    const deviceStatusRaw = deviceStatus.toJS();
    const deviceTypeRaw = deviceType.toJS();
    const checkBoxFilterList = [
      {
        title: '状态',
        resetText: '重置',
        fieldName: 'checkbox-group-status',
        filterList: this.filterStateList, // 样式
        checkBoxList: {value: deviceStatusRaw}, // 从redux加载状态
        handleFormChange: (v) => {
          this.handleFormChange(v);
        },
        resetFunc: () => {
          this.props.clearDeviceStatus();
        }
      },
      {
        title: '种类',
        resetText: '重置',
        fieldName: 'checkbox-group-type',
        filterList: this.filterTypeList,
        checkBoxList: {value: deviceTypeRaw},
        handleFormChange: (v) => {
          this.handleFormChange(v);
        },
        resetFunc: () => {
          this.props.clearDeviceType();
        }
      }
    ];

    return (
      <div>
        <SideBar className={this.state.collapse ? 'content-sidebar-small' : 'content-sidebar-large'}>

          <FilterSideBar>
            <FilterTitle>

              <Icon
                type='filter'
                className={this.state.collapse ? 'filter-icon-small' : 'filter-icon-large'}
                onClick={this.toggleSideBar}
              />

              <span className={this.state.collapse ? 'hidden-span' : ''}>过滤</span>

              <UnitFilterPin className={this.state.collapse ? 'hidden-btn' : ''}>
                <Button size='large' onClick={this.toggleSideBar}>
                  <Icon type="pushpin" style={{fontSize: 20}}/>
                </Button>
              </UnitFilterPin>

            </FilterTitle>

            {/*过滤内容*/}
            <FilterSubTab className={this.state.collapse ? '' : 'expanded'}>

              {
                checkBoxFilterList.map((v) => (
                  <FilterFieldSet key={v.title} className={this.state.collapse ? '' : 'pl-16'}>
                    <FilterColFormLabel>
                      <FilterLabel>
                        <FilterSubTitle
                          className={this.state.collapse ? 'sub-title-collapsed' : ''}>{v.title}</FilterSubTitle>
                        <ResetButton className={this.state.collapse ? 'hidden-reset-btn' : 'reset'}
                                     onClick={v.resetFunc}>{v.resetText}</ResetButton>
                      </FilterLabel>
                    </FilterColFormLabel>

                    {/*checkbox*/}
                    <div style={{marginTop: 25}}>
                      <CustomControlsStacked>

                        <CustomCheckGroupForm
                          fieldName={v.fieldName}
                          filterList={v.filterList || []}
                          onChange={v.handleFormChange}
                          collapse={this.state.collapse}
                          checkBoxList={v.checkBoxList}
                        />

                      </CustomControlsStacked>
                    </div>

                  </FilterFieldSet>
                ))
              }

            </FilterSubTab>
          </FilterSideBar>

        </SideBar>

        {/*测试*/}
        <Main className='content-large'/>
      </div>
    )
  }

  toggleSideBar = () => {
    this.setState((prevState) => ({
      collapse: !prevState.collapse
    }));
  };

  // 更新checkbox状态到redux
  handleFormChange = (item) => {
    const type = Object.keys(item)[0];
    if (type === 'checkbox-group-status') {
      this.props.setDeviceStatus(item[type].value);
    }

    if (type === 'checkbox-group-type') {
      this.props.setDeviceType(item[type].value);
    }
  };
}

const CustomCheckGroupForm = Form.create({
  name: 'custom_check_group_form',
  onFieldsChange(props, changedFields) {
    // 响应
    props.onChange(changedFields);
  },
  mapPropsToFields(props) {
    // 初始状态
    return {
      [props.fieldName]: Form.createFormField({
        ...props.checkBoxList,
        value: props.checkBoxList.value
      })
    }
  },
  onValuesChange(_, values) {
    // console.log(values);
  }
})(
  (props) => {
    const {getFieldDecorator} = props.form;
    const {collapse, filterList, fieldName} = props;
    return (
      <Form>
        <Form.Item label=''>
          {
            getFieldDecorator(fieldName)(
              <Checkbox.Group style={{width: '100%'}}>
                <Row>
                  {
                    filterList.map((v) => (
                      <Col key={v.value} span={24} style={{height: 54}}>
                        <Checkbox value={v.value} style={{color: '#fff'}}>

                          <IconFont type={v.type}
                                    className={`${collapse ? 'ifClass ifMarginL200' : 'ifClass'}`}
                                    style={{color: v.color}}/>

                          <span
                            className={collapse ? 'hidden-checkbox-text' : ''}
                          >
                            {v.text}
                          </span>

                        </Checkbox>
                      </Col>
                    ))
                  }
                </Row>
              </Checkbox.Group>
            )
          }
        </Form.Item>
      </Form>
    )
  }
);

const mapStateToProps = (state) => {
  return {
    deviceStatus: getDeviceStatus(state),
    deviceType: getDeviceType(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators(uiActions, dispatch)
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentSideBar);

/**
 * 1.先写常态的sidebar
 * 2.添加Form表单和输入框, 隐藏和显示
 * 3.获取checkbox的数据
 * 4.更新checkbox数据到redux
 * 5.重置数据
 * 6.合并
 * 7.添加到内容页面(未实现)
 * 8.根据ui.redux的过滤字段, 过滤在table上的显示内容
 * */