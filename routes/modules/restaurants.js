const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')

router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const userId = req.user._id
  return Restaurant.create({ ...req.body, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
  const userId = req.user._id
  if (!req.query.keyword) {
    res.redirect('/')
  }

  const keyword = req.query.keyword.trim().toLowerCase().replace(/ /g, '')

  Restaurant.find({ userId })
    .lean()
    .then(
      restaurants => {
        const filteredRestaurant = restaurants.filter(
          item => item.name.toLowerCase().includes(keyword) ||
            item.category.includes(keyword)
        )
        res.render('search', { restaurants: filteredRestaurant, keyword })
      })
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const arrOfKeys = Object.keys(req.body)
  const arrOfValues = Object.values(req.body)
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => {
      for (let i = 0; i < arrOfKeys.length; i++) {
        restaurant[arrOfKeys[i]] = arrOfValues[i]
      }
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${_id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return Restaurant.findOne({ _id, userId })
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router
