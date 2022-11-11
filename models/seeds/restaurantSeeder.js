const mongoose = require('mongoose')
const restaurant = require('../restaurant')
const restaurantJson = require('/Users/a22341254/restaurant_list/restaurant')

require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
  restaurant.create(restaurantJson.results)
  console.log('done')
})