const Service = require('egg').Service; //引用egg服务
const uuid = require('uuid'); //实用uuid给userID唯一值
const crypto = require('crypto'); //单项加密
const jwt = require('jsonwebtoken'); //token生存
class UserService extends Service {
  //注册
  async register(user) {
    const {ctx,app} = this;
    user.userId = uuid.v4().replace(/-/g,'')
    // console.log(user.userId)
    
    //判断email是否存在
    const queryResult = await this.hasRegister(user.email);
    console.log("+++++++++", queryResult)
    if(queryResult){
      ctx.returnBody(200,'邮箱已被使用',{flag:false})
      return;
    }
    //密码加密
    user.password = crypto.createHmac('sha256',app.config.password_secret)
      .update(user.password)
      .digest('hex')
      //创建新数据
      
    const userInfo = await this.ctx.model.User.create(user);
    ctx.returnBody(200,'注册成功',{flag:true,userId:user.Id})
    return userInfo.dataValues;
  }
  //检测邮箱是否存在
  async hasRegister(email){
    const user = await this.ctx.model.User.findOne({
      where:{email:email}
    });
    if(user && user.dataValues.userId){
      return true;
    }else{
      return false;
    }
  }
  //登陆服务
  async login(user) {
    const {app} = this;
    const {password, email} = user;
    const existUser = await this.getUserByMail(email);
    if(!existUser){
      return null;
    }

    const passHash = existUser.password;
    const equal = passHash == crypto.createHmac('sha256',app.config.password_secret)
      .update(password)
      .digest('hex');

    if(!equal){
      return false;
    }

    const token = jwt.sign({userId:existUser.userId},app.config.jwtSecret,{expiresIn:'7d'})

    return token;
  }
  async getUserByMail(email) {
    return this.ctx.model.User.findOne({
      where:{
        email
      }
    });
  }
  async getUserByUserId(userId){
    const query = {userId:userId};
    return this.ctx.model.User.findOne({
      where:query
    });
  }
  async getUserList(userId){
   let {app} =  this;
   const Op = app.Sequelize.Op
   let followList = await this.ctx.model.Follow.findAll({
     attributes:['userId'],
     where:{
       followedId:userId,
       status:1
     }
   })

   followList = followList.map(item => {
     return item.userId
   })
   return this.ctx.model.User.findAll({
     attributes:['userId','username','email','avatarUrl','abstract'],
     where:{
       userId:{
         [Op.ne]:userId,
         [Op.notIn]:followList
       }
     }
   })
  }
 
} 
module.exports = UserService