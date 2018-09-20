var express = require('express');
var router = express.Router();
const shell = require('shelljs');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/deploy', function(req, res, next){
  // console.log(req.body);
  let txHash = req.body.txHash;
  console.log(txHash);
  console.log("HELLO MY NAME IS " + txHash);
  shell.exec("sh ./public/scripts/create.sh " + txHash)
})




module.exports = router;
