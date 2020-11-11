
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class todolist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(db) {
      db.todolist.belongsTo(db.card,{
        foreignKey: 'cardId'        
      })
    }
  };
  todolist.init({
    task: DataTypes.STRING,
    isDone: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'todolist',
    charset: 'utf8',
    collate:'utf_unicon_ci'
  });
  return todolist;
};