var express = require('express');
var router = express.Router();
const shell = require('shelljs');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/deploy', function(req, res, next){
  console.log("=====================");
  console.log("=====================");
  console.log("=====================");
  console.log(req.body);
  shell.exec('sh ./public/scripts/create.sh')
  console.log("=====================");
  console.log("=====================");
  console.log("=====================");
})




module.exports = router;
