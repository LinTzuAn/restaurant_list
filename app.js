const express = require('express')
const exphbs = require('express-handlebars')
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

const restaurantList = require('./restaurant.json')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))

app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurants => res.render('index', { restaurants }))
    .catch(error => console.error(error))
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  function findRestaurant (item) {
    if (item.name.toLowerCase().includes(keyword.toLowerCase())) {
      return item
    } 
    return item.category.toLowerCase().includes(keyword.toLowerCase())
  }

  const filteredRestaurant = restaurantList.results.filter(findRestaurant)
  console.log(restaurantList.results[0].name.includes(''))
  res.render('index', { restaurants: filteredRestaurant, keyword: keyword })
})

app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`Express is running on localhost: ${port}`)
})