const Controller = require('egg').Controller;
class apiController extends Controller{
  async index(){
    this.ctx.body = 'hi api'
  }
}
module.exports = apiController;
