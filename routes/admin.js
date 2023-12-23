const express = require('express')

const AdminController = require('../controllers/AdminController.js')

const router = express.Router()

router.get('/add-product', AdminController.getAddProduct)

router.post('/add-product', AdminController.postAddProduct)

router.get('/products', AdminController.getProducts)

router.get('/edit-product/:productId', AdminController.getEditProduct)

router.post('/edit-product/:productId', AdminController.postEditProduct)

router.post('/delete-product/:productId', AdminController.postDeleteProduct)

exports.routes = router