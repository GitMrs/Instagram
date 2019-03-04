const Service = require('egg').Service;
class TopicService extends Service {
  async insertTopic(topic) {
    const { ctx } = this;
    return await ctx.model.Topic.create(topic)
  }
  async queryTopicDetail(query) {
    const { ctx } = this;
    return await ctx.model.Topic.findOne({
      where: query
    })
  }
  async queryDetailHandeler(topicId) {
    const { ctx } = this;
    let topic = await ctx.service.topic.queryTopicDetail({
      topicId: +topicId
    })
  }
  async queryTopicCounts(query) {
    const { ctx } = this;
    return await ctx.model.Topic.findAndCountAll({
      where: query,
      order: [['created_at', 'DESC']]
    })
  }
  async queryTopicList(query) {
    const { ctx } = this;
    return await ctx.model.Topic.findAll({
      where: query,
      order: [['created_at', 'DESC']]
    })
  }
  async topicDetailHandeler(topicId) {
    const { ctx } = this;
    console.log(topicId)    
    let topic = await ctx.service.topic.queryTopicDetail({
      topicId: topicId
    })
    console.log(topic)
    // if(!topic) return;
    let userId = topic.userId;
    let user = await ctx.service.user.getUserByUserId(userId)
    const topicDetail = {
      userInfo: {
        username: user.username,
        avatarUrl: user.avatarUrl,
        userId: user.userId
      },
      topic: {
        topicImgList: topic.topicImg,
        create_at: topic.created_at,
        topicId
      }
    }
    return topicDetail || {}
  }
  async insertDiscuss(discuss) {
    const { ctx } = this;
    return ctx.model.Discuss.create(discuss)
  }
  async putLikeTopic(query, topicStatus) {
    const { ctx } = this;
    let result = await this.queryTopicLike(query)
    if(!result){
      return await ctx.model.TopicLike.create(topicStatus)
    }else{
      return await ctx.model.TopicLike.update(topicStatus,{
        where:query
      })
    }
  }
  async queryTopicLike(query) {
    return await this.ctx.model.TopicLike.findOne({
      where: query
    }
    )
  }
}
module.exports = TopicService;