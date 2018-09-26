var express = require('express');
var coinsRouter = express.Router();

const Coin = require('../models/coin');
const Plan = require('../models/plan');

const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

coinsRouter.get('/coins/create', ensureLoggedIn('/login'), function(req, res, next) {
  Plan.find({}, (err, plans) => {
    if (err){
      console.log(err)
    } else {
      res.render('coins/create', {'plans': plans}) 
    }
  });
});

coinsRouter.post('/coins/create', function(req, res, next) {
  (async() => {
      const plan = await Plan.findOne({
        "_id": req.body.plan
      });
      const coinName = req.body.coinName;
      const coinTicker = req.body.coinTicker;
      const newCoin = new Coin({
          coinName: coinName,
          coinTicker: coinTicker,
          plan: plan
      })
      newCoin.save();
    })();
  res.redirect('/coins')
});

coinsRouter.get('/coins', ensureLoggedIn('/login'), function(req, res, next) {
    Coin.find({}, function(err, data){
        if(err) {
          res.render('error')
        } else {
          // console.log(data[0].coinName)
          res.render('coins/index', { "coins": data });
        }
      });
 });


module.exports = coinsRouter;

