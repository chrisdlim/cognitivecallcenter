// sets up cloudant and returns it
// i'm sorry, i just copy and paste boilerplate today

const fs = require('fs');
const dbCred = require('./credentials').cloudantNoSQLDB;

const DB_NAME = 'calls';

var cloudant;
var db;

function getDBCredentialsUrl(jsonData) {
  return dbCred.url;
}

function initDBConnection(dbName) {
  var dbCredentials = {
    dbName: dbName
  };

  dbCredentials.url = dbCred.url;
  cloudant = require('cloudant')({url: dbCredentials.url, plugin: 'promises'});
  db = cloudant.use(dbCredentials.dbName);
}

initDBConnection(DB_NAME);

module.exports.cloudant = cloudant;
module.exports.db = db;
module.exports.insert = function(doc) {
  return db.insert(doc);
};

module.exports.list = function() {
  return db.list();
}
