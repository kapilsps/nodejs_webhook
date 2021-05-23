'use strict';
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

sequelize.addHook('afterCreate', (instance, options) => {
  axios({
    method: 'post',
    url:'http://localhost:3000/send-email',
    data:{
      message: "Record created successfully",
    },
    headers: { 
      'Content-Type': 'application/json'
    },
  }).then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });
});

sequelize.addHook('afterBulkDestroy', (instance, options) => {
  axios({
    method: 'post',
    url:'http://localhost:3000/send-email',
    data:{
      message: "Record deleted successfully",
    },
    headers: { 
      'Content-Type': 'application/json'
    },
  }).then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });
});

sequelize.addHook('afterBulkUpdate', (instance, options) => {
  axios({
    method: 'post',
    url:'http://localhost:3000/send-email',
    data:{
      message: "Record updated successfully",
    },
    headers: { 
      'Content-Type': 'application/json'
    },
  }).then(result => {
    console.log(result);
  })
  .catch(err => {
    console.log(err);
  });
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
