export default {
  getVerifyCode: () => '/users/verifyCode',
  login: () => '/users/login',
  logout: () => '/users/logout',
  modifyPassword: () => '/users/modifyPassword',
  getUserInfo: () => '/users/userInfo',
  createGroup: () => '/method/addGroup',
  modifyGroup: () => '/method/modifyGroup',
  fetchGroupInfo: () => '/method/getGroupInfo',
  deleteGroup: () => '/method/deleteGroup',
  deleteAllGroup: () => '/method/deleteAllGroup',
  matchGroup: () => '/method/groupMatch',
  startPushStream: () => '/method/pushStream',
  finishPushStream: () => '/method/stopPushStream',
  fetchWowzaInfo: () => '/method/getRecvStreamServicesInfo'
}