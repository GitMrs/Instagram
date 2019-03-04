'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  const apiV2Router = app.router.namespace('/api/v2');
  router.get('/', controller.home.index);
  router.get('/api', controller.api.index);
  // router.post('/login/reginster',controller.login.reginster)
  // api版本的控制 namespace 开辟新的命名空间
  apiV2Router.post('/login/register',controller.login.register)
  apiV2Router.post('/login',controller.login.loginIn)
  apiV2Router.get('/login/signOut',controller.login.signOut)
  apiV2Router.get('/user/info',controller.user.userInfo)
  // topic 
  apiV2Router.post('/topic/addTopic',controller.topic.addTopic)
  apiV2Router.get('/topic/detail',controller.topic.topicDetail)
  apiV2Router.get('/find/topicList',controller.topic.findList)
  apiV2Router.post('/topic/discuss/add',controller.topic.discussAdd)
  //follow
  apiV2Router.post('/friend/follow',controller.friend.follow)
  apiV2Router.get('/friend/list',controller.friend.notFriendList)
  //like
  apiV2Router.post('/topic/like',controller.topic.putLikeTopic)
  //qiniu
  apiV2Router.get('/handle/upload/get-token',controller.handle.getQiniuToken)
};
