const Controller = require('egg').Controller;
class topicController extends Controller{
  async addTopic(){
    const {ctx} = this;
    const {topicImg, topicTitle} = ctx.request.body;
    const userId = ctx.user.userId;
    let newTopic = {
      topicImg:JSON.stringify(topicImg),
      topicTitle:topicTitle,
      userId
    }
    await ctx.service.topic.insertTopic(newTopic);
    ctx.returnBody(200,'发表成功！')
  }
  async topicDetail(){
    const {ctx} = this;
    
  }
  async queryTopic(){
    const {ctx} = this
    const {topicTitle} = ctx.request.body;
    let queryData = {
      topicTitle
    }
    const response = await ctx.service.topic.queryTopicCounts(queryData)
    ctx.returnBody(200,'查询成功',response)
  }
  async findList(){
    const {ctx} = this;
    const userId = ctx.user.userId;
    //关注列表
    const follower = await ctx.service.follow.findFollow({
      followedId:userId,
      status:1
    })
    let followList = follower.map(item => {
      return item.userId
    })
    followList.push(userId)
    const Op = this.app.Sequelize.Op;
    //关联文章
    let topics = await ctx.service.topic.queryTopicList({
      userId:{
        [Op.in]:followList
      }
    })
    //userinfo
    let topicList = []
    for(let topic of topics){
      let item = await ctx.service.topic.topicDetailHandeler(topic.topicId);
      topicList.push(item)
    }

    topicList && ctx.returnBody(200,'成功',topicList)
  }
  //评论
  async discussAdd(){
    const {ctx} = this;
    const {topicId,replyContent} = ctx.request.body;
    let userId = ctx.user.userId;
    //topicId username userId 多存一个冗余字段
    let user = await ctx.service.user.getUserByUserId(userId)
    let newDiscuss = {
      topicId,
      replyContent,
      replyName:user.username,
      userId
    }
    let discuss = ctx.service.topic.insertDiscuss(newDiscuss);
    discuss && ctx.returnBody(200,'成功',discuss);
    !discuss && ctx.returnBody(400,'服务器异常')
  }
  //收藏
  async putLikeTopic(){
    let {ctx} = this;
    const {topicId,status} = ctx.request.body;
    const userId = ctx.user.userId;

    let topicStatus = {
      topicId,
      userId,
      status
    }
    //点赞 || 取消点赞 

    let query = {
      topicId,
      userId
    }
    await ctx.service.topic.putLikeTopic(query,topicStatus);
    ctx.returnBody(200,'更新成功',{
      status:+status
    })
  }
}
module.exports = topicController;
