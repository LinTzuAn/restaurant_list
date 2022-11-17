const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
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
        res.render('index', { restaurants: filteredRestaurant, keyword })
      })
    .catch(error => console.log(error))
})

module.exports = router