--egg.js post提交会有csrf请求拦截
取消 在config,default.js 配置 config.security = { csrf:{enable:false} }
--egg.js 接口数据版本设置在router 下载egg-router-plus 
--sequelize mysql2 sequzli-cli
配置 sequelize-cli
创建.sequelizerc 文件 配置路径
./node_modules/.bin/sequelize init 初始化文件
./node_modules/.bin/sequelize db:create 创建数据库
./node_modules/.bin/sequelize migration:create --name create-user 创建名字为create-user的迁移文件
./node_modules/.bin/sequelize db:migrate 文件名 生成表格
./node-modules/.bin/sequelize db:migrate:undo:all 文件名 删除表格

数据库查看 show databasee ===> 看数据库; use learn ====> 进入库; describe users ====>查看表格; show tables ====> 查看表格 ;delete from tables ====>删除表数据； truncate tables ====> 重置表格数据 drop table tables ====> 删除表格；


`password加密
实用crypto Hmac sha256

--jsonwebtoken ===> jwt ;一个轻巧的规范，允许用户和服务器之间传递安全可靠的信息
cookie
ctx.cookie.set(name,opts);
--状态码 status 
400 请求非法，导致服务器不接受请求
200 请求成功
401 未经授权，对服务器配置拒绝

