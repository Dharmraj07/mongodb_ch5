const mongodb = require('mongodb');
const { getdb } = require("../util/database");

class Product {
  constructor(title, price, description, imageUrl, id,userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id? new mongodb.ObjectId(id):null;
    this.userId=userId;
  }

  async save() {
    const db = getdb();
    try {
      let dbOp;
      if (this._id) {
        // Update the product
        dbOp = db.collection('products').updateOne(
          { _id: new mongodb.ObjectId(this._id) },
          { $set: this }
        );
      } else {
        dbOp = db.collection('products').insertOne(this);
      }
      const result = await dbOp;
      console.log(`Product ${this._id ? 'updated' : 'created'}.`);
      // You may handle the redirect here if it's required.
      // res.redirect('/admin/products')
    } catch (err) {
      console.log(err);
      throw err; // Rethrow the error to be handled elsewhere if necessary.
    }
  }

  static async fetchAll() {
    const db = getdb();
    try {
      const products = await db.collection('products').find().toArray();
      console.log(products);
      return products;
    } catch (err) {
      console.log(err);
      throw err; // Rethrow the error to be handled elsewhere if necessary.
    }
  }

  static async findById(prodId) {
    const db = getdb();
    try {
      const product = await db.collection('products').find({ _id: new mongodb.ObjectId(prodId) }).next();
      console.log(product);
      return product;
    } catch (err) {
      console.log(err);
      throw err; // Rethrow the error to be handled elsewhere if necessary.
    }
  }

  // static deleteById(prodId){
  //   const db=getdb();
  //   return db.collection('products').deleteOne({_id:mongodb.ObjectId(prodId)})
  //   .then(result =>{
  //     console.log("Deleted...")
  //   })
  //   .catch(err =>{
  //     console.log(err);
  //   })

  // }
  static async deleteById(prodId) {
    const db = getdb();
    try {
      const result = await db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) });
      if (result.deletedCount === 1) {
        console.log("Product deleted.");
      } else {
        console.log("Product not found.");
      }
    } catch (err) {
      console.log(err);
      throw err; // Rethrow the error to be handled elsewhere if necessary.
    }
  }
}

module.exports = Product;

// // const Sequelize = require('sequelize');
// const mongodb=require('mongodb');
// const { getdb } = require("../util/database");


// // const mongoConnect = require("../util/database");
// // mongoConnect.getdb

// // const sequelize = require('../util/database');


// class Product{
//   constructor(title,price,description,imageUrl,id){
//       this.title=title;
//       this.price=price;
//       this.description=description;
//       this.imageUrl=imageUrl;
//       this._id=id;

//   }
//   save(){
//      const db=getdb();
//      let dbOp;
//      if(this.id){
//       //update the product
//       dbOp=db.collection('products').updateOne({_id:new mongodb.ObjectId(this._id)},{$set:this})
//      }else{
//       dbOp=db
//       .collection('products')
//       .insertOne()
//      }
//     //  return db.collection('products').insertOne(this)
//     return dbOp
//      .then(result =>{
//       console.log(`product created...`);
//       //res.redirect('/admin/products')
//      }).catch(err=>{
//       console.log(err);
//      });
//   }

//   static fetchAll(){
//     const db=getdb();

//     return db.collection('products')
//     .find()
//     .toArray()
//     .then(products =>{
//       console.log(products);
//       return products;
//     })
//     .catch(err =>{
//       console.log(err);
//     });
//   }

//   static findById(prodId){
//     const db=getdb();
//     return db.collection('products').find({_id:new mongodb.ObjectId(prodId)  }).next()
//     .then(product =>{
//       console.log(product);
//       return product;
//     }).catch(err =>{
//       console.log(err);
//     })

//   }
// }
// // const Product = sequelize.define('product', {
// //   id: {
// //     type: Sequelize.INTEGER,
// //     autoIncrement: true,
// //     allowNull: false,
// //     primaryKey: true
// //   },
// //   title: Sequelize.STRING,
// //   price: {
// //     type: Sequelize.DOUBLE,
// //     allowNull: false
// //   },
// //   imageUrl: {
// //     type: Sequelize.STRING,
// //     allowNull: false
// //   },
// //   description: {
// //     type: Sequelize.STRING,
// //     allowNull: false
// //   }
// // });

//  module.exports = Product;
