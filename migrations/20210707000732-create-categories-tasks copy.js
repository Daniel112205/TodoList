'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('categories_tasks', 'name', 'title');
    }
};