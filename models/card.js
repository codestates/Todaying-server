
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class card extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(db) {
      db.card.belongsTo(db.user,{
        foreignKey: 'userId',
        });
      db.card.hasMany(db.todolist)

    }
  };
  card.init({
    type: DataTypes.STRING,
    title: DataTypes.STRING,
    text: DataTypes.STRING,
    date:DataTypes.STRING
       
    
  }, {
    sequelize,
    modelName: 'card',
    charset: 'utf8',
    collate:'utf_unicon_ci'

  });
  return card;
};