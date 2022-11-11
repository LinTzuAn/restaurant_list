const express = require('express')
const exphbs = require('express-handlebars')
const port = 3000
const mongoose = require('mongoose')
const app = express()

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

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')


app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  console.log('你輸入:', keyword ==='')
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

app.get('/restaurants/:restaurant_id', (req, res) => {
  const filteredRestaurant = restaurantList.results.find(
    item => item.id.toString() === req.params.restaurant_id
  )
  res.render('show', { restaurant: filteredRestaurant })
})

app.listen(port, () => {
  console.log(`Express is running on localhost: ${port}`)
})