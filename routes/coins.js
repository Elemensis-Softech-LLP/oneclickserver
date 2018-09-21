var express = require('express');
var coinsRouter = express.Router();

const Coin = require('../models/coin');

coinsRouter.get('/coins/create', function(req, res, next) {
   res.render('coins/create') 
});

module.exports = coinsRouter;