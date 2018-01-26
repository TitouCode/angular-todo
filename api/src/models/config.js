const mongoose = require('mongoose');
const DB = require('./../config/parameters').DATABASE;

module.exports = {
  init: () => {
    mongoose.connect(`mongodb://${DB.user}:${DB.password}@${DB.host}:${DB.port}/${DB.name}`, { useMongoClient: true });
    console.log('Successfully connected to Mongoose');
  }
}
