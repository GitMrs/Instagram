const Service = require('egg').Service;
const qiniu = require('qiniu');
const accessKey = 'Hukrr1cTg_pj07oyYnx4awKkN_R3Czab3NuvTkzV';
const secretKey = '3cIUGdDdapPUAM1fuwUBQ-gu09GcLxBFIraZSMqu';
const publicBucketDomain = 'http://pnfaov4yn.bkt.clouddn.com'
const options = {
  scope:'instaget',
  expries:7200
}
class QiniuService extends Service {
  async getQiniuToken() {
    if(!accessKey || !secretKey || !publicBucketDomain){
      this.ctx.throw(400,'请配置七牛环境')
    }else{
      let mac = new qiniu.auth.digest.Mac(accessKey,secretKey);
      let putPolicy = new qiniu.rs.PutPolicy(options);
      let uploadToken = putPolicy.uploadToken(mac);
      return uploadToken;
    }
  }
}
module.exports = QiniuService;