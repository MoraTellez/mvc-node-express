const Product = require('../models/Product.js')
const Cart = require('../models/Cart.js')

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {prods: products, pageTitle: 'Shop', path: '/products',})
  })
}

exports.getProduct = (req, res, next) => {
  const id = req.params.productId
  Product.findById(id, product => {
    res.render('shop/product-detail', {product, pageTitle: product.title, path: '/products'})
  })
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {prods: products, pageTitle: 'Shop', path: '/',})
  })
}

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = []
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id)
        if(cartProductData) {
          cartProducts.push({productData: product, quantity: cartProductData.quantity})
        }
      }
      res.render('shop/cart', { path: '/cart', pageTitle: 'Your cart', products: cartProducts})

    })
  })
  
}

exports.postCart= (req, res, next)  => {
  const id = req.body.productId
  Product.findById(id, (product) => {
    Cart.addProduct(id, product.price)
  })
  res.redirect('/cart')
}

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', { path: '/orders', pageTitle: 'Your orders'})
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {path: '/checkout', pageTitle: 'Checkout'})
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price)
    res.redirect('/cart')
  })
}