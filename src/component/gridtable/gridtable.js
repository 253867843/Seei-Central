import React from 'react';
import {withRouter} from 'react-router-dom';

// antd
import {Table, Icon} from 'antd';

// styled-components
import {
  GridTableLayout,
  GridPosition,
  TableBg,
} from './style';

@withRouter
class GridTable extends React.Component {
  render() {
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
        key: 'port'
      }
    ];
    return (
      <GridTableLayout>
        <GridPosition>
          <TableBg>
            <Table
              dataSource={this.props.unitList}
              columns={groupColumns}
              pagination={false}
              onRow={record => {
                return {
                  onClick: (event) => {
                    // console.log('[event]', record);
                    // this.props.history.push(`/device/${record.id}`);
                    this.props.onClick(record);
                  }
                }
              }}
            />
          </TableBg>
        </GridPosition>
      </GridTableLayout>
    )
  }
}

export default GridTable;

/**
 * 四级路由
 * */