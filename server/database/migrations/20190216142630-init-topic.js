'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   const {INTEGER,DATE,STRING,NOW} = Sequelize;
   await queryInterface.createTable('topic',{
     topicId:{type:INTEGER,primaryKey:true,autoIncrement:true},
     userId:{type:STRING(255)},
     topicTitle:{type:STRING(255),allowNull:true},
     topicImg:{type:STRING(1000),allowNull:false},
     address:{type:STRING(255),allowNull:true},
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
   await queryInterface.dropTable('topic')
  }
};
