// sets up cloudant and returns it
// i'm sorry, i just copy and paste boilerplate today

const fs = require('fs');
const dbCred = require('./credentials').cloudantNoSQLDB;

const DB_NAME = 'database';

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
  cloudant = require('cloudant')(dbCredentials.url);
  db = cloudant.use(dbCredentials.dbName);
}

initDBConnection(DB_NAME);

module.exports.cloudant = cloudant;
module.exports.db = db;
