var express = require('express');
var authRouter = express.Router();

const User = require('../models/user');

const bcrypt = require("bcrypt");

// Get Login page
authRouter.get('/login', function(req, res, next) {
  res.render('auth/login');
});

// Get Signup page
authRouter.get('/signup', function(req, res, next) {
    res.render('auth/signup');
});

// Create new User from signup
authRouter.post('/signup', function(req, res, next){
  console.log(req.body.password)
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = generateHashedPassword(password);
  const newUser = new User({
    email: email,
    password: password
  })
  newUser.save();
  res.redirect('/success');
})

//GENERATE HASHED PASSWORD
function generateHashedPassword(password) {
  let hashPass;
  const bcryptSalt = 10;
  const salt = bcrypt.genSaltSync(bcryptSalt);
  hashPass = bcrypt.hashSync(password, salt);
  return hashPass;
}






module.exports = authRouter;