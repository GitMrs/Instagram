'use strict';

const Controller = require('egg').Controller;

class loginController extends Controller {
  //注册
  async register() {
    // this.ctx.body = 'do reginster';
    const { ctx } = this;
    const { password, username, email } = ctx.request.body
    await ctx.service.user.register({ password, username, email })
  }
  //登陆
  async loginIn() {
    const { ctx } = this
    const { password, email } = ctx.request.body;
    const token = await ctx.service.user.login({ password, email })
    if (token) {
      const opts = {
        path: '/',
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: false,
        domain: '127.0.0.1'
      }

      ctx.cookies.set(this.config.auth_cookie_name, token)
      // console.log(ctx.cookies.get('token'))
      ctx.returnBody(200, '登陆成功！')
    } else {
      ctx.throw(400, '用户名或者密码错误')
    }
  }
  //退出
  async signOut() {
    const {ctx} = this;
    ctx.cookies.set(this.config.auth_cookie_name,'');
    ctx.returnBody(200,'退出登陆成功！')
  }
}

module.exports = loginController;
