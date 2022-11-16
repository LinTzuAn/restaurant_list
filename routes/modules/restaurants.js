const express = require('express')
const router = express.Router()

const Restaurant = require('../../models/restaurant')


router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', (req, res) => {
  const newRestaurant = req.body
  return Restaurant.create(newRestaurant)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

router.get('/search', (req, res) => {
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
        res.render('search', { restaurants: filteredRestaurant, keyword })
      })
    .catch(error => console.log(error))
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('detail', { restaurant }))
    .catch(error => console.log(error))
})

router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const arrOfKeys = Object.keys(req.body)
  const arrOfValues = Object.values(req.body)

  return Restaurant.findById(id)
    .then(restaurant => {
      for (let i = 0; i < arrOfKeys.length; i++) {
        restaurant[arrOfKeys[i]] = arrOfValues[i]
      }
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router