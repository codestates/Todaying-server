
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(db) { 
     db.user.hasMany(db.card)
    }
  };
  user.init({
    email: DataTypes.STRING,
    type: DataTypes.STRING,
    password: DataTypes.STRING,
    nickname: DataTypes.STRING,
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
    charset: 'utf8',
    collate:'utf_unicon_ci'
  });
  return user;
};