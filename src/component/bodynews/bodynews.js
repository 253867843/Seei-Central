
import React from 'react';

// styled-components
import {
    NewsModal,
} from './style';

// antd
import { Tree } from 'antd';

// utils
import versionTree from '../../utils/version';

// iconfont
import IconFont from '../../iconFont/iconfont';

// lodash
import _ from 'lodash';

function BodyNews(props) {
    const { TreeNode } = Tree;
    const treeData = versionTree.getVersionTreeData();
    const renderTreeNodes = (treeData) => (
        treeData.map((v) => {
            if (v.children) {
                return (
                    <TreeNode title={v.title} key={v.key} dataRef={v} icon={<IconFont type={v.icon} />}>
                        {renderTreeNodes(v.children)}
                    </TreeNode>
                )
            }
            return <TreeNode title={v.title} key={v.key} icon={<IconFont type={v.icon} />} />
        })
    );

    const { key } = _.first(treeData);
    return (
        <NewsModal>
            <Tree
                showIcon
                defaultExpandedKeys={[key]}
            >
                {renderTreeNodes(treeData)}
            </Tree>
        </NewsModal>
    )
}

export default BodyNews;

