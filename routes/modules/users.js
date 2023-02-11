const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../../models/users')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  // get user registration info 
  const { email, name, password, confirmPassword } = req.body
  // check whether user has already register 
  User.findOne({ email })
  .then(user => {
    // if true, return to previous page else save user info
    if (user) {
      res.render('register', {
        email,
        name,
        password,
        confirmPassword
      })
    } else {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          email,
          name,
          password: hash
        }))
        .then(() => res.redirect('/'))
        .catch(err => console.log(err))
    }
  })
  .catch(err => console.log(err))
})

module.exports = router