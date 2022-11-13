const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const port = 3000
const mongoose = require('mongoose')
const app = express()
const Restaurant = require('./models/restaurant')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})


app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/restaurants/new', (req, res) => {
  res.render('new')
})

app.post('/restaurants', (req, res) => {
  const newRestaurant = req.body
  return Restaurant.create( newRestaurant )
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.get('/search', (req, res) => {
  if (!req.query.keyword) {
    res.redirect("/")
  }
  
  const keyword = req.query.keyword.trim().toLowerCase().replace(/ /g, '')

  Restaurant.find()
  .lean()
  .then(
    restaurants => {
      const filteredRestaurant = restaurants.filter(
        item => item.name.toLowerCase().includes(keyword) ||
        item.category.includes(keyword)
      )
      res.render('search', {restaurants: filteredRestaurant, keyword})
    })
  .catch(error => console.log(error))
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  const arrOfKeys = Object.keys(req.body)
  const arrOfValues = Object.values(req.body)
  
  return Restaurant.findById(id)
  .then(restaurant => {
    for(let i = 0; i < arrOfKeys.length; i++) {
      restaurant[arrOfKeys[i]] = arrOfValues[i]
    }
    return restaurant.save()
  })
  .then( () => res.redirect(`/restaurants/${id}`))
  .catch(error => console.log(error))
})

app.post('/restaurants/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is running on localhost: ${port}`)
})