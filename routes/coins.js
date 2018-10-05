var express = require('express');
var coinsRouter = express.Router();
const mongoose = require('mongoose');

const Coin = mongoose.model('Coin');
const Plan = mongoose.model('Plan');

const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

coinsRouter.get('/create', ensureLoggedIn('/login'), function(req, res, next) {
  Plan.find({}, (err, plans) => {
    if (err) {
      console.log(err)
    } else {
      res.render('coins/create', {
        'plans': plans
      })
    }
  });
});

coinsRouter.post('/create', function(req, res, next) {
  (async () => {
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

coinsRouter.get('/', ensureLoggedIn('/login'), function(req, res, next) {
  Coin.find({}, function(err, data) {
    if (err) {
      res.render('error')
    } else {
      // console.log(data[0].coinName)
      res.render('coins/index', {
        "coins": data
      });
    }
  });
});


module.exports = coinsRouter;
