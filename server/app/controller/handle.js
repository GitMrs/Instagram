const Controller = require('egg').Controller;
class HandlerController extends Controller{
  async getQiniuToken(){
    const {ctx} = this;
    let token = await ctx.service.qiniu.getQiniuToken();
    ctx.returnBody(200,'获取token成功',{
      token,
      baseUrl:'http://pnfaov4yn.bkt.clouddn.com'
    })
  }
}
module.exports = HandlerController;