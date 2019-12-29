// export default () => {
//     const treeData = [
//         {
//             title: '版本 0.0.2',
//             key: 'v0.0.2',
//             children: [
//                 { title: '更新流程', key: 'v0.0.2-update-process' },
//                 { title: '增加三级路由', key: 'v0.0.2-add-third-route' },
//                 { title: '增加用户信息弹窗', key: 'v0.0.2-add-user-modal' }
//             ]
//         },
//         {
//             title: '版本 0.0.1',
//             key: 'v0.0.1',
//             children: [
//                 { title: '新建页面', key: 'v0.0.1-create-page' }
//             ]
//         },
//     ];

//     return { treeData };
// }




export default {
    getVersionTreeData: () => (
        [
            {
                title: '版本 0.0.2',
                key: 'v0.0.2',
                icon: 'iconbanbenhao-copy',
                children: [
                    { title: '更新流程', key: 'v0.0.2-update-process', icon: 'icondian-copy' },
                    { title: '增加三级路由', key: 'v0.0.2-add-third-route', icon: 'icondian-copy' },
                    { title: '增加用户信息弹窗', key: 'v0.0.2-add-user-modal', icon: 'icondian-copy' }
                ]
            },
            {
                title: '版本 0.0.1',
                key: 'v0.0.1',
                icon: 'iconbanbenhao-copy',
                children: [
                    { title: '新建页面', key: 'v0.0.1-create-page', icon: 'icondian-copy' }
                ]
            },
        ]
    )
};