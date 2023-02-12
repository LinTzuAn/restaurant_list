const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  const keyword = req.query.keyword.trim().toLowerCase().replace(/ /g, '')
  const mode = req.query.sorting
  const sorting = {
    default: { _id: 'asc' },
    AtoZ: { name: 'asc' },
    ZtoA: { name: 'desc' },
    category: { category: 'asc' },
    location: { location: 'asc' }
  }
  const sortSelected = { [mode]: true }
  
  if (!req.query.keyword) {
    return res.redirect("/")
  }

  Restaurant.find({ userId })
    .lean()
    .sort(sorting[mode])
    .then(
      restaurants => {
        const filteredRestaurant = restaurants.filter(
          item => item.name.toLowerCase().includes(keyword) ||
            item.category.includes(keyword)
        )
        res.render('index', { restaurants: filteredRestaurant, keyword, sortSelected })
      })
    .catch(error => console.log(error))
})

module.exports = router