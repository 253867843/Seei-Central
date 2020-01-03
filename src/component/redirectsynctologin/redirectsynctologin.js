import React, { Component } from 'react';

import ReactLoading from 'react-loading';

import {
    LoadingWrapper,
    Article,
} from './style';

export default class RedirectSyncToLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'spinningBubbles',
            color: '#fff'
        };
    }
    render() {
        return (
            <LoadingWrapper>

                <Article>
                    <ReactLoading type={this.state.type} color={this.state.color}></ReactLoading>
                    <h4> Loading...正在跳转到登录界面 </h4>
                </Article>

            </LoadingWrapper>
        )
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.history.replace('/');
        }, 3000);
    }
}
