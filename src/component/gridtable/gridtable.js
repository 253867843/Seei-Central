import React from 'react';
import { withRouter } from 'react-router-dom';

// antd
import { Table, Icon } from 'antd';

// styled-components
import {
  GridTableLayout,
  GridPosition,
  TableBg,
} from './style';

// css
import './style.css';

// immutable
import Immutable from 'immutable';
import isEmpty from 'lodash/isEmpty';

@withRouter
class GridTable extends React.Component {
  state = {
    rowId: '', // 表示当前选中的行id
  };

  render() {
    const groupColumns = [
      {
        title: '',
        dataIndex: 'icon',
        key: 'icon',
        render: () => <Icon type='hdd' />
      },
      {
        title: '域名',
        dataIndex: 'domain',
        key: 'domain'
      },
      {
        title: '匹配状态',
        dataIndex: 'state',
        key: 'state'
      },
      {
        title: '类型',
        dataIndex: 'dtype',
        key: 'dtype',
        render: (text, record) => record.recvServicePort ? <span>编码器</span> : <span>S4000</span>
      },
      {
        title: '端口',
        dataIndex: 'port',
        key: 'port',
      }
    ];
    return (
      <GridTableLayout>
        <GridPosition>
          <TableBg>
            <Table
              id='deviceTable'
              dataSource={this.props.unitList}
              columns={groupColumns}
              pagination={false}
              rowKey={record => record.id}
              rowClassName={this.setTableRowClassName}
              onRow={this.onClickTableRow}
            />
          </TableBg>
        </GridPosition>
      </GridTableLayout>
    )
  }

  // 选中行样式
  setTableRowClassName = (record) => {
    return record.id === this.state.rowId ? 'clickRowStyle' : '';
  };

  // 选中行数据
  onClickTableRow = (record) => {
    return {
      onClick: (event) => {
        this.setState({ rowId: record.id }); // 只影响css样式
        this.props.onClick(record);
      }
    }
  };

  // 加载默认项, 选中table的第一个成员
  loadDefaultTableItem = (unitList) => {
    const firstItem = unitList[0];
    this.setState({
      rowId: firstItem.id,
    }, () => {
      // this.onClickTableRow(firstItem); // 选中行数据
      this.setTableRowClassName(firstItem); // 设置css样式
      this.props.onClick(firstItem); // 执行点击第一项
    });
  };

  // 首次加载, 默认选中table的第一个成员
  componentDidMount() {
    const unitList = this.props.unitList;
    if (unitList.length !== 0) {
      this.loadDefaultTableItem(unitList);
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    const currentList = Immutable.fromJS(this.props.unitList);
    const nextList = Immutable.fromJS(nextProps.unitList);
    if (Immutable.is(currentList, nextList)) { // 是否执行componentDidUpdate条件
      return false;
    }
    return true;
  }

  // 更新时, 判断rowId是否存在unitList
  // 存在: 不做任何操作, 加载rowId对应的成员
  // 不存在: 默认加载unitList的第一个成员
  componentDidUpdate(prevProps, prevState, snapshot) {
    const unitList = this.props.unitList;
    if (unitList.length !== 0) {
      const rowId = this.state.rowId;
      if (isEmpty(rowId)) {
        // 不存在: 默认加载unitList的第一个成员
        this.loadDefaultTableItem(unitList);
      } else {
        // 存在: 加载rowId对应的成员
        const index = unitList.findIndex((item) => item.id === rowId);
        if (index > -1) {
          // 表示找到
          const item = unitList[index];
          // 选中rowId对应的行
          this.props.onClick(item);
        }
        else {
          // 没有找到
        }
      }
    }
  }

  componentWillUnmount() {
  }
}

export default GridTable;