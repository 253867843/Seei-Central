// 添加组表单字段
export const createFormList = [
  {
    label: '组名',
    field: 'group',
    type: 'input'
  },
  {
    label: '描述',
    field: 'group-description',
    type: 'input'
  },
  {
    label: '编码器域名',
    field: 'encode-domain',
    type: 'input'
  },
  {
    label: '编码器端口',
    field: 'encode-port',
    type: 'input'
  },
  {
    label: 'auth',
    field: 'encode-auth',
    type: 'input'
  },
  {
    label: '接收S4000端口',
    field: 'encode-recvServicePort',
    type: 'input'
  },
  {
    label: '协议',
    field: 'encode-protocol',
    type: 'select'
  },
  {
    label: 'S4000域名',
    field: 'wowza-domain',
    type: 'input'
  },
  {
    label: 'S4000端口',
    field: 'wowza-port',
    type: 'input'
  }
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
  },
  {
    label: '接收S4000端口',
    field: 'encode-recvServicePort',
    text: 'recvServicePort'
  },
  {
    label: '协议',
    field: 'encode-protocol',
    text: 'protocol',
    type: 'select'
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