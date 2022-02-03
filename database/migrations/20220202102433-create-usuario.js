'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {    
    await queryInterface.createTable('usuarios', { 
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      nome:{
        type: Sequelize.STRING,
        allowNull: false
      },
      cpf:{
       type: Sequelize.STRING,
       allowNull: false
      },
      senha:{
       type: Sequelize.STRING,
       allowNull: false
      },
      balance:{
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      createdAt:{
        type: Sequelize.DATE,         
      },
      updatedAt:{
        type: Sequelize.DATE
      },
      deletedAt:{
        type: Sequelize.DATE
      }
    },
    
    );
    
  },

  down: async (queryInterface, Sequelize) => {   
    await queryInterface.dropTable('usuarios');
     
  }
};
