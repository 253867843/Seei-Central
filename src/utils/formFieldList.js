// 添加组表单字段
export const createFormList = [
    {
      label: '组名',
      field: 'group'
    },
    {
      label: '描述',
      field: 'group-description'
    },
    {
      label: '编码器域名',
      field: 'encode-domain'
    },
    {
      label: '编码器端口',
      field: 'encode-port'
    },
    {
      label: 'auth',
      field: 'encode-auth'
    },
    {
      label: '接收wowza端口',
      field: 'encode-recvServicePort'
    },
    {
      label: 'wowza域名',
      field: 'wowza-domain'
    },
    {
      label: 'wowza端口',
      field: 'wowza-port'
    },
  ];

// 编码器更新表单字段
export const updateEncodeList = [
    {
      label: '域名',
      field: 'encode-domain',
      text: 'domain'
    },
    {
      label: '端口',
      field: 'encode-port',
      text: 'port'
    },
    {
      label: 'auth',
      field: 'encode-auth',
      text: 'auth'
    }, {
      label: '接收wowza端口',
      field: 'encode-recvServicePort',
      text: 'recvServicePort'
    }
  ];

// wowza更新表单字段
export const updateWowzaList = [
    {
      label: '域名',
      field: 'wowza-domain',
      text: 'domain'
    },
    {
      label: '端口',
      field: 'wowza-port',
      text: 'port'
    }
  ];  