module.exports = app => {
  const {STRING, INTEGER, DATE, NOW} = app.Sequelize;
  const User = app.model.define('users',{
    id:{
      type:INTEGER,
      primaryKey:true,
      autoIncrement:true
    },
    userId:{type:STRING(255)},
    email:{type:STRING(255),allowNull:false},
    password:{type:STRING(255),allowNull:false},
    username:{type:STRING(255),allowNull:false},
    avatarUrl:{type:STRING(255),defaulValue:''},
    mobile:STRING(255),
    prefix:STRING(255),
    abstract:{type:STRING(255),allowNull:true},
    sex:{type:STRING(255),defaulValue:0},
    created_at:{type:DATE,defaulValue:NOW},
    updated_at:{type:DATE,defaulValue:NOW}
  },
  {
    freezeTableName:true
  })
  return User;
}