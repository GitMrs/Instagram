module.exports = app => {
  const {STRING,INTEGER,DATE,NOW} = app.Sequelize;
  const TopicLike = app.model.define('topic_like',{
    id:{type:INTEGER,primaryKey:true,autoIncrement:true},
    topicId:{type:STRING(255),allowNull:false},
    userId:{type:STRING(255),allowNull:false},
    status:{type:INTEGER(1),allowNull:false},
    created_at:{type:DATE,defaultValue:NOW},
    updated_at:{type:DATE,defaultValue:NOW}
  },{
    freezeTableName:true
  })
  return TopicLike;
}