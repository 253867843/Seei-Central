import {Router} from 'express';
import model from './model';

const router = Router();
const GroupModel = model.getModel('group');
const UserModel = model.getModel('user');

// 查看转发流Group信息
router.post('/getGroupInfo', (req, res) => {
  const {group, group_id} = req.body;
  GroupModel.find({group, group_id}, (err, doc) => {
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

// 添加转发流Group
router.post('/addGroup', (req, res) => {
  // const {group, encodeDevices, recvStreamServices, description} = req.body;
  // const group = 'group_test3';
  // const encodeDevices = [{
  //   "domain": "12.45.123.4",
  //   "port": 10000,
  //   "auth": "4a0abd9249451d0fdbf0e1406f5d9e6d",
  //   "recvServicePort": 12000,
  // }];
  // const recvStreamServices = [{
  //   "domain": "12.45.123.41",
  //   "port": 8089,
  // }];
  // const description = '新添加设备' + new Date();
  const {group, encodeDevices, recvStreamServices, description} = req.body;
  console.log('[添加转发流Group]', description);
  const groupModel = new GroupModel({group, encodeDevices, recvStreamServices, description});
  groupModel.save({}, (err, doc) => {
    if (err) {
      return res.json({err});
    }
    UserModel.findOneAndUpdate({"userInfo": {"name": "admin"}}, {
      "$push": {
        "groupList": {
          "group_id": doc._id,
          "group": doc.group,
          "description": doc.description
        }
      }
    }, (err, doc) => {
      if (err) {
        console.log('[更新用户的组信息 err]', err);
      } else {
        console.log('[更新用户的组信息 doc]', doc);
      }
    });

    const data = Object.assign(doc, {"group_id": doc._id});
    console.log('[添加转发流Group]', data);
    return res.json({
      "status": true,
      "msg": "",
      "code": 0,
      "data": data
    });
  });
});

// 添加组信息(手动)
// router.get('/createGroup', (req, res) => {
//   const groupModel = new GroupModel({
//     "group_id": "sd0abd9249451d0fdbf0e1406f5d9e6c",
//     "group": "group_test3",
//     "encodeDevices": [
//       {
//         "id": "f0abd9249451d0fdbf0e1406f5d9e87",
//         "domain": "12.45.123.4",
//         "port": 10000,
//         "auth": "4a0abd9249451d0fdbf0e1406f5d9e6c",
//         "recvServicePort": 12000,
//         "state": "normal",
//         "eMessage": "no error",
//         "status": true
//       }
//     ],
//     "recvStreamServices": [
//       {
//         "id": "b0abd9249451d0fdbf0e1406f5d9e31",
//         "domain": "12.45.123.41",
//         "port": 8089,
//         "state": "normal",
//         "eMessage": "no error"
//       }
//     ],
//     "dState": "offline",
//     "eMessage": "no error",
//     "description": "组3"
//   });
//   groupModel.save({}, (err, doc) => {
//     if (err) {
//       return res.json({err});
//     }
//     return res.json({doc});
//   })
// });

// [
//   { "_id" : ObjectId("5db02c148110623ae9a12607"), "group" : "123", "description" : "123" },
//   { "_id" : ObjectId("5db030098147163b3b7a1b61") },
//   { "_id" : ObjectId("5db032a87b87a43b54fe862f"), "group_id" : "5db032a87b87a43b54fe862c", "group" : "group_test", "description" : "123" } ]
module.exports = router;