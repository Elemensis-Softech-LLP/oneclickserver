require('dotenv').config();
var express = require('express');
var billingRouter = express.Router();
const bcrypt = require("bcrypt");
const passport = require('passport');
const mongoose = require('mongoose');

const Charge = mongoose.model('Charge');
const User = mongoose.model('User');
const stripe = require("stripe")(process.env.STRIPE_TEST_KEY);

const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');


billingRouter.get('/', ensureLoggedIn(), function(req, res, next) {
  let _user = req.user;

  Charge.find({
    _owner: _user
  }, function(err, data) {
    if (err) {
      console.log("There's been an error");
      res.render('error');
    } else {
      res.render('billing/index', {
        title: "New Billing",
        "bills": data
      });
    }
  })
});

billingRouter.post('/update', ensureLoggedIn('/login'), function(req, res, next) {
  // TODO: move stripe key to environment variable
  // TODO: Defensive programming
  let _user = req.user;
  // _user.stripeToken = req.body.stripeToken;
  (async function() {
    // Create a Customer with Stripe:
    console.log("The Stripe Token = " + req.body.stripeToken);

    const customer = await stripe.customers.create({
      source: req.body.stripeToken,
      email: _user.email,
    });

    // Associate Stripe Customer with mongodb user
    _user.stripeToken = req.body.stripeToken;
    _user.stripeCustomer = customer;
    //  Save and update User record
    _user.save();
    res.redirect('/billing');
  })();
});

billingRouter.post('/charges/create', ensureLoggedIn(), function(req, res, next) {

  let _amount = 999;
  let _user = req.user;
  console.log('The customer ID = ' + _user.stripeCustomer.id);

  (async function() {
    // Charge the Customer instead of the card:
    // const charge = await stripe.charges.create({
    //       amount: _amount,
    //       currency: 'usd',
    //       customer: _user.stripeCustomer.id,
    //     });

    // console.log(charge)

    // Store Charge record in mongodb as new record;
    const newCharge = new Charge({
      _owner: _user,
      _stripeCharge: charge,
    });
    // Save record
    newCharge.save();

  })();
  res.redirect('/billing')

});









// _user.save(function(err, result){
//     if(err){
//         console.log("There was an error");
//     } else {
//         console.log("Save was a success")

//         // Set your secret key: remember to change this to your live secret key in production
//         // See your keys here: https://dashboard.stripe.com/account/apikeys

//         // Don't use for now, this is for charging the customers card
//         // const _charge = stripe.charges.create({
//         // amount: _amount,
//         // currency: 'usd',
//         // description: 'Monthly charge for masternode hosting',
//         // source: _user.stripeToken,
//         // })

//         // Don't use for now, this is for creating charge records in the local app mongodb later on
//         // .then((err, res) => {
//         //     if(err) {
//         //         console.log("abort")
//         //     } else{
//         //         const newCharge = new Charge({
//         //             _owner: _user,
//         //             _stripeCharge: _charge,
//         //             amount: _amount
//         //         })
//         //         newCharge.save(function(err, result){
//         //             if(err){
//         //                 console.log("There was an error");
//         //                 res.redirect('/billing')
//         //             } else {
//         //                 console.log("Successfull");
//         //                 res.redirect('/success');
//         //             }
//         //         })
//         //     }
//         // })
//     }
// });





module.exports = billingRouter;
