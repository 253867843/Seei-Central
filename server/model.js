const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DB_URL = 'mongodb://127.0.0.1:27017/sCloud';
mongoose.connect(DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.once('open', function () {
  console.log('[mongoose connect success]');
});

const models = {
  "user": {
    "userInfo": {
      "name": {type: String, required: true}
    },
    "groupList": [
      {
        "group_id": {type: String}, // 在addGroup后添加
        "group": {type: String}, // 在addGroup后添加
        "description": {type: String}, // 在addGroup后添加
      }
    ]
  },
  "group": {
    "group_id": {type: Schema.Types.ObjectId}, // 非必填
    "group": {type: String, required: true},
    "encodeDevices": [
      {
        "id": {type: Schema.Types.ObjectId}, // 非必填
        "domain": {type: String, required: true},
        "port": {type: Number, required: true},
        "auth": {type: String, required: true},
        "recvServicePort": {type: Number, required: true},
        "state": {type: String, default: 'normal'}, // 非必填
        "eMessage": {type: String, default: 'no error'}, // 非必填
        "status": {type: Boolean, required: false} // 非必填
      }
    ],
    "recvStreamServices": [
      {
        "id": {type: Schema.Types.ObjectId}, // 非必填
        "domain": {type: String, required: true},
        "port": {type: Number, required: true},
        "state": {type: String, default: 'normal'},// 非必填
        "eMessage": {type: String, default: 'no error'} // 非必填
      }
    ],
    "dState": {type: String, default: 'offline'}, // 非必填
    "eMessage": {type: String, default: 'no error'}, // 非必填
    "description": {type: String, required: true}
  }
};

// data: {
//   group_id: 'sd0abd9249451d0fdbf0e1406f5d9e6a',	#组的ID
//   group: 'group_test',
//   encodeDevices:[		#编码器设备
//   {
//       id: 'f0abd9249451d0fdbf0e1406f5d9e87',		#编码器设备id
//     domain: '127.0.0.1',	#编码器服务地址可以是IP或者域名
//   port: 8000,		#编码器服务端口  默认8000
//   auth: '4a0abd9249451d0fdbf0e1406f5d9e6a',	#认证auth 让用户自行输入
//   recvServicePort: 10000,		#接收wowza端的端口  默认10000
//   state:	normal,		#状态 abnormal(异常)	 normal(正常)
//   eMessage: ''	#异常信息
// }
// ],
//   recvStreamServices:[	#接收端wowza
//     {
//       id: 'b0abd9249451d0fdbf0e1406f5d9e31'		#wowza服务id
//     domain: '127.0.0.1',	#接收端wowza地址可以是IP或者域名
//   port: 8087		#接收端wowza端口  默认8087
//   state:	normal,		#状态 abnormal(异常)	 normal(正常)
//   eMessage: ''	#异常信息
// }
// ]
//   dState: 'offline',	#offline(未匹配) ready(已经匹配)
//   status: true,	#推流状态  推流中true  推流失败false
//   eMessage: '',	#异常信息
//   description: ''
// }

for (let m in models) {
  mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
  getModel(name) {
    return mongoose.model(name)
  }
};