// 添加组表单字段
export const createFormList = [
  {
    label: '组名',
    field: 'group',
    type: 'input',
    message: '请输入组名'
  },
  {
    label: '描述',
    field: 'group-description',
    type: 'input',
    message: '请输入描述'
  },
  {
    label: '编码器域名',
    field: 'encode-domain',
    type: 'input',
    message: '请输入编码器域名'
  },
  {
    label: '编码器端口',
    field: 'encode-port',
    type: 'input',
    message: '请输入编码器端口'
  },
  {
    label: 'auth',
    field: 'encode-auth',
    type: 'input',
    message: '请输入auth'
  },
  {
    label: '接收S4000端口',
    field: 'encode-recvServicePort',
    type: 'input',
    message: '请输入接收S4000端口'
  },
  {
    label: '协议',
    field: 'encode-protocol',
    type: 'select',
    message: '请选择协议'
  },
  {
    label: '编码器上传码率',
    field: 'encode-videoCodeRate',
    type: 'input',
    placeholder: '默认为5，单位K',
    message: '请输入编码器上传码率'
  },
  {
    label: 'S4000域名',
    field: 'wowza-domain',
    type: 'input',
    message: '请输入S4000域名'
  },
  {
    label: 'S4000端口',
    field: 'wowza-port',
    type: 'input',
    message: '请输入S4000端口'
  },
  {
    label: '转发mpegts地址', // 127.0.0.1
    field: 'wowza-forwardAddress',
    type: 'input',
    message: '请输入S4000端口',
    isDisabled: true // 表示 字段是否可以禁用
  }, 
  {
    label: '转发mpegts端口', // 12000
    field: 'wowza-forwardPort',
    type: 'input',
    message: '请输入S4000端口',
    isDisabled: true
  },
  {
    label: 'S4000是否需要转发',
    field: 'wowza-isForward',
    type: 'checkbox',
    message: '接收S4000是否需要转发',
    isRequired: true, // 表示 该字段可以跳过 required 检查
  },
];

// 编码器更新表单字段
export const updateEncodeList = [
  {
    label: '域名',
    field: 'encode-domain',
    text: 'domain',
    message: '请输入域名'
  },
  {
    label: '端口',
    field: 'encode-port',
    text: 'port',
    message: '请输入端口'
  },
  {
    label: 'auth',
    field: 'encode-auth',
    text: 'auth',
    message: '请输入auth'
  },
  {
    label: '接收S4000端口',
    field: 'encode-recvServicePort',
    text: 'recvServicePort',
    message: '请输入接收S4000端口'
  },
  {
    label: '协议',
    field: 'encode-protocol',
    text: 'protocol',
    type: 'select',
    message: '请输入协议'
  },
  {
    label: '编码器上传码率',
    field: 'encode-videoCodeRate',
    text: 'videoCodeRate',
    type: 'input',
    placeholder: '默认为5，单位K',
    message: '请输入编码器上传码率'
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
  },
  {
    label: '转发mpegts地址', // 127.0.0.1
    field: 'wowza-forwardAddress',
    type: 'input',
    message: '请输入S4000端口',
    text: 'forwardAddress',
    isDisabled: true // 表示 字段是否可以禁用
  },
  {
    label: '转发mpegts端口', // 12000
    field: 'wowza-forwardPort',
    type: 'input',
    message: '请输入S4000端口',
    text: 'forwardPort',
    isDisabled: true
  },
  {
    label: 'S4000是否需要转发',
    field: 'wowza-isForward',
    type: 'checkbox',
    message: '接收S4000是否需要转发',
    text: 'isForward',
    isRequired: true, // 表示 该字段可以跳过 required 检查
  }
];  