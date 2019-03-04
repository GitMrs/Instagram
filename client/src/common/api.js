import instance from './axiosInstance.js';
exports.login = (data) => {
  return instance.post('/login',data);
}
exports.register = (data) => {
  return instance.post('/login/register',data)
}
exports.getUserInfo = (data) => {
  return instance.get('/user/info',data)
}
exports.signOut = () => {
  return instance.get('/login/signOut')
}
//用户列表
exports.friendList = () => {
  return instance.get('/friend/list')
}
//关注用户
exports.followUser = (data) => {
  return instance.post('/friend/follow',data)
}
//文章列表
exports.findTopicList = () => {
  return instance.get('/find/topicList')
}
//添加用户评论
exports.addDiscuss = (data) => {
  return instance.post('/topic/discuss/add',data)
}
//添加七牛云图片
exports.getToken = () => {
  return instance.get('/handle/upload/get-token')
}
exports.addTopic = (data) => {
  return instance.post('/topic/addTopic',data)
}