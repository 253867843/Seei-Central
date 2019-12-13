const express = require('express');
const Router = express.Router();

// 模拟获取用户信息
Router.post('/users/userInfo', function (req, res) {
  console.log('[模拟获取用户信息]');
  return res.json({
    status: true,
    msg: '获取用户信息成功',
    code: '10041',
    data: {
      userInfo: {
        name: 'admin'
      },
      groupList: [
        {
          group_id: 'sd0abd9249451d0fdbf0e1406f5d9e6a',
          group: 'group_test1',
          description: '组1',
        },
        {
          group_id: 'sd0abd9249451d0fdbf0e1406f5d9e6b',
          group: 'group_test2',
          description: '组2',
        },
        {
          group_id: 'sd0abd9249451d0fdbf0e1406f5d9e6c',
          group: 'group_test3',
          description: '组3',
        }
      ]
    },
    info: {
      "type": "tip",
      "title": "",
      "info": "获取用户信息成功",
      "note": "获取用户信息成功",
      "steps": "获取用户信息步骤"
    }
  });
});

// 模拟登录成功
Router.post('/users/login', function (req, res) {
  return res.json({
    status: true,
    code: '10001',
    data: {
      userInfo: {
        name: 'admin'
      },
      groupList: [
        {
          group_id: 'sd0abd9249451d0fdbf0e1406f5d9e6a',
          group: 'group_test1',
          description: '组1',
        },
        {
          group_id: 'sd0abd9249451d0fdbf0e1406f5d9e6b',
          group: 'group_test2',
          description: '组2',
        },
        {
          group_id: 'sd0abd9249451d0fdbf0e1406f5d9e6c',
          group: 'group_test3',
          description: '组3',
        }
      ]
    },
    info: {
      type: 'tip',
      title: '',
      info: '登录成功',
      note: '登录成功',
      steps: '登录步骤'
    },
    msg: '登录成功'
  });
});

// data: {code: "-16000", data: {…}, info: {…}, msg: "登录失败"}

// 模拟验证码
Router.get('/users/verifyCode', function (req, res) {
  return res.json('验证码');
});

Router.get('/axiosfilter', function (req, res) {
  console.log('[后端axiosfilter]');
  return res.json({result: 'success'});
});

// Router.get('/axiosfilter', function (req, res) {
//   console.log('[后端axiosfilter]');
//   return res.json({result: 'success'});
// });

// http正确码 + 业务成功
Router.get('/httpCorrect01', function (req, res) {
  return res.status(200).json({
    code: '10001',
    data: {
      userInfo: {
        name: 'admin'
      },
      groupList: [
        {
          group_id: 'sd0abd9249451d0fdbf0e1406f5d9e6a',
          group: 'group_test',
          description: '',
        }
      ]
    },
    info: {
      type: 'tip',
      title: '',
      info: '登录成功',
      note: '登录成功',
      steps: '登录步骤'
    },
    msg: '登录成功'
  });
});

// http正确码 + 业务失败
Router.get('/httpCorrect02', function (req, res) {
  return res.status(200).json({
    code: '-16000',
    data: {},
    info: {
      type: 'error',
      title: '',
      info: '未登录',
      note: '未登录',
      steps: ''
    },
    msg: '登录失败'
  });
});

// http错误码
Router.get('/httpError403', function (req, res) {
  return res.status(403).json({
    code: '-16000',
    data: {},
    info: {
      type: 'error', // error, warning, tip, ""不显示
      title: '', // 前端展示用户错误提示框标题
      info: '未登录', // 前端展示用户提示内容
      note: '未登录',
      steps: ''
    },
    msg: '登录失败'
  });
});

Router.get('/httpError404', function (req, res) {
  return res.status(404).json({
    code: '-16000',
    data: {},
    info: {
      type: 'error', // error, warning, tip, ""不显示
      title: '', // 前端展示用户错误提示框标题
      info: '未登录', // 前端展示用户提示内容
      note: '未登录',
      steps: ''
    },
    msg: '登录失败'
  });
});

Router.get('/httpError500', function (req, res) {
  return res.status(500).json({
    code: '-16000',
    data: {},
    info: {
      type: 'error', // error, warning, tip, ""不显示
      title: '', // 前端展示用户错误提示框标题
      info: '未登录', // 前端展示用户提示内容
      note: '未登录',
      steps: ''
    },
    msg: '登录失败'
  });
});

Router.post('/httpError', function (req, res) {
  return res.status(404).json({
    code: '-16000',
    data: {},
    info: {
      type: 'error', // error, warning, tip, ""不显示
      title: '', // 前端展示用户错误提示框标题
      info: '未登录', // 前端展示用户提示内容
      note: '未登录',
      steps: ''
    },
    msg: '登录失败'
  });
});


module.exports = Router;
//   code: "-10001"
//   data: {}
//   info: {type: "error", title: "登录失败", info: "验证码错误", note: "验证码错误", steps: "登录步骤"}
//   msg: "验证码错误"