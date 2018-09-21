var express = require('express');
var authRouter = express.Router();

// const authRoutes     = express.Router();

/* GET users listing. */
authRouter.get('/login', function(req, res, next) {
  res.render('auth/login');
});

authRouter.get('/signup', function(req, res, next) {
    res.render('auth/signup');
});

module.exports = authRouter;