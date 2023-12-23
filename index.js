const express = require('express')
const path = require('node:path')
const bodyParser = require('body-parser')

const shopRoutes = require('./routes/shop.js')
const adminRoutes = require('./routes/admin.js')
const ErrorController = require('./controllers/ErrorController.js')

const app = express()

app.set('view engine', 'pug')
app.set('views', 'views')

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

const PORT = 3000

app.use('/admin', adminRoutes.routes)
app.use(shopRoutes)

app.use(ErrorController.error)


app.listen(PORT, () => {
  console.log('funcionando')
})