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
    await queryInterface.createTable('topic_like',{
      id:{type:INTEGER,primaryKey:true,autoIncrement:true},
      topicId:{type:STRING(255)}, // 
      userId:{type:STRING(255)},
      status:{type:INTEGER(1)},
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
   await queryInterface.dropTable('topic_like')
  }
};
