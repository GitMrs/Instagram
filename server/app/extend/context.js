const jwt = require('jsonwebtoken');
module.exports = {
  get jwt() {
    return jwt;
  },
  // 用户身份
  get user() {
    let token = this.cookies.get('token');
    let user = jwt.verify(token,this.app.config.jwtSecret);
    return user;
  },
  returnBody (status,msg,data = {}){
    this.status = status;
    this.body = {
      data,
      message:msg,
      success:true
    }
  }
}