'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   const {INTEGER, STRING, DATE, NOW} = Sequelize;
   await queryInterface.createTable('discuss',{
     discussId:{type:INTEGER,primaryKey:true,autoIncrement:true}, //  评论id
     topicId:{type:STRING(255)},  //帖子id
     userId:{type:STRING(255)}, //用户id
     replyName:{type:STRING(1000),allowNull:false}, //回复名子
     replyContent:{type:STRING(255),allowNull:true},//回复内容
     created_at:{type:DATE,defaultValue:NOW},
     updated_at:{type:DATE,defaultValue:NOW}
   })
  },

  down: async(queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
    await queryInterface.dropTable('discuss')
  }
};
