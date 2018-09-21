var express = require('express');
var coinsRouter = express.Router();

const Coin = require('../models/coin');

coinsRouter.get('/coins/create', function(req, res, next) {
   res.render('coins/create') 
});

coinsRouter.post('/coins/create', function(req, res, next) {
    const coinName = req.body.coinName;
    const coinTicker = req.body.coinTicker;
    const newCoin = new Coin({
        coinName: coinName,
        coinTicker: coinTicker
    })
    newCoin.save();
    res.redirect('/coins')
 });

coinsRouter.get('/coins', function(req, res, next) {
    Coin.find({}, function(err, data){
        if(err) {
          res.render('error')
        } else {
          console.log(data[0].coinName)
          res.render('coins/index', { "coins": data });
        }
      });
 });

module.exports = coinsRouter;