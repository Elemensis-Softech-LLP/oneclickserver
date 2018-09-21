var express = require('express');
var router = express.Router();

const shell = require('shelljs');

const Masternode = require('../models/masternodes');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/masternodes', function(req, res, next) {
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
  const masternodeprivkey = req.body.masternodeprivkey;
  const newMasternode = new Masternode({
    masternodeprivkey: masternodeprivkey
  })
  newMasternode.save();
  res.redirect('/success');
  // try {
  //   await newMasternode.save();
  // } catch (err) {
  //   console.log("THERE'S BEEN A FATAL ERROR")
  // }
  
});






router.post('/deploy', function(req, res, next){
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
