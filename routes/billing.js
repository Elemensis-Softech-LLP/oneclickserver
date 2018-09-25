require('dotenv').config();
var express = require('express');
var billingRouter = express.Router();
const bcrypt = require("bcrypt");
const passport = require('passport');

const User = require('../models/user');
const Charge = require('../models/charge');

const {
    ensureLoggedIn,
    ensureLoggedOut
} = require('connect-ensure-login');


billingRouter.get('/billing', function(req, res, next) {
    res.render('billing/index', {title: "New Billing"})
})

billingRouter.post('/billing/update', ensureLoggedIn(), function(req, res, next) {
    // TODO: move stripe key to environment variable
    var stripe = require("stripe")(process.env.STRIPE_TEST_KEY);
    // TODO: Defensive programming
    let _user = req.user;
    let _amount = 999;
    _user.stripeCustomerId = req.body.stripeToken;
    (async function() {
        // Create a Customer:
        const customer = await stripe.customers.create({
            source: req.stripeToken,
            email: _user.email,
        });
        console.log(customer);
        _user.stripeCustomerId = customer;
        _user.save();
        // Charge the Customer instead of the card:
        // const charge = await stripe.charges.create({
        //       amount: _amount,
        //       currency: 'usd',
        //       customer: customer.id,
        //     });
            // YOUR CODE: Save the customer ID and other info in a database for later.
        })();
        res.redirect('/');
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