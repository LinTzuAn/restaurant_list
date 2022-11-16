const db = require('../../config/mongoose')
const restaurant = require('../restaurant')
const restaurantJson = require('./restaurant.json')

require('dotenv').config()

db.once('open', () => {
  restaurant.create(restaurantJson.results)
  console.log('done')
})

