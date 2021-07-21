'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class task_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  task_user.init({
    user_id: DataTypes.INTEGER,
    task_id: DataTypes.INTEGER,
    status: DataTypes.STRING,
    is_completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'task_user',
  });
  return task_user;
};