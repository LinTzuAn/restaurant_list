const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/', (req, res) => {
  const mode = req.query.sorting
  const sorting = {
    default: {_id: 'asc'},
    AtoZ: { name: 'asc' },
    ZtoA: { name: 'desc' },
    category: { category: 'asc' },
    location: { location: 'asc' }
  }
  const selected = {[mode]: true}

  Restaurant.find()
    .lean()
    .sort(sorting[mode])
    .then(restaurants => res.render('index', { restaurants, selected }))
    .catch(error => console.error(error))
})

module.exports = router
