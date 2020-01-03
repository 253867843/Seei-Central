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
                title: '版本 0.0.3',
                key: 'v.0.0.3',
                icon: 'iconbanbenhao-copy',
                children: [
                    { title: '增加登出功能', key: 'v0.0.3-add-logout', icon: 'icondian-copy' },
                    { title: '增加修改密码功能', key: 'v0.0.3-add-modifyPwd', icon: 'icondian-copy' },
                    { title: '修复匹配不要显示group_id', key: 'v0.0.3-del-groupId', icon: 'icondian-copy' },
                    { title: '修复gridcard/encode不要显示auth', key: 'v0.0.3-del-auth', icon: 'icondian-copy' },
                    { title: '修改修改密码/登出后的跳转逻辑', key: 'v0.0.3-modify-redirect-process', icon: 'icondian-copy' },
                    { title: '修改匹配弹窗的页面样式', key: 'v0.0.3-modify-match-modal-css', icon: 'icondian-copy' },
                    { title: '增加srt/mpegts协议选项', key: 'v0.0.3-add-srt/mpegts-protocol', icon: 'icondian-copy' },
                ]
            },
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