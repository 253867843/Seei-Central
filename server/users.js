// import {Router} from 'express';
// import model from './model';

const express = require('express');
const Router = express.Router;
const model = require('./model');
const router = Router();
const UserModel = model.getModel('user');
const _filter = {_id: 0}; // 查询过滤条件

// 登录
router.post('/login', function (req, res) {
  UserModel.findOne({}, _filter, (err, doc) => {
    if (err) {
      return res.json({
        "status": false,
        "msg": "",
        "code": 1,
        "data": {}
      });
    }
    return res.json({
      "status": true,
      "msg": "",
      "code": 0, // 0表示登录成功, 其他表示登录失败
      "data": doc
    });
  });
});

// 获取当前用户信息
router.post('/userInfo', function (req, res) {
  UserModel.findOne({}, _filter, (err, doc) => {
    if (err) {
      return res.json({
        "status": false,
        "msg": "",
        "code": 1,
        "data": {}
      });
    }
    return res.json({
      "status": true,
      "msg": "",
      "code": 0,
      "data": doc
    });
  });
});

// 添加用户信息(手动)
router.get('/createLogin', function (req, res) {
  const userModel = new UserModel({
    "userInfo": {
      "name": "admin"
    },
    "groupList": []
  });
  userModel.save({}, function (err, doc) {
    if (err) {
      return res.json({err});
    }
    return res.json({doc});
  });
});


module.exports = router;