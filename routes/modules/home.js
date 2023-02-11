const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const userId = req.user._id
  const mode = req.query.sorting
  const sorting = {
    default: {_id: 'asc'},
    AtoZ: { name: 'asc' },
    ZtoA: { name: 'desc' },
    category: { category: 'asc' },
    location: { location: 'asc' }
  }
  const sortSelected = {[mode]: true}

  Restaurant.find({ userId })
    .lean()
    .sort(sorting[mode])
    .then(restaurants => res.render('index', { restaurants, sortSelected }))
    .catch(error => console.error(error))
})

module.exports = router
