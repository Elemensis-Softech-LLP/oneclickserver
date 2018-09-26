var express = require('express');
var router = express.Router();
const shell = require('shelljs');

const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

const Masternode = require('../models/masternode');
const Coin = require('../models/coin');
const User = require('../models/user');
const Plan = require('../models/plan');
const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);

/* GET home page. */
router.get('/', function(req, res, next) {
  let _user = req.user;
  Masternode.find({
    "_owner" : _user,
  }, function(err, data){
      if(err){
        console.log("There's been an error");
        res.render('error');
      } else {
        _masternodes = data;
        res.render('index', {title: 'Express', "masternodes": _masternodes})
      }
  })
});

router.get('/masternodes', ensureLoggedIn('/login'), function(req, res, next) {
  Masternode.find({}, function(err, data){
    if(err) {
      res.render('error')
    } else {
      console.log(data[0].masternodeprivkey)
      res.render('masternodes', { "masternodes": data });
    }
  });
});


router.get('/success', function(req, res, next){
  res.render('success', { title: 'SUCCESS' });
})

router.post('/deploy/masternode', function(req, res, next){
  // TODO: Dynamically generate masternodeprivkey for user
  const masternodeprivkey = req.body.masternodeprivkey;
  const owner = req.user;
  // console.log(owner.stripeCustomer.id)
  (async () => {
    const coin = await Coin.findOne({'coinTicker': "ANON"});
    const plan = await Plan.findOne({'_id': coin.plan})

    // console.log(plan.stripePlan.id)
    const stripeSubscription = await stripe.subscriptions.create({
      customer: owner.stripeCustomer.id,
      items: [{plan: plan.stripePlan.id}]
    })

    const newMasternode = new Masternode({
      masternodeprivkey: masternodeprivkey,
      _owner: owner,
      _coin: coin,
      stripeSubscription: stripeSubscription
    })

    newMasternode.save();
  })();
  res.redirect('/');
});

router.post('/deploy', ensureLoggedIn('/login'), function(req, res, next){
  // console.log(req.body);
  let masternodeprivkey = req.body.masternodeprivkey;
  shell.exec("sh ./public/scripts/create.sh " + masternodeprivkey, {async:true})
  res.redirect('/success')
  // shell.exec("sh ./public/scripts/create.sh " + txHash, function(code, stdout, stderr) {
  //   console.log('Exit code:', code);
  //   console.log('Program output:', stdout);
  //   console.log('Program stderr:', stderr);
  // });
})

module.exports = router;
