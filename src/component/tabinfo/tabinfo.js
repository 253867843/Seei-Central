import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// action creators
import { actions as wstreamActions, getWowzaStreamInfoByGroup } from '../../redux/wstream.redux';
import { getIsFetching } from '../../redux/app.redux';

// styled-components
import {
    ListGroupItem,
    FormRow,
} from './style.js';

// antd
import { Row, Col } from 'antd';
import { bindActionCreators } from 'redux';
import { ThirdDashBoardLayout } from '../unit/style';

export class TabInfo extends Component {
    static propTypes = {

    }

    constructor(props) {
        super(props);
        this.state = {
            group_id: 'sd0abd9249451d0fdbf0e1406f5d9e6a',
            group: 'group_test1',
            recvStreamServices_id: 'b0abd9249451d0fdbf0e1406f5d9e31'
        };
    }

    render() {
        const groupItemList = [
            { labelName: '累计视频流传入多少字节', unit: '字节' },
            { labelName: '频流传入速率', unit: '字节/秒' },
            { labelName: '播放连接数' },
            { labelName: '累计视频流传出多少字节', unit: '字节' },
            { labelName: '视频流传出速率', unit: '字节/秒' }
        ];
        return (
            <Fragment>
                {
                    groupItemList.map((v) => (
                        <ListGroupItem key={v.labelName}>
                            <FormRow>
                                <Row className='row-setting'>
                                    <Col span={14}>{v.labelName}</Col>
                                    <Col span={10}>数据内容 {v.unit}</Col>
                                </Row>
                            </FormRow>
                        </ListGroupItem>
                    ))
                }
            </Fragment>
        )
    }

    // 开始轮询
    startPoll = () => {
        console.log('[startPoll]', this.state);
        const { group, group_id, recvStreamServices_id } = this.state;
        this.timeout = setTimeout(this.props.fetchWowzaInfo({ group, group_id, recvStreamServices_id }), 10000);
    };

    componentWillReceiveProps(nextProps) {
        console.log('[tabinfo this.props]', this.props.streamData);
        if (this.props.streamData !== nextProps.data) {
            clearTimeout(this.timeout);

            // 你可以在这里处理获取到的数据
            console.log('[tabinfo this.props]', nextProps.streamData);

            if (!nextProps.isFetching) {
                this.startPoll();
            }
        }
    }

    componentWillMount() {
        console.log('[componentWillMount]', this.state);
        const { group, group_id, recvStreamServices_id } = this.state;
        this.props.fetchWowzaInfo({ group, group_id, recvStreamServices_id });
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }
}

const mapStateToProps = (state, props) => {
    return {
        streamData: getWowzaStreamInfoByGroup(state, 'sd0abd9249451d0fdbf0e1406f5d9e6a'),
        isFetching: getIsFetching(state),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        ...bindActionCreators(wstreamActions, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabInfo);

/**
 * 获取接收wowza服务器流信息
 * 接收3个参数:
 * 1.group_id
 * 2.group
 * 3.recvStreamServices_id: #接收端wowza服务id
*/


/**
 * 1.doclever制作接口模拟数据 --- 完成
 * 2.在TabInfo组件实现定时器, 轮询接口, 间隔10s
 * 3.获取数据
 * 4.使用reselect监听数据变化
 * 5.组件拿到数据, 更新界面
*/