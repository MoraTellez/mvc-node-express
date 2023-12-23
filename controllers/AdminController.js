const Product = require('../models/Product.js')

exports.getAddProduct = (req, res, next) => {
  res.render("admin/edit-product", {
    pageTitle: "Add product",
    path: "/admin/add-product",
    pageTitle: "Add a product",
  });
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit
  if(!editMode) {
    return res.redirect('/')
  }

  const id = req.params.productId
  Product.findById(id, product => {
    if(!product) {
      return res.redirect('/')
    }
    res.render("admin/edit-product", {
      path: "/admin/edit-product",
      pageTitle: "Edit a product",
      editing: editMode,
      product
    });
  })

};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId
  const updatedTitle = req.body.title
  const updatedPrice= req.body.price
  const updatedDescription = req.body.description
  const updatedImageUrl = req.body.imageUrl
  const updatedProduct = new Product(prodId, updatedTitle, updatedImageUrl, updatedDescription, updatedPrice)
  updatedProduct.save()
  res.redirect('/admin/products')
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title
  const imageUrl = req.body.imageUrl
  const description = req.body.description
  const price = req.body.price
  const product = new Product(null, title, imageUrl, description, price)
  product.save()
  res.redirect("/");
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {prods: products, pageTitle: 'Admin products', path: '/admin/products',})
  })
}

exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.params.productId
  Product.deleteById(prodId)
  res.redirect('/admin/products')
}