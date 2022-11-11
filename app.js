// require package
const express = require('express')
const app = express()
const port = 3000

// require handlebars
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')

// setting template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))

// routes setting
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

// start and listen 
app.listen(port, () => {
  console.log(`Express is running on localhost: ${port}`)
})