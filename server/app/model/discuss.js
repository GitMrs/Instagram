module.exports = app => {
  const {INTEGER,DATE,STRING,NOW} = app.Sequelize;
  const Discuss = app.model.define('discuss',{
    discussId:{type:INTEGER(10),primaryKey:true,autoIncrement:true},
    topicId:{type:STRING(255)},
    userId:{type:STRING(255)},
    replyName:{type:STRING(1000),allowNull:false},
    replyContent:{type:STRING(255),allowNull:true},
    created_at:{type:DATE,defaultValue:NOW},
    updated_at:{type:DATE,defaultValue:NOW}
  },{
    freezeTableName:true
  }) 
  return Discuss;
}