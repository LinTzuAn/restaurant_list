const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()
const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  // get user registration info
  const { email, name, password, confirmPassword } = req.body
  // check info
  const errors = []
  if (!email || !password || !confirmPassword) {
    errors.push({ message: 'Please fill in all the blanks.' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Passwords do not match.' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  // check whether user has already register
  User.findOne({ email })
    .then(user => {
    // if true, return to previous page else save user info
      if (user) {
        errors.push({ message: 'This email address has been taken.' })
        res.render('register', {
          email,
          name,
          password,
          confirmPassword,
          errors
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

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', 'You have been logged out successfully.')
  res.redirect('/users/login')
})

module.exports = router
