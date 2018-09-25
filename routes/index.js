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


/* GET home page. */
router.get('/', ensureLoggedIn('/login'), function(req, res, next) {
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

router.post('/deploy/masternode', ensureLoggedIn('/login'), function(req, res, next){
  const masternodeprivkey = req.body.masternodeprivkey;
  // const _coin = req.body.coin;
  // let _coin;
  let _owner = req.user;
  console.log(_owner)
  Coin.findOne({'coinTicker': "ANON"}, function(err, data){
    if(err) {
      res.render('error')
    } else {
      let _coin = data;
      // console.log("Here's the owner" + _owner);
      // console.log("Here's the coin" + _coin);

      const newMasternode = new Masternode({
        masternodeprivkey: masternodeprivkey,
        _owner: _owner,
        _coin: _coin
      })
      newMasternode.save();
      res.redirect('/');
    }
  });
  // try {
  //   await newMasternode.save();
  // } catch (err) {
  //   console.log("THERE'S BEEN A FATAL ERROR")
  // }
  
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
