const db = require('../../config/mongoose')
const Restaurant = require('../restaurant')
const restData = require('./restaurant.json').results
const User = require('../user')
const bcrypt = require('bcryptjs')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const SEED_USER = [
  {
    name: 'user1',
    email: 'user1@example.com',
    password: '12345678',
    restaurantIndex: [0, 1, 2]
  },
  {
    name: 'user2',
    email: 'user1@example.com',
    password: '12345678',
    restaurantIndex: [3, 4, 5]
  }
]    

db.once('open', () => {
  Promise.all(Array.from({ length: 2 }, (_,i) => bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
      .then(hash =>
          User.create({
          name: SEED_USER[i].name,
          email: SEED_USER[i].email,
          password: hash,
        })
        .then(user => {
          const restaurants = SEED_USER[i].restaurantIndex.map(index => {
            const restaurant = restData[index]
            restaurant.userId = user._id
            return restaurant
          })
          return Restaurant.create(restaurants)
        })
        .catch(error => console.log(error))
    ))
  )
  .then(() => {
    console.log('done.')
    process.exit()
   })
})

