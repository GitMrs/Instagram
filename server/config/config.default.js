'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1549982270096_821';

  // add your config here
  config.middleware = [];
  //取消post csrf
  config.security = { csrf: { enable: false } }
  // egg使用egg-sequelize链接mysql
  config.sequelize = {
    dialect:'mysql',
    host:'127.0.0.1',
    port:3306,
    password:'1234567890',
    database:'learn'
  }
  //密码随机字符串
  config.password_secret = 'pas123kius';
  //cookies
  config.auth_cookie_name = 'token'
  //jwt设置时cookie密码
  config.jwtSecret = 'wumingcao'
  //配置请求白名单
  config.authWhiteList = ['/api/v2/login/register','/api/v2/login']
  //中间件 ctx 上为request 下为 reponse
  config.middleware = ['authorization']
  return config;
};
