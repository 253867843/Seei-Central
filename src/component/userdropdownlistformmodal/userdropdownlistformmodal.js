import React, { Component } from 'react';
import PropTypes from 'prop-types';

// antd
import {
    Form,
    Button,
    Modal
} from 'antd';

// lodash
import _ from 'lodash';

export default class UserDropDownListFormModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    static propTypes = {
        dropDownMenuListItem: PropTypes.object.isRequired,
        modalName: PropTypes.string.isRequired,
        username: PropTypes.string
    };

    render() {
        return (
            <UserDropDownListForm
                wrappedComponentRef={this.saveCreateFormRef}
                visible={this.state.visible}
                modalName={this.props.modalName}
                username={this.props.username}
                dropDownMenuListItem={this.props.dropDownMenuListItem}
                onOk={this.handleCancel}
                onCreate={this.handleCreate}
                onCancel={this.handleCancel}
            />
        )
    }

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCreate = () => {
        return (resEvent) => {
            const { form } = this.createFormRef.props;
            form.validateFields((err, values) => {
                if (err) {
                    return;
                }

                // 清空表单
                form.resetFields();

                // 隐藏Modal
                this.setState({
                    visible: false
                });

                console.log('[UserDropDownListFormModal values]', values);

                console.log('[resEvent]', resEvent);
                resEvent(values);
            });
        }
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    saveCreateFormRef = (formRef) => {
        this.createFormRef = formRef;
    };
}


// 用户信息List点击弹窗
const UserDropDownListForm = Form.create({ name: 'user_dropdown_list_form' })(
    class extends React.Component {
        upgradeOnCreate = (WrappedOnCreate, resEvent) => () => WrappedOnCreate()(resEvent);

        render() {
            const { modalName, dropDownMenuListItem, onCancel, onCreate } = this.props;
            const currentModal = dropDownMenuListItem[modalName] || {};
            const hasEvent = _.has(currentModal, 'resEvent');
            // console.log('[用户信息List点击弹窗]', onCreate);
            let footer = [
                <Button key='cancel' onClick={onCancel} type={hasEvent ? '' : 'primary'}> {currentModal.cancelText}</ Button>
            ];
            if (hasEvent) {
                const resEvent = currentModal['resEvent'];
                const WrappedOnCreate = this.upgradeOnCreate(onCreate, resEvent);
                footer.push(
                    <Button key='execEvent' type='primary' onClick={WrappedOnCreate}>{currentModal.okText}</Button>
                );
            }

            return (
                <Modal
                    wrapClassName={currentModal.wrapClassName}
                    visible={this.props.visible}
                    title={currentModal.title}
                    width={currentModal.width}
                    mast={true}
                    onCancel={onCancel}
                    footer={footer}
                    centered={true}
                >
                    {
                        Object.keys(currentModal).length
                            ? currentModal.body(this.props)
                            : null
                    }
                </Modal>
            )

            // this.props: antd/form + username + ...
        }
    }
);

/**
 * 用户信息弹窗
*/