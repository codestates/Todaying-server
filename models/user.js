const crypto = require('crypto');

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
  }, {
    sequelize,
    modelName: 'user',
    charset: 'utf8',
    collate:'utf_unicon_ci'
  });

  user.beforeCreate ((data) => {
      var shasum = crypto.createHmac('sha512', 'tommorow');
        shasum.update(data.password);
        data.password = shasum.digest('hex');      
  });

  user.beforeFind ((data) => {
    if (data.where.password) {
      var shasum = crypto.createHmac('sha512', 'tommorow');
      shasum.update(data.where.password);
      data.where.password = shasum.digest('hex');    
    }
  });
  
  return user;
};