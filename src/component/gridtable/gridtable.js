import React from 'react';
import {withRouter} from 'react-router-dom';

// antd
import {Table, Icon, Input} from 'antd';

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

@withRouter
class GridTable extends React.Component {
  state = {
    rowId: '', // 表示当前选中的行id
    num: 0
  };

  render() {
    // console.log('[GridTable]');
    const groupColumns = [
      {
        title: '',
        dataIndex: 'icon',
        key: 'icon',
        render: () => <Icon type='hdd'/>
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
        render: (text, record) => record.recvServicePort ? <span>编码器</span> : <span>wowza</span>
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
              ref={(table) => this.tableInstance = table}
            />
          </TableBg>
        </GridPosition>
      </GridTableLayout>
    )
  }


  setTableRowClassName = (record) => {
    return record.id === this.state.rowId ? 'clickRowStyle' : '';
  };

  onClickTableRow = (record) => {
    return {
      onClick: (event) => {
        this.setState({rowId: record.id}); // 只影响css样式
        this.props.onClick(record);
      }
    }
  };

  componentDidMount() {
    // console.log('[componentDidMount]', this.props.unitList);
    if (this.props.unitList.length !== 0) {
      this.setState({
        rowId: this.props.unitList[0].id
      }, () => {
        this.onClickTableRow(this.props.unitList[0]);
        this.setTableRowClassName(this.props.unitList[0]);
        this.props.onClick(this.props.unitList[0]);
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // console.log('[shouldComponentUpdate]');
    const currentList = Immutable.fromJS(this.props.unitList);
    const nextList = Immutable.fromJS(nextProps.unitList);
    // console.log('[gridTable shouldComponentUpdate]', Immutable.is(currentList, nextList));
    if (Immutable.is(currentList, nextList)) { // 是否执行componentDidUpdate条件
      return false;
    }
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log('[componentDidUpdate]', this.props.unitList);
    if (this.props.unitList.length !== 0) {
      this.setState({
        rowId: this.props.unitList[0].id,
      }, () => {
        this.onClickTableRow(this.props.unitList[0]); //
        this.setTableRowClassName(this.props.unitList[0]); // 设置css样式
        this.props.onClick(this.props.unitList[0]); // 执行点击第一项
      });
    }
  }
}

export default GridTable;