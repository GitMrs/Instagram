'use strict';

module.exports = {
  up: async(queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
   const {INTEGER,STRING,DATE,NOW} = Sequelize;
   await queryInterface.createTable('follow',{
    id:{type:INTEGER(10),primaryKey:true,autoIncrement:true},
    userId:{type:STRING(255)},
    followedId:{type:STRING(255)},
    status:{type:INTEGER(1),allowNull:true},
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
   await queryInterface.dropTable('follow')
  }
};
