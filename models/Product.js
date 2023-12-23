const fs = require("node:fs");
const path = require("node:path");
const Cart = require("../models/Cart.js")
const ruta = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

const getProductsFromFile = (cb) => {
  fs.readFile(ruta, (err, data) => {
    if(err) {
      return cb([])
    }
    cb(JSON.parse(data))
  })
}

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id
    this.title = title;
    this.imageUrl = imageUrl
    this.description = description
    this.price = price
  }

  save() {
    getProductsFromFile( products => { 
      if(this.id) {
        const existingProductIndex = products.findIndex(prod => prod.id === this.id)
        const updateProducts = [...products]
        updateProducts[existingProductIndex] = this
        fs.writeFile(ruta, JSON.stringify(updateProducts), (error) => {
          console.log(error);
        });
      }else {
        this.id = Math.random().toString()
        products.push(this);
        fs.writeFile(ruta, JSON.stringify(products), (error) => {
          console.log(error);
        });
      }
    })
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id)
      const updatedProducts = products.filter(item => item.id !== id)
      fs.writeFile(ruta, JSON.stringify(updatedProducts), err => {
        if(!err) {
          Cart.deleteProduct(id, product.price)
        }
      })
    })
  }

  static fetchAll(cb) {
    getProductsFromFile(cb)
  }

  static findById(id, cb)  {
    getProductsFromFile(products => {
      const product = products.find(item => item.id === id)
      cb(product)
    })
  }

};

