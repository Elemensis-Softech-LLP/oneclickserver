var express = require('express');
var router = express.Router();
const shell = require('shelljs');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/success', function(req, res, next){
  res.render('success', { title: 'SUCCESS' });
})


router.post('/deploy', function(req, res, next){
  // console.log(req.body);
  let txHash = req.body.txHash;
  console.log(txHash);
  console.log("HELLO MY NAME IS " + txHash);
  shell.exec("sh ./public/scripts/create.sh " + txHash, {async:true})
  res.redirect('/success')
  // shell.exec("sh ./public/scripts/create.sh " + txHash, function(code, stdout, stderr) {
  //   console.log('Exit code:', code);
  //   console.log('Program output:', stdout);
  //   console.log('Program stderr:', stderr);
  // });
})



module.exports = router;
