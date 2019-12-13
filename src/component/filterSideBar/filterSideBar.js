import React from 'react';
import {Icon, PageHeader, Form, Checkbox, Row, Col} from 'antd';
import {FilterLayout, FilterExpandLayout, FilterTitle, FilterLabel} from './style';

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1113810_o3p2w2mc6i.js'
});

class FilterSideBar extends React.Component {
  render() {
    const {
      rawDeviceStatus,
      rawDeviceType,
      onSetDeviceStatus,
      onSetDeviceType,
      onClearDeviceStatus,
      onClearDeviceType
    } = this.props;
    const filterStateList = [
      {text: '传送中', value: 'transmission', color: 'red', type: 'icondian1'},
      {text: '在线', value: 'online', color: 'green', type: 'icondian1'},
      {text: '离线', value: 'offline', color: 'white', type: 'icondian1'}
    ];
    const filterTypeList = [
      {text: '编码器设备', value: 'encode', color: 'white', type: 'icondiannao'},
      {text: '接收端wowza', value: 'wowza', color: 'white', type: 'iconshebei'}
    ];
    // const rawDeviceStatus = deviceStatus.toJS();
    // const rawDeviceType = deviceType.toJS();
    return (
      <FilterLayout>
        {/*标题*/}
        <PageHeader title={
          <div style={{
            width: 220,
            height: 42,
            color: '#fff',
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '42px',
          }}>
            <Icon type='filter'/>
            <span style={{marginLeft: 10}}>过滤</span>
          </div>
        } style={{background: '#161b21'}}/>
        {/*过滤表单*/}
        <FilterExpandLayout>
          {/*状态过滤*/}
          <FilterCheckBoxForm
            name='状态'
            filterList={filterStateList}
            defaultChecked={rawDeviceStatus}
            handleChecked={onSetDeviceStatus}
            clearFields={onClearDeviceStatus}
          />
          {/*种类过滤*/}
          <FilterCheckBoxForm
            name='种类'
            filterList={filterTypeList}
            defaultChecked={rawDeviceType}
            handleChecked={onSetDeviceType}
            clearFields={onClearDeviceType}
          />
        </FilterExpandLayout>
      </FilterLayout>
    )
  }
}

// 匿名checkBox组件
const FilterCheckBoxForm = Form.create({name: 'filter_check_box_form'})(
  class extends React.Component {
    render() {
      const {getFieldDecorator} = this.props.form;
      const {defaultChecked} = this.props;
      // console.log('[defaultChecked]', defaultChecked);
      const onChange = (e) => { // ['transmission','online','offline'] / ['encode', 'wowza']
        // console.log('checked = ', e);
        this.props.handleChecked(e);
      };
      // 重置
      const resetFilterState = () => {
        // FilterCheckBoxForm
        this.props.clearFields();
        // 使用 setFieldsValue 来动态设置其他控件的值。
        this.props.form.setFieldsValue({
          'checkbox-group': []
        });
      };
      return (
        <Form
          layout='inline'
          style={{padding: '16px 0 0 16px'}}
        >
          <FilterTitle>
            <FilterLabel>
              {this.props.name}
              <span onClick={resetFilterState}>重置</span>
            </FilterLabel>
          </FilterTitle>

          <Form.Item label=''>
            {
              getFieldDecorator('checkbox-group', {
                initialValue: defaultChecked || []
              })(
                <Checkbox.Group
                  style={{width: '100%'}}
                  onChange={onChange}
                >
                  <Row>
                    {
                      this.props.filterList.map((item) => (
                        <Col span={24} style={{height: 54}} key={item.text}>
                          <Checkbox value={item.value}
                                    style={{height: 23, color: '#fff', fontSize: '14px'}}
                          >
                            <IconFont type={item.type}
                                      style={{color: item.color, paddingLeft: 2, fontSize: 13}}/>
                            <span style={{paddingLeft: 10}}>{item.text}</span>
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
  }
);

export default FilterSideBar;

/**
 * groupCard左侧, checkbox过滤部分
 * */