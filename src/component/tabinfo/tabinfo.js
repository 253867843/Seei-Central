/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Immutable from 'immutable';

// action creators
import { actions as wstreamActions, getWowzaInfoById } from '../../redux/wstream.redux';
import { getIsFetching } from '../../redux/app.redux';
import { getStreamStatus } from '../../redux/ui.redux';

// styled-components
import {
    ListGroupItem,
    FormRow,
} from './style.js';

// antd
import { Row, Col } from 'antd';
import { bindActionCreators } from 'redux';

// reselect
import makeStreamList from '../../selectors/streamselector';
import makeSingleGroup from '../../selectors/groupsingleselector';

class TabInfo extends Component {
    static propTypes = {
        group: PropTypes.string.isRequired,
        group_id: PropTypes.string.isRequired,
        recvStreamServices_id: PropTypes.string.isRequired
    }

    render() {
        const { bytesIn, bytesInRate, totalConnections, bytesOut, bytesOutRate } = this.props.streamData;
        // const streamStatus = this.props.streamStatus;
        const streamStatus = this.props.singleGroup.status;
        const groupItemList = [
            { labelName: '累计视频流传入多少字节', unit: '字节', info: bytesIn },
            { labelName: '频流传入速率', unit: '字节/秒', info: bytesInRate },
            { labelName: '播放连接数', info: totalConnections },
            { labelName: '累计视频流传出多少字节', unit: '字节', info: bytesOut },
            { labelName: '视频流传出速率', unit: '字节/秒', info: bytesOutRate }
        ];

        return (
            <Fragment>
                {
                    groupItemList.map((v) => (
                        <ListGroupItem key={v.labelName}>
                            <FormRow>
                                <Row className='row-setting'>
                                    <Col span={14}>{v.labelName}</Col>
                                    <Col span={10}>{(v.info && streamStatus) ? v.info : 0} {v.unit}</Col>
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
        console.log('[开始轮询 流信息]');
        const { group, group_id, recvStreamServices_id } = this.props;
        this.timeout = setTimeout(() => {
            this.props.fetchWowzaInfo({ group, group_id, recvStreamServices_id });
        }, 10000);
    };

    componentWillReceiveProps(nextProps) {
        if (!Immutable.is(this.props.streamData, nextProps.streamData)) {
            clearTimeout(this.timeout);

            // 你可以在这里处理获取到的数据
            // console.log('[你可以在这里处理获取到的数据]', nextProps.streamData);
            this.setState({
                streamData: nextProps.streamData
            });

            const streamStatus = nextProps.singleGroup.status;
            if (!nextProps.isFetching && streamStatus) {
                this.startPoll();
            }
        }
    }

    componentWillMount() {
        const { group, group_id, recvStreamServices_id, singleGroup } = this.props;
        const streamStatus = singleGroup.status;
        if (streamStatus) {
            this.props.fetchWowzaInfo({ group, group_id, recvStreamServices_id });
        }
    }

    componentWillUnmount() {
        console.log('[结束轮询 流信息]');
        clearTimeout(this.timeout);
    }
}

const mapStateToProps = (state, props) => {
    // console.log('[tabinfo props]', props);
    const getStreamList = makeStreamList();
    const getSingleGroup = makeSingleGroup();
    return {
        streamData: getStreamList(state, props), // wowza数据流
        isFetching: getIsFetching(state), // 当前轮询状态(是否在轮询)
        // streamStatus: getStreamStatus(state), // 当前推流状态(是否正在推流)
        singleGroup: getSingleGroup(state, props), // 当前组信息
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
 * 2.在TabInfo组件实现定时器, 轮询接口, 间隔10s --- 完成
 * 3.获取数据 --- 完成
 * 4.组件拿到数据, 更新界面 --- 完成
 * 5.使用reselect监听数据变化 --- 完成
 * 6.传入参数, 参数验证 --- 完成
 * 7.置标志位, 只有当开始推流时, 才发送推流请求 --- 完成
 *
 * 1.新增, 开始推流, 获取推流数据
 * 2.
*/