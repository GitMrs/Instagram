const Service = require('egg').Service;
class FollowService extends Service {
  async followUser(followMsg) {
    let { ctx } = this;
    //有没有两者关系的记录 ？ updata : create;
    const obj = await ctx.model.Follow.findOne({
      where: {
        userId: followMsg.userId,
        followedId: ctx.user.userId
      }
    })
    if (obj) {
      return await obj.update(followMsg);
    } else {
      return await ctx.model.Follow.create(followMsg);
    }
  }
  async findFollow (query) {
    let {ctx} = this;
    return await ctx.model.Follow.findAll({
      where:query
    })
  }
}
module.exports = FollowService;