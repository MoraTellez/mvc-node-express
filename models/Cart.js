const fs = require("node:fs");
const path = require("node:path");

const ruta = path.join(
  path.dirname(require.main.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addProduct(id, productPrice) {
    // Fetch all the previous cart
    fs.readFile(ruta, (err, data) => {
      let cart = { products: [], totalPrice: 0 };
      if (!err) {
        cart = JSON.parse(data);
      }
      // Analyze the cart => Find existing product
      const existingProductIndex = cart.products.findIndex(
        prod => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.quantity = updatedProduct.quantity + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, quantity: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice = cart.totalPrice + +productPrice;
      
      fs.writeFile(ruta, JSON.stringify(cart), (err) => {
        console.log(err);
      });
    });
    // Add product/ increase the quantity
  }

  static deleteProduct(id, price) {
    fs.readFile(ruta, (err, cart) => {
      if(err) {
        return
      }

      const updateCart = {...JSON.parse(cart)}
      const product = updateCart.products.find(prod => prod.id === id)
      if(!product) {
        return
      }
      const productQuantity = product.quantity
      updateCart.products = updateCart.products.filter(prod => prod.id !== id)
      updateCart.totalPrice = cart.totalPrice - price * productQuantity
      fs.writeFile(ruta, JSON.stringify(updateCart), (err) => {
        console.log(err);
      });
    })
  }

  static getCart(cb) {
    fs.readFile(ruta, (err, fileContent) => {
      const cart = JSON.parse(fileContent);
      if (err) {
        cb(null);
      } else {
        cb(cart);
      }
    });
  }
};
