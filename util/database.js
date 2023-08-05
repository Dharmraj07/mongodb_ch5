const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
require("dotenv").config();
let _db;

const mongoConnect = callback => {
  MongoClient.connect(
    process.env.MONGO_URL

  )
    .then(client => {
      console.log('Connected!');
      //callback(client);
      _db=client.db();
      callback();

    })
    .catch(err => {
      console.log(err);
      throw err;
    });
};


const getdb=()=>{
  if(_db){
    return _db;

  }
  throw 'no database found';
}
module.exports = {mongoConnect,getdb};
